<?php
header('Content-Type: application/json; charset=utf-8');
require_once '../../db.php';

$input      = json_decode(file_get_contents('php://input'), true);
$id         = intval($input['id']        ?? 0);
$nama_stat  = $input['nama_stat']        ?? '';
$nilai_stat = $input['nilai_stat']       ?? '';
$deskripsi  = $input['deskripsi']        ?? '';
$urutan     = intval($input['urutan']    ?? 0);

$stmt = $conn->prepare(
    "UPDATE statistik SET nama_stat=?, nilai_stat=?, deskripsi=?, urutan=? WHERE id=?"
);
$stmt->bind_param('sssii', $nama_stat, $nilai_stat, $deskripsi, $urutan, $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error], JSON_UNESCAPED_UNICODE);
}
$stmt->close();
$conn->close();
