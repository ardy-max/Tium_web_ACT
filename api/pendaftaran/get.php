<?php
header('Content-Type: application/json; charset=utf-8');
require_once '../../db.php';

$type = $_GET['type'] ?? 'siswa';

// Whitelist table names untuk keamanan
$allowed = ['siswa' => 'pendaftaran_siswa', 'orang_tua' => 'pendaftaran_orang_tua', 'guru' => 'pendaftaran_guru'];
$table = $allowed[$type] ?? 'pendaftaran_siswa';

$result = $conn->query("SELECT * FROM `$table` ORDER BY created_at DESC");
$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}
echo json_encode(['success' => true, 'type' => $type, 'data' => $data], JSON_UNESCAPED_UNICODE);
$conn->close();
