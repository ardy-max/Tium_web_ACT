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

const thumbnails = document.querySelectorAll('.thumbnail');
const largeImage = document.getElementById('large-image');
const mainImageContainer = document.querySelector('.main-image');
const overlay = document.querySelector('.image-overlay');
const closeButton = document.querySelector('.close-btn');
let currentIndex = 0;
const images = [
  "tesfoto/foto1.jpg",
  "tesfoto/foto2.jpg",
  "tesfoto/foto3.jpg",
  "tesfoto/foto4.jpg",
  "tesfoto/foto5.jpg",
  "tesfoto/Lfoto1.jpg",
  "tesfoto/foto5.jpg",
  "tesfoto/Lfoto2.jpg",
  "tesfoto/Lfoto3.jpg",
  "tesfoto/Lfoto4.jpg",
  "tesfoto/Lfoto5.jpg"
];

// Menampilkan gambar pertama saat halaman dimuat
largeImage.src = images[currentIndex];

// Menambahkan event listener untuk gambar thumbnail
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    currentIndex = index;
    largeImage.src = images[currentIndex];
    mainImageContainer.style.display = 'block'; // Menampilkan gambar utama
    overlay.style.display = 'block'; // Menampilkan overlay hitam
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

// Menutup gambar utama dan overlay saat mengklik overlay
overlay.addEventListener('click', () => {
  mainImageContainer.style.display = 'none'; // Menyembunyikan gambar utama
  overlay.style.display = 'none'; // Menyembunyikan overlay
});

// Menutup gambar utama dan overlay saat tombol X diklik
closeButton.addEventListener('click', () => {
  mainImageContainer.style.display = 'none'; // Menyembunyikan gambar utama
  overlay.style.display = 'none'; // Menyembunyikan overlay
});
