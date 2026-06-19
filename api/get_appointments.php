<?php
header('Content-Type: application/json');
require_once '../db_connect.php';

try {
    $stmt = $pdo->query('SELECT * FROM appointments ORDER BY booking_date DESC, created_at DESC');
    $appointments = $stmt->fetchAll();
    echo json_encode($appointments);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database fetch failed: ' . $e->getMessage()]);
}
?>
