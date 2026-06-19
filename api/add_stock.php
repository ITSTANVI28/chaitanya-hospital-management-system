<?php
header('Content-Type: application/json');
require_once '../db_connect.php';

// Decode JSON input if raw payload is sent, otherwise use $_POST
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$name = isset($input['name']) ? trim($input['name']) : '';
$category = isset($input['category']) ? trim($input['category']) : '';
$qty = isset($input['qty']) ? intval($input['qty']) : 0;
$min = isset($input['min']) ? intval($input['min']) : 0;
$unit = isset($input['unit']) ? trim($input['unit']) : '';

if (empty($name) || empty($category) || $qty < 0 || $min < 0 || empty($unit)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing or invalid required fields']);
    exit;
}

try {
    $stmt = $pdo->prepare('INSERT INTO inventory (name, category, qty, min_threshold, unit) VALUES (?, ?, ?, ?, ?)');
    $stmt->execute([$name, $category, $qty, $min, $unit]);
    echo json_encode(['success' => true, 'message' => 'Stock item added successfully']);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database operation failed: ' . $e->getMessage()]);
}
?>
