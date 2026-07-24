<?php
session_start();
require_once '../../db.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $id = intval($data['id'] ?? 0);
    $nama = $conn->real_escape_string($data['nama'] ?? '');
    $role = $conn->real_escape_string($data['role'] ?? '');

    if ($id === 0 || empty($nama) || empty($role)) {
        echo json_encode(['success' => false, 'message' => 'Data tidak lengkap']);
        exit;
    }

    if ($id === intval($_SESSION['user_id'])) {
        echo json_encode(['success' => false, 'message' => 'Admin tidak dapat mengedit data dirinya sendiri']);
        exit;
    }

    $sql = "UPDATE users SET nama = '$nama', role = '$role' WHERE id = $id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true, 'message' => 'User berhasil diupdate']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Gagal mengupdate user: ' . $conn->error]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Metode request tidak valid']);
}
$conn->close();
?>
