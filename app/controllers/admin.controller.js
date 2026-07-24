/**
 * controllers/admin.controller.js
 * Logika halaman Admin Dashboard.
 */

document.addEventListener('DOMContentLoaded', function () {
  // Tombol logout
  const logoutBtn = document.querySelector('.top-bar button.btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async function () {
      if (confirm('Yakin ingin logout?')) {
        try {
            await fetch('../../../api/auth/logout.php');
            window.location.href = '../login.html';
        } catch(e) {
            console.error('Logout error', e);
        }
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

