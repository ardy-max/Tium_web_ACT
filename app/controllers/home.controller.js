/**
 * controllers/home.controller.js
 * Logika khusus halaman Home:
 *  - Render artikel terbaru (3 pertama dari ArticlesData)
 *  - Render statistik dari StatisticsData
 * Dependensi: src/data/articles.js, src/data/statistics.js
 */

document.addEventListener('DOMContentLoaded', function () {

  // ── Render Artikel Terbaru ────────────────────────────────────────
  const articlesContainer = document.querySelector('.articles-container');
  if (articlesContainer && typeof ArticlesData !== 'undefined') {
    articlesContainer.innerHTML = '';
    const recent = ArticlesData.slice(0, 3);

    recent.forEach(function (article) {
      const el = document.createElement('a');
      el.classList.add('article');
      el.href = '../artikel/index.html';
      el.innerHTML = `
        <img src="${article.image}" alt="Artikel Gambar">
        <div class="article-info">
          <span class="category">${article.category}</span>
          <h3>${article.title}</h3>
          <p>${article.summary}</p>
          <span class="author">${article.author}</span>
          <span class="date">${article.date}</span>
        </div>
      `;
      articlesContainer.appendChild(el);
    });
  }

  // ── Render Statistik ──────────────────────────────────────────────
  const statsGrid = document.querySelector('.stats-grid-modern');
  if (statsGrid && typeof StatisticsData !== 'undefined') {
    statsGrid.innerHTML = '';
    StatisticsData.forEach(function (stat) {
      const card = document.createElement('div');
      card.classList.add('stat-card');
      card.innerHTML = `
        <h2 class="stat-number">${stat.value}</h2>
        <h3 class="stat-title">${stat.title}</h3>
        <p class="stat-desc">${stat.description}</p>
      `;
      statsGrid.appendChild(card);
    });
  }

});
