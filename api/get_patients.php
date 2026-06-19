<?php
header('Content-Type: application/json');
require_once '../db_connect.php';

try {
    $stmt = $pdo->query('SELECT * FROM patients ORDER BY id DESC');
    $patients = $stmt->fetchAll();
    echo json_encode($patients);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch patients: ' . $e->getMessage()]);
}
?>
