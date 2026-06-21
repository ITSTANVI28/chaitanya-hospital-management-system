<?php
header('Content-Type: application/json');
require_once '../db_connect.php';

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$item_name = isset($input['item_name']) ? trim($input['item_name']) : '';
$qty = isset($input['qty']) ? intval($input['qty']) : 0;
$unit = isset($input['unit']) ? trim($input['unit']) : '';
$supplier_name = isset($input['supplier_name']) ? trim($input['supplier_name']) : '';
$order_date = isset($input['order_date']) ? trim($input['order_date']) : '';

if (empty($item_name) || $qty <= 0 || empty($unit) || empty($supplier_name) || empty($order_date)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing or invalid required fields']);
    exit;
}

try {
    $stmt = $pdo->prepare('INSERT INTO stock_orders (item_name, qty, unit, supplier_name, order_date, status) VALUES (?, ?, ?, ?, ?, \'Pending\')');
    $stmt->execute([$item_name, $qty, $unit, $supplier_name, $order_date]);
    echo json_encode(['success' => true, 'message' => 'Stock order placed successfully']);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database operation failed: ' . $e->getMessage()]);
}
?>
