<?php
header('Content-Type: application/json');
require_once '../db_connect.php';

try {
    $stmt = $pdo->query('SELECT * FROM waste_logs ORDER BY date DESC, id DESC');
    $waste = $stmt->fetchAll();
    echo json_encode($waste);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch waste logs: ' . $e->getMessage()]);
}
?>
