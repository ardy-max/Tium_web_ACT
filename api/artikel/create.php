<?php
header('Content-Type: application/json; charset=utf-8');
require_once '../../db.php';

<<<<<<< HEAD
$input      = json_decode(file_get_contents('php://input'), true);
$judul      = $input['judul']      ?? '';
$kategori   = $input['kategori']   ?? '';
$ringkasan  = $input['ringkasan']  ?? '';
$isi        = $input['isi']        ?? '';
$gambar_url = $input['gambar_url'] ?? '';
$penulis    = $input['penulis']    ?? '';
$tanggal    = $input['tanggal']    ?? date('Y-m-d');
$status     = $input['status']     ?? 'draft';
=======
$judul      = $_POST['judul']      ?? '';
$kategori   = $_POST['kategori']   ?? '';
$ringkasan  = $_POST['ringkasan']  ?? '';
$isi        = $_POST['isi']        ?? '';
$gambar_url = $_POST['gambar_url'] ?? '';
$penulis    = $_POST['penulis']    ?? '';
$tanggal    = $_POST['tanggal']    ?? date('Y-m-d');
$status     = $_POST['status']     ?? 'draft';
>>>>>>> 3fb9f7d2fe4ad02ef2460e7f201261181cd36ea5

$stmt = $conn->prepare(
    "INSERT INTO artikel (judul, kategori, ringkasan, isi, gambar_url, penulis, tanggal, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
);
$stmt->bind_param('ssssssss', $judul, $kategori, $ringkasan, $isi, $gambar_url, $penulis, $tanggal, $status);

if ($stmt->execute()) {
<<<<<<< HEAD
    echo json_encode(['success' => true, 'id' => $conn->insert_id], JSON_UNESCAPED_UNICODE);
=======
    $id = $conn->insert_id;
    
    if (isset($_FILES['gambar']) && $_FILES['gambar']['error'] === UPLOAD_ERR_OK) {
        $target_dir = "../../public/images/artikel_image/";
        if (!file_exists($target_dir)) {
            mkdir($target_dir, 0777, true);
        }
        
        $file_tmp = $_FILES['gambar']['tmp_name'];
        $file_name = $_FILES['gambar']['name'];
        $ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
        
        $new_filename = $id . '.' . $ext;
        $target_file = $target_dir . $new_filename;
        
        if (move_uploaded_file($file_tmp, $target_file)) {
            $db_path = "images/artikel_image/" . $new_filename;
            $update_stmt = $conn->prepare("UPDATE artikel SET gambar_url = ? WHERE id = ?");
            $update_stmt->bind_param('si', $db_path, $id);
            $update_stmt->execute();
            $update_stmt->close();
            $gambar_url = $db_path;
        }
    }
    
    echo json_encode(['success' => true, 'id' => $id, 'gambar_url' => $gambar_url], JSON_UNESCAPED_UNICODE);
>>>>>>> 3fb9f7d2fe4ad02ef2460e7f201261181cd36ea5
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error], JSON_UNESCAPED_UNICODE);
}
$stmt->close();
$conn->close();
<<<<<<< HEAD
=======

>>>>>>> 3fb9f7d2fe4ad02ef2460e7f201261181cd36ea5
