document.addEventListener('DOMContentLoaded', () => {
    loadUsers();

    const btnAdd = document.getElementById('btn-add-user');
    if (btnAdd) {
        btnAdd.addEventListener('click', () => openModal());
    }

    const userForm = document.getElementById('user-form');
    if (userForm) {
        userForm.addEventListener('submit', handleFormSubmit);
    }
});

let usersList = [];

async function loadUsers() {
    try {
        const response = await fetch('../../../api/users/read.php');
        const data = await response.json();
        
        if (data.success) {
            usersList = data.data;
            renderUsers();
        } else {
            alert('Gagal mengambil data user: ' + data.message);
        }
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

function renderUsers() {
    const tbody = document.getElementById('users-tbody');
    tbody.innerHTML = '';

    usersList.forEach(user => {
        const tr = document.createElement('tr');
        
        // Cek apakah user ini adalah user yang sedang login
        const isMe = parseInt(user.id) === currentUserId;
        const nameDisplay = isMe ? `${user.nama} <span class="badge-you">You</span>` : user.nama;

        let actions = '';
        if (!isMe) {
            actions = `
                <button class="btn-edit" onclick="openModal(${user.id})">Edit</button>
                <button class="btn-delete" onclick="deleteUser(${user.id})">Hapus</button>
            `;
        } else {
            actions = `<em>Tidak dapat mengedit diri sendiri</em>`;
        }

        tr.innerHTML = `
            <td>${nameDisplay}</td>
            <td>${user.username}</td>
            <td>${user.role}</td>
            <td>${new Date(user.created_at).toLocaleDateString('id-ID')}</td>
            <td>${actions}</td>
        `;
        tbody.appendChild(tr);
    });
}

function openModal(id = null) {
    const modal = document.getElementById('user-modal');
    const title = document.getElementById('modal-title');
    const form = document.getElementById('user-form');
    const groupUsername = document.getElementById('group-username');
    const groupPassword = document.getElementById('group-password');
    const inputId = document.getElementById('user-id');
    const inputNama = document.getElementById('user-nama');
    const inputUsername = document.getElementById('user-username');
    const inputPassword = document.getElementById('user-password');
    const inputRole = document.getElementById('user-role');

    form.reset();

    if (id) {
        // Edit mode
        title.textContent = 'Edit User';
        const user = usersList.find(u => parseInt(u.id) === id);
        
        inputId.value = user.id;
        inputNama.value = user.nama;
        inputRole.value = user.role;
        
        // Hide username & password when editing
        groupUsername.style.display = 'none';
        inputUsername.removeAttribute('required');
        
        groupPassword.style.display = 'none';
        inputPassword.removeAttribute('required');
    } else {
        // Add mode
        title.textContent = 'Tambah User';
        inputId.value = '';
        
        groupUsername.style.display = 'block';
        inputUsername.setAttribute('required', 'true');
        
        groupPassword.style.display = 'block';
        inputPassword.setAttribute('required', 'true');
    }

    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('user-modal').style.display = 'none';
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const id = document.getElementById('user-id').value;
    const isEdit = id !== '';
    
    const endpoint = isEdit ? '../../../api/users/update.php' : '../../../api/users/create.php';
    
    const payload = {
        nama: document.getElementById('user-nama').value,
        role: document.getElementById('user-role').value
    };

    if (!isEdit) {
        payload.username = document.getElementById('user-username').value;
        payload.password = document.getElementById('user-password').value;
    } else {
        payload.id = id;
    }

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert(data.message);
            closeModal();
            loadUsers();
        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        console.error('Submit error:', error);
        alert('Terjadi kesalahan sistem.');
    }
}

async function deleteUser(id) {
    if (!confirm('Yakin ingin menghapus user ini?')) return;

    try {
        const response = await fetch('../../../api/users/delete.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert(data.message);
            loadUsers();
        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        console.error('Delete error:', error);
        alert('Terjadi kesalahan sistem.');
    }
}
