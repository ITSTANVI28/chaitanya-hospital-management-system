<?php
header('Content-Type: application/json');
require_once '../db_connect.php';

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$id = isset($input['id']) ? intval($input['id']) : 0;
$status = isset($input['status']) ? trim($input['status']) : '';

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid or missing appointment ID']);
    exit;
}

$allowedStatuses = ['Pending', 'Checked In', 'Completed', 'Cancelled'];
if (!in_array($status, $allowedStatuses)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid status value']);
    exit;
}

try {
    $stmt = $pdo->prepare('UPDATE appointments SET status = ? WHERE id = ?');
    $stmt->execute([$status, $id]);
    echo json_encode(['success' => true, 'message' => 'Appointment status updated successfully']);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database operation failed: ' . $e->getMessage()]);
}
?>
