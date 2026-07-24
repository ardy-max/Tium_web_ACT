<?php
header('Content-Type: application/json; charset=utf-8');
require_once '../../db.php';

$input      = json_decode(file_get_contents('php://input'), true);
$id         = intval($input['id']        ?? 0);
$judul      = $input['judul']            ?? '';
$kategori   = $input['kategori']         ?? '';
$ringkasan  = $input['ringkasan']        ?? '';
$isi        = $input['isi']              ?? '';
$gambar_url = $input['gambar_url']       ?? '';
$penulis    = $input['penulis']          ?? '';
$tanggal    = $input['tanggal']          ?? date('Y-m-d');
$status     = $input['status']           ?? 'draft';

$stmt = $conn->prepare(
    "UPDATE artikel SET judul=?, kategori=?, ringkasan=?, isi=?, gambar_url=?, penulis=?, tanggal=?, status=?
     WHERE id=?"
);
$stmt->bind_param('ssssssssi', $judul, $kategori, $ringkasan, $isi, $gambar_url, $penulis, $tanggal, $status, $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error], JSON_UNESCAPED_UNICODE);
}
$stmt->close();
$conn->close();
