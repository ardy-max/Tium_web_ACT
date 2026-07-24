<?php
header('Content-Type: application/json; charset=utf-8');
require_once '../../db.php';

$input      = json_decode(file_get_contents('php://input'), true);
$nama_file  = $input['nama_file']  ?? '';
$path_foto  = $input['path_foto']  ?? '';
$keterangan = $input['keterangan'] ?? '';
$urutan     = intval($input['urutan'] ?? 0);

$stmt = $conn->prepare(
    "INSERT INTO galeri (nama_file, path_foto, keterangan, urutan) VALUES (?, ?, ?, ?)"
);
$stmt->bind_param('sssi', $nama_file, $path_foto, $keterangan, $urutan);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'id' => $conn->insert_id], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error], JSON_UNESCAPED_UNICODE);
}
$stmt->close();
$conn->close();
