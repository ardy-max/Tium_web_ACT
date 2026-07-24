/**
 * controllers/galeri.controller.js
 * Logika khusus halaman Galeri:
 *  - Render thumbnail dari database
 *  - Lightbox (buka gambar besar, navigasi kiri/kanan, tutup)
 */

document.addEventListener('DOMContentLoaded', function () {

  let currentIndex = 0;
  let _galleryItems = [];

  const largeImage         = document.getElementById('large-image');
  const mainImageContainer = document.querySelector('.main-image');
  const overlay            = document.querySelector('.image-overlay');
  const navButtonContainer = document.querySelector('.navbutton');
  const closeButton        = document.querySelector('.close-btn');
  const thumbnailGallery   = document.querySelector('.thumbnail-gallery');

  function getImageUrl(url) {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
      return url;
    }
    if (url.startsWith('../')) {
      return url;
    }
    const base = window.BASE_PATH || '../../../';
    if (url.startsWith('public/')) {
      return base + url;
    }
    if (url.startsWith('images/')) {
      return base + 'public/' + url;
    }
    return base + 'public/images/' + url;
  }

  // ── Render Thumbnail ──────────────────────────────────────────────
  function renderThumbnails() {
    if (thumbnailGallery) {
      thumbnailGallery.innerHTML = '';
      _galleryItems.forEach(function (photo, index) {
        const img = document.createElement('img');
        img.src           = getImageUrl(photo.path_foto);
        img.alt           = photo.keterangan || photo.alt || 'Foto Galeri';
        img.classList.add('thumbnail');
        img.dataset.index = index;
        img.addEventListener('click', function () { showImage(index); });
        thumbnailGallery.appendChild(img);
      });
    }
  }

  // ── Lightbox Functions ────────────────────────────────────────────
  function showImage(index) {
    if (_galleryItems.length === 0) return;
    currentIndex = index;
    if (largeImage)         largeImage.src                   = getImageUrl(_galleryItems[currentIndex].path_foto);
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
      if (_galleryItems.length === 0) return;
      currentIndex = (currentIndex === 0) ? _galleryItems.length - 1 : currentIndex - 1;
      if (largeImage) largeImage.src = getImageUrl(_galleryItems[currentIndex].path_foto);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      if (_galleryItems.length === 0) return;
      currentIndex = (currentIndex === _galleryItems.length - 1) ? 0 : currentIndex + 1;
      if (largeImage) largeImage.src = getImageUrl(_galleryItems[currentIndex].path_foto);
    });
  }

  // Fetch dari database
  const apiPath = (window.BASE_PATH || '../../../') + 'api/galeri/get.php';
  fetch(apiPath)
    .then(res => res.json())
    .then(json => {
      if (json.success && json.data) {
        _galleryItems = json.data;
      }
      renderThumbnails();
    })
    .catch(err => {
      console.error('Gagal mengambil data galeri:', err);
      renderThumbnails();
    });
});

