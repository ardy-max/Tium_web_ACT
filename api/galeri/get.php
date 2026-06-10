<?php
header('Content-Type: application/json; charset=utf-8');
require_once '../../db.php';

$result = $conn->query("SELECT * FROM galeri ORDER BY urutan ASC");
$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}
echo json_encode(['success' => true, 'data' => $data], JSON_UNESCAPED_UNICODE);
$conn->close();
