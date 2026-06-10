<?php
header('Content-Type: application/json; charset=utf-8');
require_once '../../db.php';

$input   = json_decode(file_get_contents('php://input'), true);
$id      = intval($input['id']      ?? 0);
$type    = $input['type']           ?? 'siswa';
$status  = $input['status']         ?? 'baru';
$catatan = $input['catatan']        ?? '';

$allowed = ['siswa' => 'pendaftaran_siswa', 'orang_tua' => 'pendaftaran_orang_tua', 'guru' => 'pendaftaran_guru'];
$table   = $allowed[$type] ?? 'pendaftaran_siswa';

$stmt = $conn->prepare("UPDATE `$table` SET status=?, catatan=? WHERE id=?");
$stmt->bind_param('ssi', $status, $catatan, $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error], JSON_UNESCAPED_UNICODE);
}
$stmt->close();
$conn->close();
