<?php
header('Content-Type: application/json');
require_once '../db_connect.php';

try {
    $stmt = $pdo->query('SELECT * FROM staff ORDER BY id DESC');
    $staff = $stmt->fetchAll();
    echo json_encode($staff);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch staff: ' . $e->getMessage()]);
}
?>
