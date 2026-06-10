/**
 * components/navbar.js
 * Meng-inject HTML navbar ke semua halaman.
 * Gunakan <div id="navbar-placeholder"></div> di HTML.
 *
 * CATATAN PATH: path href di-set relatif dari root proyek.
 * Setiap halaman menyuntikkan base path via window.BASE_PATH sebelum load script ini.
 */
(function () {
  const BASE = window.BASE_PATH || '../../../';

  const navbarHTML = `
    <header id="header">
      <div class="logo">
        <a href="${BASE}app/views/home/index.html">
          <img src="${BASE}public/images/ACT logo.png" alt="ACT Logo">
        </a>
      </div>
      <button class="menu-toggle" id="menu-toggle" aria-label="Toggle Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav>
        <ul>
          <li><a href="${BASE}app/views/home/index.html">Beranda</a></li>
          <li>
            <a class="has-submenu">Tentang Kami</a>
            <ul class="submenu">
              <li><a href="${BASE}app/views/visi-misi/index.html">Visi Misi Tujuan</a></li>
              <li><a href="${BASE}app/views/galeri/index.html">Galeri</a></li>
            </ul>
          </li>
          <li>
            <a class="has-submenu">Pendaftaran</a>
            <ul class="submenu">
              <li><a href="${BASE}app/views/pendaftaran/siswa.html">Pendaftaran Siswa Baru (ABK)</a></li>
              <li><a href="${BASE}app/views/pendaftaran/orang-tua.html">Pendaftaran Pelatihan Orang Tua</a></li>
              <li><a href="${BASE}app/views/pendaftaran/guru.html">Pendaftaran Calon Guru</a></li>
            </ul>
          </li>
          <li><a href="${BASE}app/views/artikel/index.html">Artikel</a></li>
          <li><a href="#">Program</a></li>
          <li><a href="${BASE}app/views/home/index.html#donation">Donasi</a></li>
        </ul>
      </nav>
    </header>
  `;

  const placeholder = document.getElementById('navbar-placeholder');
  if (placeholder) {
    placeholder.outerHTML = navbarHTML;

    // Ambil elemen setelah di-inject
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('header nav');

    if (menuToggle && nav) {
      menuToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
      });
    }

    // Toggle submenu di mobile (klik pada tautan induk)
    const sublinks = document.querySelectorAll('header nav ul li a.has-submenu');
    sublinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          const parentLi = link.parentElement;
          
          // Tutup submenu lain yang sedang terbuka
          sublinks.forEach(function (otherLink) {
            if (otherLink !== link) {
              otherLink.parentElement.classList.remove('active');
            }
          });

          parentLi.classList.toggle('active');
        }
      });
    });

    // Menutup menu jika klik di luar header
    document.addEventListener('click', function (e) {
      const header = document.getElementById('header');
      if (header && !header.contains(e.target)) {
        if (menuToggle && menuToggle.classList.contains('active')) {
          menuToggle.classList.remove('active');
          nav.classList.remove('active');
          
          // Reset status submenu
          sublinks.forEach(function (link) {
            link.parentElement.classList.remove('active');
          });
        }
      }
    });

    // Close menu when clicking link in menu (especially useful for anchors like #donation)
    const navLinks = document.querySelectorAll('header nav ul li a:not(.has-submenu)');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (menuToggle && menuToggle.classList.contains('active')) {
          menuToggle.classList.remove('active');
          nav.classList.remove('active');
        }
      });
    });
  }
})();
