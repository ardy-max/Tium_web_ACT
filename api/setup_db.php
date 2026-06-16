<?php
require_once '../db.php';

// Create users table
$sql = "CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nama VARCHAR(150),
    role ENUM('admin', 'karyawan') DEFAULT 'karyawan',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo "Table 'users' created successfully.<br>";
} else {
    die("Error creating table: " . $conn->error);
}

// Insert default admin user if it doesn't exist
$check_admin = "SELECT * FROM users WHERE username = 'admin'";
$result = $conn->query($check_admin);

if ($result->num_rows == 0) {
    $password = password_hash('admin123', PASSWORD_DEFAULT);
    $insert = "INSERT INTO users (username, password, nama, role) VALUES ('admin', '$password', 'Administrator', 'admin')";
    if ($conn->query($insert) === TRUE) {
        echo "Default admin user created. (Username: admin, Password: admin123)<br>";
    } else {
        echo "Error inserting admin user: " . $conn->error;
    }
} else {
    echo "Default admin user already exists.<br>";
}

$conn->close();
?>
