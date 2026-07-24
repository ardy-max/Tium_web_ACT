/**
 * controllers/artikel.controller.js
 * Logika khusus halaman Artikel:
 *  - Render daftar artikel dengan pagination (6 per halaman) dari database
 */

document.addEventListener('DOMContentLoaded', function () {

  const ARTICLES_PER_PAGE = 6;
  let currentPage = 1;
  let _articles = [];

  function getImageUrl(url) {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
      return url;
    }
    if (url.startsWith('../')) {
      return url;
    }
    const base = window.BASE_PATH || '../../../';
    if (url.startsWith('public/')) {
      return base + url;
    }
    if (url.startsWith('images/')) {
      return base + 'public/' + url;
    }
    return base + 'public/images/' + url;
  }

  function renderArticles(page) {
    const start = (page - 1) * ARTICLES_PER_PAGE;
    const end   = page * ARTICLES_PER_PAGE;
    const items = _articles.slice(start, end);

    const container = document.getElementById('articles-container');
    if (!container) return;
    container.innerHTML = '';

    if (items.length === 0) {
      container.innerHTML = '<div class="empty-state" style="text-align: center; grid-column: 1/-1; padding: 40px; color: #888;"><p>Belum ada artikel yang diterbitkan.</p></div>';
      return;
    }

    items.forEach(function (article) {
      const el = document.createElement('div');
      el.classList.add('article');
      
      const rawDate = article.tanggal || '';
      let displayDate = rawDate;
      if (rawDate) {
        try {
          const parts = rawDate.split('-');
          if (parts.length === 3) {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
            const day = parseInt(parts[2]);
            const month = months[parseInt(parts[1]) - 1];
            const year = parts[0];
            displayDate = `${month} ${day}, ${year}`;
          }
        } catch (e) {}
      }

      el.innerHTML = `
        <img src="${getImageUrl(article.gambar_url)}" alt="Artikel Gambar" style="object-fit: cover;">
        <div class="article-info">
          <span class="category">${article.kategori}</span>
          <h3>${article.judul}</h3>
          <p>${article.ringkasan}</p>
          <span class="author">${article.penulis}</span>
          <span class="date">${displayDate}</span>
          <a href="#" class="read-more">Read More</a>
        </div>
      `;
      container.appendChild(el);
    });

    const pageNum = document.getElementById('page-number');
    if (pageNum) pageNum.textContent = currentPage;

    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage * ARTICLES_PER_PAGE >= _articles.length;
  }

  window.changePage = function (direction) {
    if (direction === 'next' && currentPage * ARTICLES_PER_PAGE < _articles.length) {
      currentPage++;
    } else if (direction === 'prev' && currentPage > 1) {
      currentPage--;
    }
    renderArticles(currentPage);
  };

  const apiPath = (window.BASE_PATH || '../../../') + 'api/artikel/get.php';
  fetch(apiPath)
    .then(res => res.json())
    .then(json => {
      if (json.success && json.data) {
        _articles = json.data.filter(a => a.status === 'published');
      }
      renderArticles(currentPage);
    })
    .catch(err => {
      console.error('Gagal mengambil data artikel:', err);
      renderArticles(currentPage);
    });
});

