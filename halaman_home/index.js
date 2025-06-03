/*bagian banner*/
window.onscroll = function() {
  var header = document.getElementById("header");
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
};




/*bagian artikel*/
fetch('get_articles.php')
  .then(response => response.json())
  .then(data => {
    const articlesContainer = document.querySelector('.articles-container');
    articlesContainer.innerHTML = '';  // Clear existing articles

    data.forEach(article => {
      const articleElement = document.createElement('a');
      articleElement.classList.add('article');
      articleElement.href = '#';
      
      articleElement.innerHTML = `
        <img src="${article.image_url}" alt="Artikel Gambar">
        <div class="article-info">
          <span class="category">${article.category}</span>
          <h3>${article.title}</h3>
          <p>${article.description}</p>
          <span class="author">${article.author}</span>
          <span class="date">${article.date}</span>
        </div>
      `;
      
      articlesContainer.appendChild(articleElement);
    });
  })
  .catch(error => console.error('Error:', error));

fetch('get_statistics.php')
  .then(response => response.json())
  .then(data => {
    data.forEach(stat => {
      const statCard = document.createElement('div');
      statCard.classList.add('stat-card');
      statCard.innerHTML = `
        <h2 class="stat-number">${stat.stat_value}</h2>
        <h3 class="stat-title">${stat.stat_name}</h3>
        <p class="stat-desc">${stat.description}</p>
      `;
      document.querySelector('.stats-grid-modern').appendChild(statCard);
    });
  })
  .catch(error => console.error('Error:', error));




/*bagian menu sosial media*/
const menu = document.querySelector('.menu_sosial'); // Menu sosial media
const threshold = 0.95; // Persentase (95%) untuk menentukan kapan menu disembunyikan

// Deteksi saat halaman di-scroll
window.addEventListener('scroll', function() {
  const documentHeight = document.documentElement.scrollHeight; // Tinggi keseluruhan dokumen
  const windowHeight = window.innerHeight; // Tinggi jendela browser
  const scrollPosition = window.scrollY; // Posisi scroll saat ini

  // Cek jika posisi scroll sudah mencapai 95% dari tinggi halaman
  if (scrollPosition >= documentHeight * threshold - windowHeight) {
    // Menyembunyikan menu ketika scroll sudah mencapai 95% dari halaman
    menu.classList.add('hidden');
  } else {
    // Menampilkan kembali menu jika scroll belum mencapai 95%
    menu.classList.remove('hidden');
  }
});



