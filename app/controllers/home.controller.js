/**
 * controllers/home.controller.js
 * Logika khusus halaman Home:
 *  - Render artikel terbaru (3 pertama dari database yang published)
 *  - Render statistik dari database
 */

document.addEventListener('DOMContentLoaded', function () {

  const base = window.BASE_PATH || '../../../';

  function getImageUrl(url) {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
      return url;
    }
    if (url.startsWith('../')) {
      return url;
    }
    if (url.startsWith('public/')) {
      return base + url;
    }
    if (url.startsWith('images/')) {
      return base + 'public/' + url;
    }
    return base + 'public/images/' + url;
  }

  // ── Render Artikel Terbaru ────────────────────────────────────────
  const articlesContainer = document.querySelector('.articles-container');
  if (articlesContainer) {
    articlesContainer.innerHTML = '<div style="text-align:center; padding: 20px; color:#888;">Memuat artikel…</div>';
    
    fetch(base + 'api/artikel/get.php')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data && json.data.length > 0) {
          articlesContainer.innerHTML = '';
          const recent = json.data.filter(a => a.status === 'published').slice(0, 3);
          
          if (recent.length === 0) {
            articlesContainer.innerHTML = '<div style="text-align:center; padding: 20px; color:#888;">Belum ada artikel terbaru.</div>';
            return;
          }

          recent.forEach(function (article) {
            const el = document.createElement('a');
            el.classList.add('article');
            el.href = '../artikel/index.html';
            el.innerHTML = `
              <img src="${getImageUrl(article.gambar_url)}" alt="Artikel Gambar" style="object-fit: cover;">
              <div class="article-info">
                <span class="category">${article.kategori}</span>
                <h3>${article.judul}</h3>
                <p>${article.ringkasan}</p>
                <span class="author">${article.penulis}</span>
                <span class="date">${article.tanggal}</span>
              </div>
            `;
            articlesContainer.appendChild(el);
          });
        } else {
          articlesContainer.innerHTML = '<div style="text-align:center; padding: 20px; color:#888;">Belum ada artikel terbaru.</div>';
        }
      })
      .catch(err => {
        console.error('Gagal mengambil data artikel:', err);
        articlesContainer.innerHTML = '<div style="text-align:center; padding: 20px; color:#888;">⚠️ Gagal memuat artikel.</div>';
      });
  }

  // ── Render Statistik ──────────────────────────────────────────────
  const statsGrid = document.querySelector('.stats-grid-modern');
  if (statsGrid) {
    statsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; color:#888;">Memuat data statistik…</div>';
    
    fetch(base + 'api/statistik/get.php')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data && json.data.length > 0) {
          statsGrid.innerHTML = '';
          json.data.forEach(function (stat) {
            const card = document.createElement('div');
            card.classList.add('stat-card');
            card.innerHTML = `
              <h2 class="stat-number">${stat.nilai_stat}</h2>
              <h3 class="stat-title">${stat.nama_stat}</h3>
              <p class="stat-desc">${stat.deskripsi}</p>
            `;
            statsGrid.appendChild(card);
          });
        } else {
          statsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; color:#888;">Belum ada data statistik.</div>';
        }
      })
      .catch(err => {
        console.error('Gagal mengambil data statistik:', err);
        statsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; color:#888;">⚠️ Gagal memuat statistik.</div>';
      });
  }

});

