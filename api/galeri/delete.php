<?php
header('Content-Type: application/json; charset=utf-8');
require_once '../../db.php';

$input = json_decode(file_get_contents('php://input'), true);
$id    = intval($input['id'] ?? 0);
<<<<<<< HEAD

$stmt = $conn->prepare("DELETE FROM galeri WHERE id = ?");
$stmt->bind_param('i', $id);
=======
$ids   = $input['ids'] ?? [];

if ($id > 0) {
    $ids[] = $id;
}

if (empty($ids)) {
    echo json_encode(['success' => false, 'error' => 'No ID specified'], JSON_UNESCAPED_UNICODE);
    exit;
}

$ids = array_map('intval', $ids);

foreach ($ids as $item_id) {
    $sel_stmt = $conn->prepare("SELECT path_foto FROM galeri WHERE id = ?");
    $sel_stmt->bind_param('i', $item_id);
    $sel_stmt->execute();
    $sel_stmt->bind_result($path_foto);
    if ($sel_stmt->fetch() && !empty($path_foto)) {
        $file_path = "../../public/images/" . $path_foto;
        if (file_exists($file_path)) {
            @unlink($file_path);
        }
    }
    $sel_stmt->close();
}

$placeholders = implode(',', array_fill(0, count($ids), '?'));
$types = str_repeat('i', count($ids));

$stmt = $conn->prepare("DELETE FROM galeri WHERE id IN ($placeholders)");
$stmt->bind_param($types, ...$ids);
>>>>>>> 3fb9f7d2fe4ad02ef2460e7f201261181cd36ea5

if ($stmt->execute()) {
    echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error], JSON_UNESCAPED_UNICODE);
}
$stmt->close();
$conn->close();
<<<<<<< HEAD
=======

>>>>>>> 3fb9f7d2fe4ad02ef2460e7f201261181cd36ea5
