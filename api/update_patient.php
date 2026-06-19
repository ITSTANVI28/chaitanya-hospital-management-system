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
    echo json_encode(['error' => 'Invalid or missing patient ID']);
    exit;
}

// Build query dynamically based on provided fields
$allowedFields = ['name', 'age', 'ward', 'bed', 'admission_date', 'doctor', 'status'];
$updates = [];
$params = [];

foreach ($allowedFields as $field) {
    // Treat 'date' in frontend input as 'admission_date' in DB
    $frontendKey = ($field === 'admission_date') ? 'date' : $field;
    if (isset($input[$frontendKey])) {
        $updates[] = "$field = ?";
        if ($field === 'age') {
            $params[] = intval($input[$frontendKey]);
        } else {
            $params[] = trim($input[$frontendKey]);
        }
    }
}

if (empty($updates)) {
    http_response_code(400);
    echo json_encode(['error' => 'No fields to update']);
    exit;
}

$params[] = $id; // for the WHERE clause
$sql = "UPDATE patients SET " . implode(', ', $updates) . " WHERE id = ?";

try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    echo json_encode(['success' => true, 'message' => 'Patient updated successfully']);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database operation failed: ' . $e->getMessage()]);
}
?>
