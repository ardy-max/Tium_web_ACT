<?php
header('Content-Type: application/json; charset=utf-8');
require_once '../../db.php';

<<<<<<< HEAD
$input      = json_decode(file_get_contents('php://input'), true);
$nama_file  = $input['nama_file']  ?? '';
$path_foto  = $input['path_foto']  ?? '';
$keterangan = $input['keterangan'] ?? '';
$urutan     = intval($input['urutan'] ?? 0);
=======
$keterangan = $_POST['keterangan'] ?? '';
$urutan     = intval($_POST['urutan'] ?? 0);
$nama_file  = $_POST['nama_file'] ?? '';
$path_foto  = $_POST['path_foto'] ?? '';
>>>>>>> 3fb9f7d2fe4ad02ef2460e7f201261181cd36ea5

$stmt = $conn->prepare(
    "INSERT INTO galeri (nama_file, path_foto, keterangan, urutan) VALUES (?, ?, ?, ?)"
);
$stmt->bind_param('sssi', $nama_file, $path_foto, $keterangan, $urutan);

if ($stmt->execute()) {
<<<<<<< HEAD
    echo json_encode(['success' => true, 'id' => $conn->insert_id], JSON_UNESCAPED_UNICODE);
=======
    $id = $conn->insert_id;
    
    if (isset($_FILES['foto']) && $_FILES['foto']['error'] === UPLOAD_ERR_OK) {
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
            $db_path = "galery_images/" . $new_filename;
            
            $update_stmt = $conn->prepare("UPDATE galeri SET nama_file = ?, path_foto = ? WHERE id = ?");
            $update_stmt->bind_param('ssi', $new_filename, $db_path, $id);
            $update_stmt->execute();
            $update_stmt->close();
            
            $nama_file = $new_filename;
            $path_foto = $db_path;
        }
    }
    
    echo json_encode([
        'success' => true, 
        'id' => $id, 
        'nama_file' => $nama_file, 
        'path_foto' => $path_foto
    ], JSON_UNESCAPED_UNICODE);
>>>>>>> 3fb9f7d2fe4ad02ef2460e7f201261181cd36ea5
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error], JSON_UNESCAPED_UNICODE);
}
$stmt->close();
$conn->close();
<<<<<<< HEAD
=======

>>>>>>> 3fb9f7d2fe4ad02ef2460e7f201261181cd36ea5
