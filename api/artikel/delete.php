<?php
header('Content-Type: application/json; charset=utf-8');
require_once '../../db.php';

$input = json_decode(file_get_contents('php://input'), true);
$id    = intval($input['id'] ?? 0);

$stmt = $conn->prepare("DELETE FROM artikel WHERE id = ?");
$stmt->bind_param('i', $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error], JSON_UNESCAPED_UNICODE);
}
$stmt->close();
$conn->close();
