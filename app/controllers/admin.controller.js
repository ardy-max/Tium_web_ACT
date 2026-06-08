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
});
