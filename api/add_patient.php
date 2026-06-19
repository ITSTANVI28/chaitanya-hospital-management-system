<?php
header('Content-Type: application/json');
require_once '../db_connect.php';

// Decode JSON input if raw payload is sent, otherwise use $_POST
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$name = isset($input['name']) ? trim($input['name']) : '';
$age = isset($input['age']) ? intval($input['age']) : 0;
$ward = isset($input['ward']) ? trim($input['ward']) : '';
$bed = isset($input['bed']) ? trim($input['bed']) : '';
$admission_date = isset($input['date']) ? trim($input['date']) : '';
$doctor = isset($input['doctor']) ? trim($input['doctor']) : '';
$status = isset($input['status']) ? trim($input['status']) : '';

if (empty($name) || $age <= 0 || empty($ward) || empty($bed) || empty($admission_date) || empty($doctor) || empty($status)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing or invalid required fields']);
    exit;
}

try {
    $stmt = $pdo->prepare('INSERT INTO patients (name, age, ward, bed, admission_date, doctor, status) VALUES (?, ?, ?, ?, ?, ?, ?)');
    $stmt->execute([$name, $age, $ward, $bed, $admission_date, $doctor, $status]);
    echo json_encode(['success' => true, 'message' => 'Patient added successfully']);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database operation failed: ' . $e->getMessage()]);
}
?>
