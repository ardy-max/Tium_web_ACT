<?php
header('Content-Type: application/json; charset=utf-8');
require_once '../../db.php';

<<<<<<< HEAD
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
=======
$id         = intval($_POST['id']        ?? 0);
$judul      = $_POST['judul']            ?? '';
$kategori   = $_POST['kategori']         ?? '';
$ringkasan  = $_POST['ringkasan']        ?? '';
$isi        = $_POST['isi']              ?? '';
$gambar_url = $_POST['gambar_url']       ?? '';
$penulis    = $_POST['penulis']          ?? '';
$tanggal    = $_POST['tanggal']          ?? date('Y-m-d');
$status     = $_POST['status']           ?? 'draft';

if ($id <= 0) {
    echo json_encode(['success' => false, 'error' => 'Invalid ID'], JSON_UNESCAPED_UNICODE);
    exit;
}

if (isset($_FILES['gambar']) && $_FILES['gambar']['error'] === UPLOAD_ERR_OK) {
    $sel_stmt = $conn->prepare("SELECT gambar_url FROM artikel WHERE id = ?");
    $sel_stmt->bind_param('i', $id);
    $sel_stmt->execute();
    $sel_stmt->bind_result($old_gambar);
    if ($sel_stmt->fetch() && !empty($old_gambar)) {
        $old_file_path = "../../public/" . $old_gambar;
        if (file_exists($old_file_path)) {
            @unlink($old_file_path);
        }
    }
    $sel_stmt->close();

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
        $gambar_url = "images/artikel_image/" . $new_filename;
    }
} else {
    $sel_stmt = $conn->prepare("SELECT gambar_url FROM artikel WHERE id = ?");
    $sel_stmt->bind_param('i', $id);
    $sel_stmt->execute();
    $sel_stmt->bind_result($old_gambar);
    if ($sel_stmt->fetch() && !empty($old_gambar)) {
        if (empty($gambar_url)) {
            $gambar_url = $old_gambar;
        }
    }
    $sel_stmt->close();
}
>>>>>>> 3fb9f7d2fe4ad02ef2460e7f201261181cd36ea5

$stmt = $conn->prepare(
    "UPDATE artikel SET judul=?, kategori=?, ringkasan=?, isi=?, gambar_url=?, penulis=?, tanggal=?, status=?
     WHERE id=?"
);
$stmt->bind_param('ssssssssi', $judul, $kategori, $ringkasan, $isi, $gambar_url, $penulis, $tanggal, $status, $id);

if ($stmt->execute()) {
<<<<<<< HEAD
    echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
=======
    echo json_encode(['success' => true, 'gambar_url' => $gambar_url], JSON_UNESCAPED_UNICODE);
>>>>>>> 3fb9f7d2fe4ad02ef2460e7f201261181cd36ea5
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error], JSON_UNESCAPED_UNICODE);
}
$stmt->close();
$conn->close();
<<<<<<< HEAD
=======

>>>>>>> 3fb9f7d2fe4ad02ef2460e7f201261181cd36ea5
