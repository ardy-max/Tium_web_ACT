/**
 * admin-galeri.controller.js
 * CRUD galeri di halaman admin — terhubung ke api/galeri/
 */

const API_GALERI = '../../../api/galeri/';
let _galeriData = [];

// ── Helpers ─────────────────────────────────────────────────────────────────

function showAlert(message, type = 'success') {
  const el = document.getElementById('alert-container');
  if (!el) return;
  el.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
  setTimeout(() => { el.innerHTML = ''; }, 3500);
}

function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getImageUrl(url) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  if (url.startsWith('../')) {
    return url;
  }
  const base = '../../../'; // Base path relative to admin view
  if (url.startsWith('public/')) {
    return base + url;
  }
  if (url.startsWith('images/')) {
    return base + 'public/' + url;
  }
  // If stored as "galery_images/galeri_x.jpg" or "tesfoto/foto1.jpg"
  return base + 'public/images/' + url;
}

// ── Load & Render ────────────────────────────────────────────────────────────

async function loadGaleri() {
  const tbody = document.getElementById('galeri-tbody');
  if (!tbody) return;
  tbody.innerHTML = '<tr><td colspan="7" class="empty-state"><p>Memuat data…</p></td></tr>';

  // Reset check all & bulk delete button
  const checkAll = document.getElementById('check-all');
  if (checkAll) checkAll.checked = false;
  const btn = document.getElementById('btn-hapus-terpilih');
  if (btn) btn.style.display = 'none';

  try {
    const res  = await fetch(API_GALERI + 'get.php');
    const json = await res.json();

    if (!json.success || !json.data.length) {
      tbody.innerHTML = '<tr><td colspan="7" class="empty-state"><p>Belum ada foto galeri. Klik "+ Tambah Foto" untuk menambahkan.</p></td></tr>';
      return;
    }

    _galeriData = json.data;
    tbody.innerHTML = json.data.map((g, i) => `
      <tr>
        <td style="text-align: center; vertical-align: middle;">
          <input type="checkbox" class="galeri-checkbox" value="${g.id}" onchange="toggleBulkDeleteButton()">
        </td>
        <td>${i + 1}</td>
        <td>
          <img src="${getImageUrl(g.path_foto)}" style="max-width: 80px; max-height: 60px; object-fit: cover; border-radius: 4px; border: 1px solid #ddd; display: block;">
        </td>
        <td><code>${esc(g.nama_file)}</code></td>
        <td><strong>${esc(g.keterangan)}</strong></td>
        <td>${g.urutan}</td>
        <td style="white-space:nowrap">
          <button class="btn btn-sm btn-warning" onclick="editGaleri(${g.id})">✏️ Edit</button>
          <button class="btn btn-sm btn-danger"  onclick="hapusGaleri(${g.id})">🗑️</button>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="7" class="empty-state"><p>⚠️ Gagal memuat data. Pastikan server PHP aktif.</p></td></tr>';
  }
}

// ── Bulk Selection Helpers ───────────────────────────────────────────────────

window.toggleBulkDeleteButton = function() {
  const checked = document.querySelectorAll('.galeri-checkbox:checked');
  const btn = document.getElementById('btn-hapus-terpilih');
  if (btn) {
    btn.style.display = checked.length > 0 ? 'block' : 'none';
  }
  
  const checkboxes = document.querySelectorAll('.galeri-checkbox');
  const checkAll = document.getElementById('check-all');
  if (checkAll && checkboxes.length > 0) {
    checkAll.checked = checkboxes.length === checked.length;
  }
};

async function hapusTerpilih() {
  const checked = document.querySelectorAll('.galeri-checkbox:checked');
  if (checked.length === 0) return;
  
  const ids = Array.from(checked).map(cb => parseInt(cb.value));
  if (!confirm(`Hapus ${ids.length} foto terpilih?\nTindakan tidak dapat dibatalkan.`)) return;
  
  try {
    const res = await fetch(API_GALERI + 'delete.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids })
    });
    const json = await res.json();
    if (json.success) {
      showAlert(`✅ ${ids.length} foto galeri berhasil dihapus.`);
      loadGaleri();
    } else {
      showAlert('❌ Gagal menghapus: ' + json.error, 'danger');
    }
  } catch (err) {
    showAlert('❌ Terjadi kesalahan server.', 'danger');
  }
}

// ── Modal ────────────────────────────────────────────────────────────────────

function openModal(data = null) {
  document.getElementById('modal-title').textContent = data ? 'Edit Foto Galeri' : 'Tambah Foto Galeri';
  document.getElementById('galeri-id').value       = data?.id          || '';
  document.getElementById('f-keterangan').value     = data?.keterangan  || '';
  document.getElementById('f-urutan').value         = data?.urutan      || '0';
  document.getElementById('f-path_foto').value      = data?.path_foto   || '';
  document.getElementById('f-nama_file').value      = data?.nama_file   || '';
  
  // Reset file input
  document.getElementById('f-foto').value = '';
  
  // Image preview
  const previewContainer = document.getElementById('foto-preview-container');
  const previewImg = document.getElementById('foto-preview');
  if (data?.path_foto && previewContainer && previewImg) {
    previewImg.src = getImageUrl(data.path_foto);
    previewContainer.style.display = 'block';
  } else {
    if (previewContainer) previewContainer.style.display = 'none';
  }
  
  document.getElementById('modal-backdrop').classList.add('active');
  setTimeout(() => document.getElementById('f-keterangan').focus(), 100);
}

function closeModal() {
  document.getElementById('modal-backdrop').classList.remove('active');
}

// ── CRUD ─────────────────────────────────────────────────────────────────────

window.editGaleri = function(id) {
  const item = _galeriData.find(g => g.id == id);
  if (item) openModal(item);
};

window.hapusGaleri = async function(id) {
  if (!confirm('Hapus foto ini dari galeri?\nTindakan tidak dapat dibatalkan.')) return;
  try {
    const res  = await fetch(API_GALERI + 'delete.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    const json = await res.json();
    if (json.success) {
      showAlert('✅ Foto berhasil dihapus dari galeri.');
      loadGaleri();
    } else {
      showAlert('❌ Gagal menghapus: ' + json.error, 'danger');
    }
  } catch {
    showAlert('❌ Terjadi kesalahan server.', 'danger');
  }
};

async function simpanGaleri() {
  const id         = document.getElementById('galeri-id').value;
  const keterangan = document.getElementById('f-keterangan').value.trim();
  const urutan     = document.getElementById('f-urutan').value;
  const pathFoto   = document.getElementById('f-path_foto').value;
  const namaFile   = document.getElementById('f-nama_file').value;
  const fotoFile   = document.getElementById('f-foto').files[0];

  if (!keterangan) {
    showAlert('⚠️ Harap isi keterangan/caption.', 'danger');
    return;
  }
  
  if (!id && !fotoFile) {
    showAlert('⚠️ Harap pilih file foto yang ingin diunggah.', 'danger');
    return;
  }

  const formData = new FormData();
  if (id) formData.append('id', id);
  formData.append('keterangan', keterangan);
  formData.append('urutan', urutan);
  formData.append('path_foto', pathFoto);
  formData.append('nama_file', namaFile);
  
  if (fotoFile) {
    formData.append('foto', fotoFile);
  }

  const endpoint = id ? 'update.php' : 'create.php';
  try {
    const res  = await fetch(API_GALERI + endpoint, {
      method: 'POST',
      body: formData
    });
    const json = await res.json();
    if (json.success) {
      showAlert(id ? '✅ Foto berhasil diperbarui.' : '✅ Foto berhasil ditambahkan ke galeri.');
      closeModal();
      loadGaleri();
    } else {
      showAlert('❌ Gagal menyimpan: ' + (json.error || 'Error tidak diketahui'), 'danger');
    }
  } catch (err) {
    showAlert('❌ Terjadi kesalahan server.', 'danger');
  }
}

// ── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
  loadGaleri();

  document.getElementById('btn-tambah')?.addEventListener('click', () => openModal());
  document.getElementById('btn-simpan')?.addEventListener('click', simpanGaleri);
  document.getElementById('btn-batal')?.addEventListener('click', closeModal);
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document.getElementById('modal-backdrop')?.addEventListener('click', function (e) {
    if (e.target === this) closeModal();
  });
  
  // Check all listener
  document.getElementById('check-all')?.addEventListener('change', function () {
    const isChecked = this.checked;
    document.querySelectorAll('.galeri-checkbox').forEach(cb => {
      cb.checked = isChecked;
    });
    toggleBulkDeleteButton();
  });
  
  // Hapus terpilih listener
  document.getElementById('btn-hapus-terpilih')?.addEventListener('click', hapusTerpilih);
});
