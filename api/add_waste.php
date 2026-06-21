<?php
header('Content-Type: application/json');
require_once '../db_connect.php';

// Decode JSON input if raw payload is sent, otherwise use $_POST
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$date = isset($input['date']) ? trim($input['date']) : '';
$item_name = isset($input['item_name']) ? trim($input['item_name']) : '';
$type = isset($input['type']) ? trim($input['type']) : '';
$dept = isset($input['dept']) ? trim($input['dept']) : '';
$weight = isset($input['weight']) ? floatval($input['weight']) : 0.0;
$status = isset($input['status']) ? trim($input['status']) : '';

if (empty($date) || empty($type) || empty($dept) || $weight <= 0.0 || empty($status)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing or invalid required fields']);
    exit;
}

try {
    $stmt = $pdo->prepare('INSERT INTO waste_logs (date, item_name, type, department, weight, status) VALUES (?, ?, ?, ?, ?, ?)');
    $stmt->execute([$date, $item_name, $type, $dept, $weight, $status]);
    echo json_encode(['success' => true, 'message' => 'Waste entry added successfully']);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database operation failed: ' . $e->getMessage()]);
}
?>
