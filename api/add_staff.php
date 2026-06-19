<?php
header('Content-Type: application/json');
require_once '../db_connect.php';

// Decode JSON input if raw payload is sent, otherwise use $_POST
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$name = isset($input['name']) ? trim($input['name']) : '';
$role = isset($input['role']) ? trim($input['role']) : '';
$dept = isset($input['dept']) ? trim($input['dept']) : '';
$shift = isset($input['shift']) ? trim($input['shift']) : '';
$contact = isset($input['contact']) ? trim($input['contact']) : '';
$status = isset($input['status']) ? trim($input['status']) : '';

if (empty($name) || empty($role) || empty($dept) || empty($shift) || empty($contact) || empty($status)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing or invalid required fields']);
    exit;
}

try {
    $stmt = $pdo->prepare('INSERT INTO staff (name, role, department, shift, contact, status) VALUES (?, ?, ?, ?, ?, ?)');
    $stmt->execute([$name, $role, $dept, $shift, $contact, $status]);
    echo json_encode(['success' => true, 'message' => 'Staff member added successfully']);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database operation failed: ' . $e->getMessage()]);
}
?>
