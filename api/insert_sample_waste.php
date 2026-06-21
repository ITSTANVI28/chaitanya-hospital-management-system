<?php
require_once '../db_connect.php';
$date = date('Y-m-d');
$pdo->query("INSERT INTO waste_logs (date, item_name, type, department, weight, status) VALUES ('$date', 'Item1', 'Biomedical', 'ICU', 12.5, 'Pending'), ('$date', 'Item2', 'Sharps', 'OT', 5.0, 'Disposed'), ('$date', 'Item3', 'General', 'Ward', 20.0, 'Pending')");
echo 'Done';
?>
