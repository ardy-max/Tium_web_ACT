<?php
session_start();

// Determine base URL dynamically or statically. Assuming standard setup:
$base_url = '/Tium_web_ACT';

if (!isset($_SESSION['user_id']) || !isset($_SESSION['role'])) {
    // If not logged in, redirect to login page
    header("Location: $base_url/app/views/login.html");
    exit();
}
?>
