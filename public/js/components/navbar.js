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
      <nav>
        <ul>
          <li><a href="${BASE}app/views/home/index.html">Beranda</a></li>
          <li>
            <a>Tentang Kami</a>
            <ul class="submenu">
              <li><a href="${BASE}app/views/visi-misi/index.html">Visi Misi Tujuan</a></li>
              <li><a href="${BASE}app/views/galeri/index.html">Galeri</a></li>
            </ul>
          </li>
          <li>
            <a>Pendaftaran</a>
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
  }
})();
