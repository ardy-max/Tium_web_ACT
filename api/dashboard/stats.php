<?php
header('Content-Type: application/json; charset=utf-8');
require_once '../../db.php';

// Ambil jumlah dari setiap tabel
function countTable($conn, $table) {
    $res = $conn->query("SELECT COUNT(*) as total FROM `$table`");
    $row = $res->fetch_assoc();
    return (int)$row['total'];
}

$stats = [
    'artikel'            => countTable($conn, 'artikel'),
    'galeri'             => countTable($conn, 'galeri'),
    'statistik'          => countTable($conn, 'statistik'),
    'pendaftaran_siswa'  => countTable($conn, 'pendaftaran_siswa'),
    'pendaftaran_ortu'   => countTable($conn, 'pendaftaran_orang_tua'),
    'pendaftaran_guru'   => countTable($conn, 'pendaftaran_guru'),
    'donasi'             => countTable($conn, 'donasi'),
    'donasi_menunggu'    => (function($conn) {
        $res = $conn->query("SELECT COUNT(*) as t FROM donasi WHERE status='menunggu'");
        return (int)$res->fetch_assoc()['t'];
    })($conn),
];

$stats['total_pendaftaran'] = $stats['pendaftaran_siswa'] + $stats['pendaftaran_ortu'] + $stats['pendaftaran_guru'];

echo json_encode(['success' => true, 'data' => $stats], JSON_UNESCAPED_UNICODE);
$conn->close();
