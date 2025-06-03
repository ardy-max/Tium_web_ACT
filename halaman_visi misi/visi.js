/*bagian banner*/
window.onscroll = function() {
  var header = document.getElementById("header");
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
};

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
