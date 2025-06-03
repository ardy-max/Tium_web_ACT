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
const navButtonContainer = document.querySelector('.navbutton');

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

let currentIndex = 0;

// Fungsi tampilkan gambar besar & tombol navigasi + overlay
function showImage(index) {
  currentIndex = index;
  largeImage.src = images[currentIndex];
  mainImageContainer.style.display = 'flex';
  overlay.style.display = 'block';
  navButtonContainer.style.display = 'block';
}

// Fungsi sembunyikan semuanya
function hideImage() {
  mainImageContainer.style.display = 'none';
  overlay.style.display = 'none';
  navButtonContainer.style.display = 'none';
}

// Event klik thumbnail
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    showImage(index);
  });
});

// Tombol close
closeButton.addEventListener('click', hideImage);

// Klik overlay tutup
overlay.addEventListener('click', hideImage);

// Tombol panah kiri
document.getElementById('prev-btn').addEventListener('click', () => {
  currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
  largeImage.src = images[currentIndex];
});

// Tombol panah kanan
document.getElementById('next-btn').addEventListener('click', () => {
  currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
  largeImage.src = images[currentIndex];
});
