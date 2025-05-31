/*bagian banner*/
window.onscroll = function() {
  var header = document.getElementById("header");
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
};


//bagian galeri

// Mendapatkan elemen-elemen gambar dan tombol
const thumbnails = document.querySelectorAll('.thumbnail');
const largeImage = document.getElementById('large-image');
let currentIndex = 0;
const images = [
  "images/facebook logo.png", 
  "images/email logo.png"
];

// Menampilkan gambar pertama
largeImage.src = images[currentIndex];

// Menambahkan event listener untuk gambar thumbnail
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    currentIndex = index % images.length;
    largeImage.src = images[currentIndex];
  });
});

// Tombol Panah Kiri
document.getElementById('prev-btn').addEventListener('click', () => {
  currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
  largeImage.src = images[currentIndex];
});

// Tombol Panah Kanan
document.getElementById('next-btn').addEventListener('click', () => {
  currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
  largeImage.src = images[currentIndex];
});
