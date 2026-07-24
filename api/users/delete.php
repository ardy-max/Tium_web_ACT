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

    if ($id === 0) {
        echo json_encode(['success' => false, 'message' => 'ID tidak valid']);
        exit;
    }

    if ($id === intval($_SESSION['user_id'])) {
        echo json_encode(['success' => false, 'message' => 'Admin tidak dapat menghapus akunnya sendiri']);
        exit;
    }

    // Check if the user to be deleted is an admin
    $check_role_sql = "SELECT role FROM users WHERE id = $id";
    $result = $conn->query($check_role_sql);
    
    if ($result->num_rows > 0) {
        $user_to_delete = $result->fetch_assoc();
        
        if ($user_to_delete['role'] === 'admin') {
            // Count total admins
            $count_admin_sql = "SELECT COUNT(*) as count FROM users WHERE role = 'admin'";
            $count_result = $conn->query($count_admin_sql);
            $row = $count_result->fetch_assoc();
            
            if ($row['count'] <= 1) {
                echo json_encode(['success' => false, 'message' => 'Tidak dapat menghapus admin terakhir. Minimal harus ada 1 admin.']);
                exit;
            }
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'User tidak ditemukan']);
        exit;
    }

    $sql = "DELETE FROM users WHERE id = $id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true, 'message' => 'User berhasil dihapus']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Gagal menghapus user: ' . $conn->error]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Metode request tidak valid']);
}
$conn->close();
?>
