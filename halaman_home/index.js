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
let currentIndex = 0;

function showSlide(index) {
  const slides = document.querySelectorAll('.article');
  const carouselWrapper = document.querySelector('.articles-container');
  const totalSlides = slides.length;

  // Cek apakah kita sudah mencapai batas
  if (index >= totalSlides - 2) { // Hanya menampilkan 3 artikel
    currentIndex = totalSlides - 3;
  } else if (index < 0) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }

  // Geser artikel dengan transformasi
  carouselWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;  
}

function moveSlide(step) {
  showSlide(currentIndex + step);
}

document.addEventListener('DOMContentLoaded', () => {
  showSlide(currentIndex);
});




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



