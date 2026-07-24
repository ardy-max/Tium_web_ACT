<?php
session_start();

// Determine base URL dynamically or statically. Assuming standard setup:
$base_url = '/app';

if (!isset($_SESSION['user_id']) || !isset($_SESSION['role'])) {
    // If not logged in, redirect to login page
    header("Location: $base_url/views/login.html");
    exit();
}
?>
