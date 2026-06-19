<?php
header('Content-Type: application/json');
require_once '../db_connect.php';

try {
    $stmt = $pdo->query('SELECT * FROM inventory ORDER BY id DESC');
    $inventory = $stmt->fetchAll();
    echo json_encode($inventory);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch inventory: ' . $e->getMessage()]);
}
?>
