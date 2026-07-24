<?php require_once '../../../api/auth/protect.php'; ?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Dashboard | ACT</title>
  <link rel="icon" href="../../../public/images/act tab logo.jpg" sizes="36x36" type="image/png">
  
  <!-- CSS Links -->
  <link rel="stylesheet" href="../../../public/css/global.css">
  <link rel="stylesheet" href="../../../public/css/pages/admin.css">
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
          <li><a href="./index.php" class="active">📊 Dashboard</a></li>
          <li><a href="./artikel.php">📰 Artikel</a></li>
          <li><a href="./statistik.php">📈 Statistik</a></li>
          <li><a href="./galeri.php">🖼️ Galeri</a></li>
          <li><a href="./pendaftaran.php">📋 Pendaftaran</a></li>
          <li><a href="./donasi.php">💰 Donasi</a></li>
        
          <?php if (isset($_SESSION['role']) && $_SESSION['role'] === 'admin'): ?>
          <li><a href="./users.php">👥 Kelola User</a></li>
          <?php endif; ?>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="admin-main">
      <!-- Top Bar -->
      <header class="top-bar">
        <button class="sidebar-toggle" id="sidebar-toggle" aria-label="Toggle Sidebar">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h2>Dashboard</h2>
        <div>
          <span>Welcome, <strong><?php echo htmlspecialchars($_SESSION['nama'] ?? 'User'); ?></strong></span>
          <button class="btn-logout">Logout</button>
        </div>
      </header>

      <!-- Dashboard Content -->
      <main class="dashboard-content">
        <h2>Dashboard Overview</h2>
        <p>Selamat datang di panel admin. Di sini Anda bisa mengelola konten website, pengguna, dan melihat statistik.</p>

        <!-- Statistics Section -->
        <div class="stats-row">
          <div class="stat-card-admin">
            <h3>Users</h3>
            <p>24,420</p>
          </div>
          <div class="stat-card-admin">
            <h3>Clients</h3>
            <p>15,520</p>
          </div>
          <div class="stat-card-admin">
            <h3>Projects</h3>
            <p>12,430</p>
          </div>
          <div class="stat-card-admin">
            <h3>Old Projects</h3>
            <p>14,430</p>
          </div>
        </div>

        <!-- Quick Links Section -->
        <div class="quick-links" style="margin-top: 30px; background: var(--color-white); padding: 24px; border-radius: var(--radius-md); box-shadow: var(--shadow-sm);">
          <h3 style="margin-bottom: 15px; color: var(--color-navy);">Quick Actions</h3>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 10px;"><a href="./artikel.php" style="color: var(--color-accent); text-decoration: none;">+ Tambah / Kelola Artikel</a></li>
            <li style="margin-bottom: 10px;"><a href="./galeri.php" style="color: var(--color-accent); text-decoration: none;">Kelola Galeri Foto</a></li>
            <li style="margin-bottom: 10px;"><a href="./statistik.php" style="color: var(--color-accent); text-decoration: none;">Lihat & Kelola Statistik</a></li>
          </ul>
        </div>
      </main>
    </div>
  </div>

  <!-- JavaScript Controller -->
  <script src="../../controllers/admin.controller.js"></script>
</body>
</html>
