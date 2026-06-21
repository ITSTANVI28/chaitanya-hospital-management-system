<?php
header('Content-Type: application/json');
require_once '../db_connect.php';

try {
    $stmt = $pdo->query("SELECT * FROM stock_orders ORDER BY CASE WHEN status = 'Pending' THEN 1 ELSE 2 END ASC, order_date DESC");
    $orders = $stmt->fetchAll();
    echo json_encode($orders);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch stock orders: ' . $e->getMessage()]);
}
?>
