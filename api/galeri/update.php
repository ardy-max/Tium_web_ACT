<?php
header('Content-Type: application/json; charset=utf-8');
require_once '../../db.php';

$id         = intval($_POST['id']        ?? 0);
$nama_file  = $_POST['nama_file']        ?? '';
$path_foto  = $_POST['path_foto']        ?? '';
$keterangan = $_POST['keterangan']       ?? '';
$urutan     = intval($_POST['urutan']    ?? 0);

if ($id <= 0) {
    echo json_encode(['success' => false, 'error' => 'Invalid ID'], JSON_UNESCAPED_UNICODE);
    exit;
}

if (isset($_FILES['foto']) && $_FILES['foto']['error'] === UPLOAD_ERR_OK) {
    $sel_stmt = $conn->prepare("SELECT path_foto FROM galeri WHERE id = ?");
    $sel_stmt->bind_param('i', $id);
    $sel_stmt->execute();
    $sel_stmt->bind_result($old_path);
    if ($sel_stmt->fetch() && !empty($old_path)) {
        $old_file_path = "../../public/images/" . $old_path;
        if (file_exists($old_file_path)) {
            @unlink($old_file_path);
        }
    }
    $sel_stmt->close();

    $target_dir = "../../public/images/galery_images/";
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true);
    }
    
    $file_tmp = $_FILES['foto']['tmp_name'];
    $file_name = $_FILES['foto']['name'];
    $ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
    
    $new_filename = 'galeri_' . $id . '.' . $ext;
    $target_file = $target_dir . $new_filename;
    
    if (move_uploaded_file($file_tmp, $target_file)) {
        $nama_file = $new_filename;
        $path_foto = "galery_images/" . $new_filename;
    }
} else {
    $sel_stmt = $conn->prepare("SELECT nama_file, path_foto FROM galeri WHERE id = ?");
    $sel_stmt->bind_param('i', $id);
    $sel_stmt->execute();
    $sel_stmt->bind_result($old_name, $old_path);
    if ($sel_stmt->fetch()) {
        if (empty($nama_file)) $nama_file = $old_name;
        if (empty($path_foto)) $path_foto = $old_path;
    }
    $sel_stmt->close();
}

$stmt = $conn->prepare(
    "UPDATE galeri SET nama_file=?, path_foto=?, keterangan=?, urutan=? WHERE id=?"
);
$stmt->bind_param('sssii', $nama_file, $path_foto, $keterangan, $urutan, $id);

if ($stmt->execute()) {
    echo json_encode([
        'success' => true, 
        'nama_file' => $nama_file, 
        'path_foto' => $path_foto
    ], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error], JSON_UNESCAPED_UNICODE);
}
$stmt->close();
$conn->close();

