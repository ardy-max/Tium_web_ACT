/**
 * shared/social-menu.js
 * Menyembunyikan floating social media menu saat scroll mendekati footer.
 * Dipakai di halaman yang memiliki elemen .menu_sosial.
 */
(function () {
  const THRESHOLD = 0.95; // sembunyikan saat scroll 95% dari tinggi halaman

  window.addEventListener('scroll', function () {
    const menu = document.querySelector('.menu_sosial');
    if (!menu) return;

    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight   = window.innerHeight;
    const scrollPosition = window.scrollY;

    if (scrollPosition >= documentHeight * THRESHOLD - windowHeight) {
      menu.classList.add('hidden');
    } else {
      menu.classList.remove('hidden');
    }
  });
})();
