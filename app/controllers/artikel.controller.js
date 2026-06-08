/**
 * controllers/artikel.controller.js
 * Logika khusus halaman Artikel:
 *  - Render daftar artikel dengan pagination (6 per halaman)
 * Dependensi: src/data/articles.js
 */

document.addEventListener('DOMContentLoaded', function () {

  if (typeof ArticlesData === 'undefined') return;

  const ARTICLES_PER_PAGE = 6;
  let currentPage = 1;

  function renderArticles(page) {
    const start = (page - 1) * ARTICLES_PER_PAGE;
    const end   = page * ARTICLES_PER_PAGE;
    const items = ArticlesData.slice(start, end);

    const container = document.getElementById('articles-container');
    if (!container) return;
    container.innerHTML = '';

    items.forEach(function (article, idx) {
      const el = document.createElement('div');
      el.classList.add('article');
      el.innerHTML = `
        <img src="${article.image}" alt="Artikel Gambar">
        <div class="article-info">
          <span class="category">${article.category}</span>
          <h3>${article.title}</h3>
          <p>${article.summary}</p>
          <span class="author">${article.author}</span>
          <span class="date">${article.date}</span>
          <a href="#" class="read-more">Read More</a>
        </div>
      `;
      container.appendChild(el);
    });

    // Update nomor halaman
    const pageNum = document.getElementById('page-number');
    if (pageNum) pageNum.textContent = currentPage;

    // Tombol navigasi
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage * ARTICLES_PER_PAGE >= ArticlesData.length;
  }

  // Expose ke inline onclick di HTML
  window.changePage = function (direction) {
    if (direction === 'next' && currentPage * ARTICLES_PER_PAGE < ArticlesData.length) {
      currentPage++;
    } else if (direction === 'prev' && currentPage > 1) {
      currentPage--;
    }
    renderArticles(currentPage);
  };

  renderArticles(currentPage);
});
