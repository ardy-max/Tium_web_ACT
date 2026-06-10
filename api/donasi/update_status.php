<?php
header('Content-Type: application/json; charset=utf-8');
require_once '../../db.php';

$input  = json_decode(file_get_contents('php://input'), true);
$id     = intval($input['id']     ?? 0);
$status = $input['status']        ?? 'menunggu';

$stmt = $conn->prepare("UPDATE donasi SET status=? WHERE id=?");
$stmt->bind_param('si', $status, $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error], JSON_UNESCAPED_UNICODE);
}
$stmt->close();
$conn->close();
