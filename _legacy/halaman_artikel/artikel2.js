/*bagian banner*/
window.onscroll = function() {
  var header = document.getElementById("header");
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
};






// artikel-detail.js

// Mendapatkan ID artikel dari URL
const params = new URLSearchParams(window.location.search);
const articleId = params.get('id');  // Mengambil parameter ID dari URL

// Artikel data (gunakan data dinamis di backend jika tersedia)
const articles = [
  {
    title: "6 Tips To Protect Your Mental Health When You’re Sick",
    author: "Martin King",
    date: "Jan 30, 2022",
    content: "Content of the article goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Nulla vitae massa. Fusce ac turpis quis ligula lacinia aliquet.",
    image: "images/ACT banner.jpg"
  },
  {
    title: "Another Article Title",
    author: "Jane Doe",
    date: "Feb 10, 2022",
    content: "This is another article's content. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.",
    image: "images/ACT banner.jpg"
  },
  // Add other articles...
];

// Menampilkan artikel berdasarkan ID
const article = articles[articleId];

if (article) {
  document.getElementById('article-title').innerText = article.title;
  document.getElementById('article-author').innerText = `Penulis: ${article.author}`;
  document.getElementById('article-date').innerText = `Tanggal: ${article.date}`;
  document.getElementById('article-content').innerText = article.content;
}
