<?php 
require_once '../../../api/auth/protect.php'; 
if ($_SESSION['role'] !== 'admin') {
    // Karyawan cannot access this page
    header("Location: index.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kelola User | ACT Dashboard</title>
  <link rel="icon" href="../../../public/images/act tab logo.jpg" sizes="36x36" type="image/png">
  
  <link rel="stylesheet" href="../../../public/css/global.css">
  <link rel="stylesheet" href="../../../public/css/pages/admin.css">
  <style>
    .users-container {
        background: var(--color-white);
        padding: 24px;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-sm);
        margin-top: 20px;
    }
    .users-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    .btn-add-user {
        background: var(--color-accent);
        color: var(--color-white);
        padding: 10px 16px;
        border: none;
        border-radius: var(--radius-sm);
        cursor: pointer;
    }
    .users-table {
        width: 100%;
        border-collapse: collapse;
    }
    .users-table th, .users-table td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid var(--color-gray-light);
    }
    .users-table th {
        background-color: #f8f9fa;
        color: var(--color-navy);
    }
    .btn-edit, .btn-delete {
        padding: 6px 12px;
        border: none;
        border-radius: var(--radius-sm);
        cursor: pointer;
        margin-right: 5px;
        color: white;
    }
    .btn-edit { background: var(--color-primary); }
    .btn-delete { background: #e74c3c; }
    
    /* Modal styles */
    .modal {
        display: none;
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.5);
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }
    .modal-content {
        background: white;
        padding: 30px;
        border-radius: var(--radius-md);
        width: 100%;
        max-width: 400px;
    }
    .modal-content h3 { margin-top: 0; margin-bottom: 20px; color: var(--color-navy); }
    .form-group { margin-bottom: 15px; }
    .form-group label { display: block; margin-bottom: 5px; }
    .form-group input, .form-group select {
        width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;
    }
    .modal-actions { text-align: right; margin-top: 20px; }
    .btn-cancel { background: #95a5a6; color: white; padding: 8px 15px; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;}
    .btn-save { background: var(--color-accent); color: white; padding: 8px 15px; border: none; border-radius: 4px; cursor: pointer; }
    
    /* Badge for current user */
    .badge-you {
        background: #2ecc71;
        color: white;
        font-size: 0.8rem;
        padding: 2px 6px;
        border-radius: 10px;
        margin-left: 5px;
    }
  </style>
</head>
<body>
  <div class="admin-layout">
    <!-- Backdrop Overlay -->
    <div class="sidebar-overlay" id="sidebar-overlay"></div>

    <!-- Sidebar Menu -->
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-logo">
        <img src="../../../public/images/ACT logo.png" alt="ACT Logo">
        <p>Autistic Children's Therapy</p>
      </div>
      <nav>
        <ul>
          <li><a href="./index.php">📊 Dashboard</a></li>
          <li><a href="./artikel.php">📰 Artikel</a></li>
          <li><a href="./statistik.php">📈 Statistik</a></li>
          <li><a href="./galeri.php">🖼️ Galeri</a></li>
          <li><a href="./pendaftaran.php">📋 Pendaftaran</a></li>
          <li><a href="./donasi.php">💰 Donasi</a></li>
          <?php if (isset($_SESSION['role']) && $_SESSION['role'] === 'admin'): ?>
          <li><a href="./users.php" class="active">👥 Kelola User</a></li>
          <?php endif; ?>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="admin-main">
      <header class="top-bar">
        <button class="sidebar-toggle" id="sidebar-toggle" aria-label="Toggle Sidebar">
          <span></span><span></span><span></span>
        </button>
        <h2>Kelola User</h2>
        <div>
          <span>Welcome, <strong><?php echo htmlspecialchars($_SESSION['nama'] ?? 'User'); ?></strong></span>
          <button class="btn-logout">Logout</button>
        </div>
      </header>

      <main class="dashboard-content">
        <div class="users-container">
            <div class="users-header">
                <h3>Daftar Pengguna</h3>
                <button class="btn-add-user" id="btn-add-user">+ Tambah User</button>
            </div>
            
            <table class="users-table">
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Tanggal Dibuat</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody id="users-tbody">
                    <!-- Data will be loaded via JS -->
                </tbody>
            </table>
        </div>
      </main>
    </div>
  </div>

  <!-- User Modal -->
  <div class="modal" id="user-modal">
      <div class="modal-content">
          <h3 id="modal-title">Tambah User</h3>
          <form id="user-form">
              <input type="hidden" id="user-id">
              <div class="form-group">
                  <label>Nama Lengkap</label>
                  <input type="text" id="user-nama" required>
              </div>
              <div class="form-group" id="group-username">
                  <label>Username</label>
                  <input type="text" id="user-username" required>
              </div>
              <div class="form-group" id="group-password">
                  <label>Password</label>
                  <input type="password" id="user-password" required minlength="6">
              </div>
              <div class="form-group">
                  <label>Role</label>
                  <select id="user-role">
                      <option value="karyawan">Karyawan</option>
                      <option value="admin">Admin</option>
                  </select>
              </div>
              <div class="modal-actions">
                  <button type="button" class="btn-cancel" onclick="closeModal()">Batal</button>
                  <button type="submit" class="btn-save">Simpan</button>
              </div>
          </form>
      </div>
  </div>

  <script>
      // Pass the current user ID to JS
      const currentUserId = <?php echo $_SESSION['user_id']; ?>;
  </script>
  <script src="../../controllers/admin.controller.js"></script>
  <script src="../../controllers/admin-users.controller.js"></script>
</body>
</html>
