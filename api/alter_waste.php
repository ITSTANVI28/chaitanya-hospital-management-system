<?php
require_once '../db_connect.php';
try {
    $pdo->exec("ALTER TABLE waste_logs MODIFY COLUMN status ENUM('Disposed','Pending','Failed') NOT NULL DEFAULT 'Pending'");
    echo "Success: Enum modified.";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
