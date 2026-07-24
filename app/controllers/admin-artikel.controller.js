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

// ── Load & Render ────────────────────────────────────────────────────────────

async function loadArtikel() {
  const tbody = document.getElementById('artikel-tbody');
  if (!tbody) return;
  tbody.innerHTML = '<tr><td colspan="7" class="empty-state"><p>Memuat data…</p></td></tr>';

  try {
    const res  = await fetch(API_ARTIKEL + 'get.php');
    const json = await res.json();

    if (!json.success || !json.data.length) {
      tbody.innerHTML = '<tr><td colspan="7" class="empty-state"><p>Belum ada artikel. Klik "+ Tambah Artikel" untuk menambahkan.</p></td></tr>';
      return;
    }

    _artikelData = json.data;
    tbody.innerHTML = json.data.map((a, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>
          <strong>${esc(a.judul)}</strong>
          <br><small style="color:#aaa;font-size:11px">${esc((a.ringkasan || '').slice(0, 60))}…</small>
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
    tbody.innerHTML = '<tr><td colspan="7" class="empty-state"><p>⚠️ Gagal memuat data. Pastikan server PHP aktif.</p></td></tr>';
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
  document.getElementById('f-gambar_url').value  = data?.gambar_url || '';
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
  const id      = document.getElementById('artikel-id').value;
  const payload = {
    id:         id || null,
    judul:      document.getElementById('f-judul').value.trim(),
    kategori:   document.getElementById('f-kategori').value.trim(),
    ringkasan:  document.getElementById('f-ringkasan').value.trim(),
    isi:        '',
    gambar_url: document.getElementById('f-gambar_url').value.trim(),
    penulis:    document.getElementById('f-penulis').value.trim(),
    tanggal:    document.getElementById('f-tanggal').value,
    status:     document.getElementById('f-status').value,
  };

  if (!payload.judul || !payload.kategori || !payload.ringkasan || !payload.penulis || !payload.tanggal) {
    showAlert('⚠️ Harap isi semua kolom yang bertanda (*).', 'danger');
    return;
  }

  const endpoint = id ? 'update.php' : 'create.php';
  try {
    const res  = await fetch(API_ARTIKEL + endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (json.success) {
      showAlert(id ? '✅ Artikel berhasil diperbarui.' : '✅ Artikel berhasil ditambahkan.');
      closeModal();
      loadArtikel();
    } else {
      showAlert('❌ Gagal menyimpan: ' + (json.error || 'Error tidak diketahui'), 'danger');
    }
  } catch {
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
});
