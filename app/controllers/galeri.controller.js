/**
 * controllers/galeri.controller.js
 * Logika khusus halaman Galeri:
 *  - Render thumbnail dari GalleryData
 *  - Lightbox (buka gambar besar, navigasi kiri/kanan, tutup)
 * Dependensi: src/data/gallery.js
 */

document.addEventListener('DOMContentLoaded', function () {

  if (typeof GalleryData === 'undefined') return;

  let currentIndex = 0;

  const largeImage         = document.getElementById('large-image');
  const mainImageContainer = document.querySelector('.main-image');
  const overlay            = document.querySelector('.image-overlay');
  const navButtonContainer = document.querySelector('.navbutton');
  const closeButton        = document.querySelector('.close-btn');
  const thumbnailGallery   = document.querySelector('.thumbnail-gallery');

  // ── Render Thumbnail ──────────────────────────────────────────────
  if (thumbnailGallery) {
    thumbnailGallery.innerHTML = '';
    GalleryData.forEach(function (photo, index) {
      const img = document.createElement('img');
      img.src           = photo.src;
      img.alt           = photo.alt;
      img.classList.add('thumbnail');
      img.dataset.index = index;
      img.addEventListener('click', function () { showImage(index); });
      thumbnailGallery.appendChild(img);
    });
  }

  // ── Lightbox Functions ────────────────────────────────────────────
  function showImage(index) {
    currentIndex = index;
    if (largeImage)         largeImage.src                   = GalleryData[currentIndex].src;
    if (mainImageContainer) mainImageContainer.style.display = 'flex';
    if (overlay)            overlay.style.display            = 'block';
    if (navButtonContainer) navButtonContainer.style.display = 'block';
  }

  function hideImage() {
    if (mainImageContainer) mainImageContainer.style.display = 'none';
    if (overlay)            overlay.style.display            = 'none';
    if (navButtonContainer) navButtonContainer.style.display = 'none';
  }

  if (closeButton) closeButton.addEventListener('click', hideImage);
  if (overlay)     overlay.addEventListener('click', hideImage);

  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      currentIndex = (currentIndex === 0) ? GalleryData.length - 1 : currentIndex - 1;
      if (largeImage) largeImage.src = GalleryData[currentIndex].src;
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      currentIndex = (currentIndex === GalleryData.length - 1) ? 0 : currentIndex + 1;
      if (largeImage) largeImage.src = GalleryData[currentIndex].src;
    });
  }

});
