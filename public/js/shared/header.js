/**
 * shared/header.js
 * Menangani efek scroll pada header (dipakai di semua halaman).
 */
window.addEventListener('scroll', function () {
  const header = document.getElementById('header');
  if (!header) return;

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
