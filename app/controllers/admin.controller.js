/**
 * controllers/admin.controller.js
 * Logika halaman Admin Dashboard.
 */

document.addEventListener('DOMContentLoaded', function () {
  // Tombol logout
  const logoutBtn = document.querySelector('.top-bar button.btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      if (confirm('Yakin ingin logout?')) {
        alert('Anda telah logout.');
        // TODO: tambahkan redirect ke halaman login
      }
    });
  }

  // Toggle Sidebar Admin (Mobile)
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');

  if (sidebarToggle && sidebar && sidebarOverlay) {
    function toggleSidebar() {
      sidebarToggle.classList.toggle('active');
      sidebar.classList.toggle('active');
      sidebarOverlay.classList.toggle('active');
    }

    function closeSidebar() {
      sidebarToggle.classList.remove('active');
      sidebar.classList.remove('active');
      sidebarOverlay.classList.remove('active');
    }

    sidebarToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleSidebar();
    });

    sidebarOverlay.addEventListener('click', closeSidebar);

    // Tutup sidebar jika ukuran layar di-resize di atas tablet
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        closeSidebar();
      }
    });
  }
});

