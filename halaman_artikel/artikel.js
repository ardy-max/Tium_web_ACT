/*bagian banner*/
window.onscroll = function() {
  var header = document.getElementById("header");
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
};


// Data artikel (untuk testing, nanti ganti dengan data dinamis dari API atau file JSON)
const articles = [
  { title: "6 Tips To Protect Your Mental Health When You’re Sick", category: "Mental Health", summary: "It’s normal to feel anxiety, worry, and grief...", author: "Martin King", date: "Jan 30, 2022", image: "../images/ACT banner.jpg" },
  { title: "Unsure About Wearing A Face Mask? Here’s How And Why", category: "Infectious Tips", summary: "That means you should still be following shelter-in-place orders...", author: "John Erak", date: "Jan 30, 2022", image: "../images/ACT banner.jpg" },
  { title: "Tips For Eating Healthy When You’re Working From Home", category: "Life Style, Nutrition", summary: "It’s normal to feel anxiety, worry, and grief...", author: "Saul Wade", date: "Jan 28, 2022", image: "../images/ACT banner.jpg" },
  { title: "Maintaining Your Health During the Pandemic", category: "Health Tips", summary: "The pandemic brings new challenges for our physical and mental health...", author: "Sarah Blue", date: "Jan 25, 2022", image: "../images/ACT banner.jpg" },
  { title: "How to Stay Productive While Working Remotely", category: "Productivity", summary: "Working from home can be a challenge for some, here’s how to stay on track...", author: "Lucas Green", date: "Feb 1, 2022", image: "../images/ACT banner.jpg" },
  { title: "Understanding the Importance of Vaccination", category: "Health", summary: "Vaccines are essential in preventing the spread of disease...", author: "Emma Lee", date: "Feb 3, 2022", image: "../images/ACT banner.jpg" },
  { title: "The Power of Positive Thinking", category: "Mental Health", summary: "Positive thinking can transform your life in ways you never imagined...", author: "Sarah Moon", date: "Feb 10, 2022", image: "../images/ACT banner.jpg" },
  { title: "Steps to Improve Your Financial Health", category: "Finance", summary: "Managing your finances effectively requires planning and discipline...", author: "George Parker", date: "Feb 5, 2022", image: "../images/ACT banner.jpg" },
  { title: "How to Build a Strong Immune System", category: "Health", summary: "A strong immune system is essential for overall health and well-being...", author: "Julia Green", date: "Jan 20, 2022", image: "../images/ACT banner.jpg" },
  { title: "Tips for Time Management", category: "Productivity", summary: "Time management is key to success, here's how to do it right...", author: "Mark Johnson", date: "Jan 18, 2022", image: "../images/ACT banner.jpg" },
  { title: "Staying Fit at Home", category: "Fitness", summary: "You don’t need a gym to stay fit, here are some great exercises you can do at home...", author: "Rachel White", date: "Jan 22, 2022", image: "../images/ACT banner.jpg" },
  { title: "Staying Fit at Home", category: "Fitness", summary: "You don’t need a gym to stay fit, here are some great exercises you can do at home...", author: "Rachel White", date: "Jan 22, 2022", image: "../images/ACT banner.jpg" },
  { title: "Staying Fit at Home", category: "Fitness", summary: "You don’t need a gym to stay fit, here are some great exercises you can do at home...", author: "Rachel White", date: "Jan 22, 2022", image: "../images/ACT banner.jpg" },
  { title: "Staying Fit at Home", category: "Fitness", summary: "You don’t need a gym to stay fit, here are some great exercises you can do at home...", author: "Rachel White", date: "Jan 22, 2022", image: "../images/ACT banner.jpg" },
  { title: "Staying Fit at Home", category: "Fitness", summary: "You don’t need a gym to stay fit, here are some great exercises you can do at home...", author: "Rachel White", date: "Jan 22, 2022", image: "../images/ACT banner.jpg" },
  { title: "Staying Fit at Home", category: "Fitness", summary: "You don’t need a gym to stay fit, here are some great exercises you can do at home...", author: "Rachel White", date: "Jan 22, 2022", image: "../images/ACT banner.jpg" },
  { title: "Benefits of Meditation", category: "Mental Health", summary: "Meditation can reduce stress, improve focus, and enhance overall well-being...", author: "David Brown", date: "Jan 15, 2022", image: "../images/ACT banner.jpg" }
];

let currentPage = 1;
const articlesPerPage = 6; // Menampilkan 6 artikel per halaman

// Fungsi untuk menampilkan artikel
function displayArticles(page) {
  const start = (page - 1) * articlesPerPage;
  const end = page * articlesPerPage;
  const articlesToDisplay = articles.slice(start, end);

  const container = document.getElementById('articles-container');
  container.innerHTML = ''; // Clear sebelumnya

  articlesToDisplay.forEach((article, index) => {
    const articleElement = document.createElement('div');
    articleElement.classList.add('article');
    articleElement.innerHTML = `
      <img src="${article.image}" alt="Artikel Gambar">
      <div class="article-info">
        <span class="category">${article.category}</span>
        <h3>${article.title}</h3>
        <p>${article.summary}</p>
        <span class="author">${article.author}</span>
        <span class="date">${article.date}</span>
        <a href="artikel-detail.html?id=${index}" class="read-more">Read More</a>
      </div>
    `;
    container.appendChild(articleElement);
  });

  // Update halaman saat ini
  document.getElementById('page-number').textContent = currentPage;

  // Menyembunyikan tombol Previous jika sudah di halaman pertama
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  
  if (currentPage === 1) {
    prevButton.setAttribute('disabled', 'true');  // Menonaktifkan tombol Prev di halaman pertama
  } else {
    prevButton.removeAttribute('disabled');  // Mengaktifkan tombol Prev jika tidak di halaman pertama
  }

  // Menyembunyikan tombol Next jika sudah di halaman terakhir
  if (currentPage * articlesPerPage >= articles.length) {
    nextButton.setAttribute('disabled', 'true');  // Menonaktifkan tombol Next di halaman terakhir
  } else {
    nextButton.removeAttribute('disabled');  // Mengaktifkan tombol Next jika tidak di halaman terakhir
  }
}

// Fungsi untuk mengubah halaman
function changePage(direction) {
  if (direction === 'next' && currentPage * articlesPerPage < articles.length) {
    currentPage++;
  } else if (direction === 'prev' && currentPage > 1) {
    currentPage--;
  }
  displayArticles(currentPage);
}

// Menampilkan artikel pertama kali
displayArticles(currentPage);


