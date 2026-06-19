<?php
header('Content-Type: application/json');
require_once '../db_connect.php';

// Decode JSON input if raw payload is sent, otherwise use $_POST
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$name = isset($input['name']) ? trim($input['name']) : '';
$batch_number = isset($input['batch_number']) ? trim($input['batch_number']) : '';
$category = isset($input['category']) ? trim($input['category']) : '';
$qty = isset($input['qty']) ? intval($input['qty']) : 0;
$min = isset($input['min']) ? intval($input['min']) : 0;
$unit = isset($input['unit']) ? trim($input['unit']) : '';
$purchase_date = isset($input['purchase_date']) ? trim($input['purchase_date']) : null;
$expiry_date = isset($input['expiry_date']) ? trim($input['expiry_date']) : null;
$supplier_name = isset($input['supplier_name']) ? trim($input['supplier_name']) : '';

if (empty($name) || empty($category) || $qty < 0 || $min < 0 || empty($unit)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing or invalid required fields']);
    exit;
}

try {
    $stmt = $pdo->prepare('INSERT INTO inventory (name, batch_number, category, qty, min_threshold, unit, purchase_date, expiry_date, supplier_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
    $stmt->execute([$name, $batch_number, $category, $qty, $min, $unit, $purchase_date, $expiry_date, $supplier_name]);
    echo json_encode(['success' => true, 'message' => 'Stock item added successfully']);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database operation failed: ' . $e->getMessage()]);
}
?>
