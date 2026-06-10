/**
 * admin-artikel.controller.js
 * CRUD artikel di halaman admin — terhubung ke api/artikel/
 */

const API_ARTIKEL = '../../../api/artikel/';
let _artikelData = [];

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

function badgeClass(status) {
  return { draft: 'badge-draft', published: 'badge-published' }[status] || 'badge-baru';
}

// ── Helpers Tambahan ─────────────────────────────────────────────────────────

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
  return base + 'public/' + url;
}

// ── Load & Render ────────────────────────────────────────────────────────────

async function loadArtikel() {
  const tbody = document.getElementById('artikel-tbody');
  if (!tbody) return;
  tbody.innerHTML = '<tr><td colspan="8" class="empty-state"><p>Memuat data…</p></td></tr>';

  // Reset check all & bulk delete button
  const checkAll = document.getElementById('check-all');
  if (checkAll) checkAll.checked = false;
  const btn = document.getElementById('btn-hapus-terpilih');
  if (btn) btn.style.display = 'none';

  try {
    const res  = await fetch(API_ARTIKEL + 'get.php');
    const json = await res.json();

    if (!json.success || !json.data.length) {
      tbody.innerHTML = '<tr><td colspan="8" class="empty-state"><p>Belum ada artikel. Klik "+ Tambah Artikel" untuk menambahkan.</p></td></tr>';
      return;
    }

    _artikelData = json.data;
    tbody.innerHTML = json.data.map((a, i) => `
      <tr>
        <td style="text-align: center; vertical-align: middle;">
          <input type="checkbox" class="artikel-checkbox" value="${a.id}" onchange="toggleBulkDeleteButton()">
        </td>
        <td>${i + 1}</td>
        <td>
          <div style="display: flex; align-items: center; gap: 10px;">
            ${a.gambar_url ? `<img src="${getImageUrl(a.gambar_url)}" style="width: 50px; height: 35px; object-fit: cover; border-radius: 4px; border: 1px solid #ddd;">` : `<div style="width: 50px; height: 35px; background: #eee; border-radius: 4px; border: 1px solid #ddd; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #888;">No Img</div>`}
            <div>
              <strong>${esc(a.judul)}</strong>
              <br><small style="color:#aaa;font-size:11px">${esc((a.ringkasan || '').slice(0, 60))}…</small>
            </div>
          </div>
        </td>
        <td>${esc(a.kategori)}</td>
        <td>${esc(a.penulis)}</td>
        <td style="white-space:nowrap">${a.tanggal}</td>
        <td><span class="badge ${badgeClass(a.status)}">${a.status}</span></td>
        <td style="white-space:nowrap">
          <button class="btn btn-sm btn-warning" onclick="editArtikel(${a.id})">✏️ Edit</button>
          <button class="btn btn-sm btn-danger"  onclick="hapusArtikel(${a.id})">🗑️</button>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="8" class="empty-state"><p>⚠️ Gagal memuat data. Pastikan server PHP aktif.</p></td></tr>';
  }
}

// ── Bulk Selection Helpers ───────────────────────────────────────────────────

window.toggleBulkDeleteButton = function() {
  const checked = document.querySelectorAll('.artikel-checkbox:checked');
  const btn = document.getElementById('btn-hapus-terpilih');
  if (btn) {
    btn.style.display = checked.length > 0 ? 'block' : 'none';
  }
  
  const checkboxes = document.querySelectorAll('.artikel-checkbox');
  const checkAll = document.getElementById('check-all');
  if (checkAll && checkboxes.length > 0) {
    checkAll.checked = checkboxes.length === checked.length;
  }
};

async function hapusTerpilih() {
  const checked = document.querySelectorAll('.artikel-checkbox:checked');
  if (checked.length === 0) return;
  
  const ids = Array.from(checked).map(cb => parseInt(cb.value));
  if (!confirm(`Hapus ${ids.length} artikel terpilih?\nTindakan tidak dapat dibatalkan.`)) return;
  
  try {
    const res = await fetch(API_ARTIKEL + 'delete.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids })
    });
    const json = await res.json();
    if (json.success) {
      showAlert(`✅ ${ids.length} artikel berhasil dihapus.`);
      loadArtikel();
    } else {
      showAlert('❌ Gagal menghapus: ' + json.error, 'danger');
    }
  } catch (err) {
    showAlert('❌ Terjadi kesalahan server.', 'danger');
  }
}

// ── Modal ────────────────────────────────────────────────────────────────────

function openModal(data = null) {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('modal-title').textContent = data ? 'Edit Artikel' : 'Tambah Artikel';
  document.getElementById('artikel-id').value    = data?.id        || '';
  document.getElementById('f-judul').value       = data?.judul     || '';
  document.getElementById('f-kategori').value    = data?.kategori  || '';
  document.getElementById('f-ringkasan').value   = data?.ringkasan || '';
  document.getElementById('f-penulis').value     = data?.penulis   || '';
  document.getElementById('f-tanggal').value     = data?.tanggal   || today;
  
  // Reset file input dan set URL
  document.getElementById('f-gambar').value = '';
  document.getElementById('f-gambar_url').value = data?.gambar_url || '';
  
  // Set preview gambar
  const previewContainer = document.getElementById('gambar-preview-container');
  const previewImg = document.getElementById('gambar-preview');
  if (data?.gambar_url && previewContainer && previewImg) {
    previewImg.src = getImageUrl(data.gambar_url);
    previewContainer.style.display = 'block';
  } else {
    if (previewContainer) previewContainer.style.display = 'none';
  }
  
  document.getElementById('f-status').value      = data?.status    || 'draft';
  document.getElementById('modal-backdrop').classList.add('active');
  setTimeout(() => document.getElementById('f-judul').focus(), 100);
}

function closeModal() {
  document.getElementById('modal-backdrop').classList.remove('active');
}

// ── CRUD ─────────────────────────────────────────────────────────────────────

function editArtikel(id) {
  const item = _artikelData.find(a => a.id == id);
  if (item) openModal(item);
}

async function hapusArtikel(id) {
  if (!confirm('Hapus artikel ini?\nTindakan tidak dapat dibatalkan.')) return;
  try {
    const res  = await fetch(API_ARTIKEL + 'delete.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    const json = await res.json();
    if (json.success) {
      showAlert('✅ Artikel berhasil dihapus.');
      loadArtikel();
    } else {
      showAlert('❌ Gagal menghapus: ' + json.error, 'danger');
    }
  } catch {
    showAlert('❌ Terjadi kesalahan server.', 'danger');
  }
}

async function simpanArtikel() {
  const id        = document.getElementById('artikel-id').value;
  const judul     = document.getElementById('f-judul').value.trim();
  const kategori  = document.getElementById('f-kategori').value.trim();
  const ringkasan = document.getElementById('f-ringkasan').value.trim();
  const penulis   = document.getElementById('f-penulis').value.trim();
  const tanggal   = document.getElementById('f-tanggal').value;
  const status    = document.getElementById('f-status').value;
  const gambarUrl = document.getElementById('f-gambar_url').value.trim();
  const gambarFile = document.getElementById('f-gambar').files[0];

  if (!judul || !kategori || !ringkasan || !penulis || !tanggal) {
    showAlert('⚠️ Harap isi semua kolom yang bertanda (*).', 'danger');
    return;
  }

  const formData = new FormData();
  if (id) formData.append('id', id);
  formData.append('judul', judul);
  formData.append('kategori', kategori);
  formData.append('ringkasan', ringkasan);
  formData.append('isi', '');
  formData.append('penulis', penulis);
  formData.append('tanggal', tanggal);
  formData.append('status', status);
  formData.append('gambar_url', gambarUrl);
  
  if (gambarFile) {
    formData.append('gambar', gambarFile);
  }

  const endpoint = id ? 'update.php' : 'create.php';
  try {
    const res  = await fetch(API_ARTIKEL + endpoint, {
      method: 'POST',
      body: formData
    });
    const json = await res.json();
    if (json.success) {
      showAlert(id ? '✅ Artikel berhasil diperbarui.' : '✅ Artikel berhasil ditambahkan.');
      closeModal();
      loadArtikel();
    } else {
      showAlert('❌ Gagal menyimpan: ' + (json.error || 'Error tidak diketahui'), 'danger');
    }
  } catch (err) {
    showAlert('❌ Terjadi kesalahan server.', 'danger');
  }
}

// ── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
  loadArtikel();

  document.getElementById('btn-tambah')?.addEventListener('click', () => openModal());
  document.getElementById('btn-simpan')?.addEventListener('click', simpanArtikel);
  document.getElementById('btn-batal')?.addEventListener('click', closeModal);
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document.getElementById('modal-backdrop')?.addEventListener('click', function (e) {
    if (e.target === this) closeModal();
  });
  
  // Check all listener
  document.getElementById('check-all')?.addEventListener('change', function () {
    const isChecked = this.checked;
    document.querySelectorAll('.artikel-checkbox').forEach(cb => {
      cb.checked = isChecked;
    });
    toggleBulkDeleteButton();
  });
  
  // Hapus terpilih listener
  document.getElementById('btn-hapus-terpilih')?.addEventListener('click', hapusTerpilih);
});

