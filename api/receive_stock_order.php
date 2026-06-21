<?php
header('Content-Type: application/json');
require_once '../db_connect.php';

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$id = isset($input['id']) ? intval($input['id']) : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid or missing order ID']);
    exit;
}

try {
    $pdo->beginTransaction();

    // 1. Fetch order details first
    $stmt = $pdo->prepare('SELECT * FROM stock_orders WHERE id = ? AND status = \'Pending\'');
    $stmt->execute([$id]);
    $order = $stmt->fetch();

    if (!$order) {
        $pdo->rollBack();
        http_response_code(404);
        echo json_encode(['error' => 'Pending order not found or already received']);
        exit;
    }

    // 2. Update status to Received
    $updateOrder = $pdo->prepare('UPDATE stock_orders SET status = \'Received\' WHERE id = ?');
    $updateOrder->execute([$id]);

    // 3. Search for existing item in inventory
    $invStmt = $pdo->prepare('SELECT id, qty FROM inventory WHERE LOWER(TRIM(name)) = LOWER(TRIM(?))');
    $invStmt->execute([$order['item_name']]);
    $invItem = $invStmt->fetch();

    if ($invItem) {
        // Increment inventory qty
        $updateInv = $pdo->prepare('UPDATE inventory SET qty = qty + ? WHERE id = ?');
        $updateInv->execute([$order['qty'], $invItem['id']]);
    } else {
        // Insert new item in inventory with default batch and threshold
        $insertInv = $pdo->prepare('INSERT INTO inventory (name, batch_number, category, qty, min_threshold, unit, purchase_date, expiry_date, supplier_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
        
        $tempBatch = 'RCV-' . strtoupper(substr(uniqid(), -5));
        $category = 'Medicines'; // Default category
        $minThreshold = 50; // Default minimum threshold
        $purchaseDate = date('Y-m-d');
        $expiryDate = date('Y-m-d', strtotime('+3 years')); // 3 years expiry default

        $insertInv->execute([
            $order['item_name'],
            $tempBatch,
            $category,
            $order['qty'],
            $minThreshold,
            $order['unit'],
            $purchaseDate,
            $expiryDate,
            $order['supplier_name']
        ]);
    }

    $pdo->commit();
    echo json_encode(['success' => true, 'message' => 'Stock order received and inventory updated successfully']);
} catch (\PDOException $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(500);
    echo json_encode(['error' => 'Database operation failed: ' . $e->getMessage()]);
}
?>
