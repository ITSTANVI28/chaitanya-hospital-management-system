<?php
header('Content-Type: application/json');
require_once '../db_connect.php';

// Decode JSON input if raw payload is sent, otherwise use $_POST
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$name = isset($input['name']) ? trim($input['name']) : '';
$email = isset($input['email']) ? trim($input['email']) : '';
$department = isset($input['department']) ? trim($input['department']) : '';
$doctor_name = isset($input['doctor_name']) ? trim($input['doctor_name']) : '';
$booking_date = isset($input['date']) ? trim($input['date']) : '';

if (empty($name) || empty($email) || empty($department) || empty($booking_date)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing or invalid required fields']);
    exit;
}

try {
    $stmt = $pdo->prepare('INSERT INTO appointments (name, email, department, doctor_name, booking_date) VALUES (?, ?, ?, ?, ?)');
    $stmt->execute([$name, $email, $department, $doctor_name ?: null, $booking_date]);
    echo json_encode(['success' => true, 'message' => 'Appointment booked successfully']);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database operation failed: ' . $e->getMessage()]);
}
?>
