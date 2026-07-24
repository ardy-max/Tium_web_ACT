<?php require_once '../../../api/auth/protect.php'; ?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin – Galeri | ACT</title>
  <link rel="icon" href="../../../public/images/act tab logo.jpg" sizes="36x36" type="image/png">
  <link rel="stylesheet" href="../../../public/css/global.css">
  <link rel="stylesheet" href="../../../public/css/pages/admin.css">
</head>
<body>
<div class="admin-layout">
  <div class="sidebar-overlay" id="sidebar-overlay"></div>

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
        <li><a href="./galeri.php" class="active">🖼️ Galeri</a></li>
        <li><a href="./pendaftaran.php">📋 Pendaftaran</a></li>
        <li><a href="./donasi.php">💰 Donasi</a></li>
        <?php if (isset($_SESSION['role']) && $_SESSION['role'] === 'admin'): ?>
        <li><a href="./users.php">👥 Kelola User</a></li>
        <?php endif; ?>
      </ul>
    </nav>
  </aside>

  <div class="admin-main">
    <header class="top-bar">
      <button class="sidebar-toggle" id="sidebar-toggle" aria-label="Toggle Sidebar">
        <span></span><span></span><span></span>
      </button>
      <h2>Manajemen Galeri</h2>
      <div class="top-bar-right">
        <a href="../../../app/views/home/index.php" target="_blank"
           style="font-size:13px;color:var(--color-accent);text-decoration:none;white-space:nowrap;">Lihat Situs ↗</a>
        <button class="btn-logout">Logout</button>
      </div>
    </header>

    <main class="dashboard-content">
      <div class="page-header">
        <h2>Data Galeri Foto</h2>
        <div class="page-header-actions" style="display: flex; gap: 10px;">
          <button class="btn btn-danger" id="btn-hapus-terpilih" style="display: none;">🗑️ Hapus Terpilih</button>
          <button class="btn btn-primary" id="btn-tambah">+ Tambah Foto</button>
        </div>
      </div>

      <div id="alert-container"></div>

      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width:40px; text-align: center;"><input type="checkbox" id="check-all"></th>
              <th style="width:44px">No</th>
              <th>Foto</th>
              <th>Nama File</th>
              <th>Keterangan</th>
              <th style="width:70px">Urutan</th>
              <th style="width:140px">Aksi</th>
            </tr>
          </thead>
          <tbody id="galeri-tbody">
            <tr><td colspan="7" class="empty-state"><p>Memuat data…</p></td></tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</div>

<!-- Modal Tambah / Edit Galeri -->
<div class="modal-backdrop" id="modal-backdrop">
  <div class="modal">
    <div class="modal-header">
      <h3 id="modal-title">Tambah Foto</h3>
      <button class="modal-close" id="modal-close">×</button>
    </div>
    <div class="modal-body">
      <input type="hidden" id="galeri-id">
      <div class="form-group">
        <label class="form-label">Pilih Foto *</label>
        <input type="file" class="form-control" id="f-foto" accept="image/*">
        <input type="hidden" id="f-path_foto">
        <input type="hidden" id="f-nama_file">
        <div id="foto-preview-container" style="margin-top: 10px; display: none;">
          <p style="font-size: 11px; margin-bottom: 5px; color: #888;">Foto Saat Ini:</p>
          <img id="foto-preview" src="" alt="Preview" style="max-height: 100px; border-radius: 4px; border: 1px solid #ccc; display: block;">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Keterangan / Caption *</label>
        <input type="text" class="form-control" id="f-keterangan" required placeholder="Keterangan foto kegiatan…">
      </div>
      <div class="form-group">
        <label class="form-label">Urutan Tampil</label>
        <input type="number" class="form-control" id="f-urutan" min="0" value="0" placeholder="Angka urutan tampil (0 = pertama)">
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" id="btn-batal">Batal</button>
      <button class="btn btn-primary" id="btn-simpan">💾 Simpan</button>
    </div>
  </div>
</div>

<script src="../../controllers/admin.controller.js"></script>
<script src="../../controllers/admin-galeri.controller.js"></script>
</body>
</html>
