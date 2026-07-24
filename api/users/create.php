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
    
    $username = $conn->real_escape_string($data['username'] ?? '');
    $password = $data['password'] ?? '';
    $nama = $conn->real_escape_string($data['nama'] ?? '');
    $role = $conn->real_escape_string($data['role'] ?? 'karyawan');

    if (empty($username) || empty($password) || empty($nama)) {
        echo json_encode(['success' => false, 'message' => 'Semua field (username, password, nama) harus diisi']);
        exit;
    }

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (username, password, nama, role) VALUES ('$username', '$hashed_password', '$nama', '$role')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true, 'message' => 'User berhasil ditambahkan']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Gagal menambahkan user: ' . $conn->error]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Metode request tidak valid']);
}
$conn->close();
?>
