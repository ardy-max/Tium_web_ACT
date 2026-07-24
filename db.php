<?php
$host = 'localhost';
$username = 'ardy_user';
$password = 'ArdySecurePass123*';
$dbname = 'act_db';

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
