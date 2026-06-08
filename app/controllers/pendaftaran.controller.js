/**
 * controllers/pendaftaran.controller.js
 * Logika halaman Pendaftaran:
 *  - Validasi form sisi klien (opsional/extendable)
 *  - Deteksi halaman mana yang aktif (siswa / orang-tua / guru)
 */

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form.pendaftaran-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let valid = true;

    inputs.forEach(function (input) {
      if (!input.value.trim()) {
        input.classList.add('input-error');
        valid = false;
      } else {
        input.classList.remove('input-error');
      }
    });

    if (valid) {
      // Kirim ke backend, atau tampilkan pesan sukses
      alert('Pendaftaran berhasil dikirim! Kami akan menghubungi Anda segera.');
      form.reset();
    } else {
      alert('Harap lengkapi semua kolom yang wajib diisi.');
    }
  });
});
