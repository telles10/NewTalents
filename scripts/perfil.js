document.addEventListener('DOMContentLoaded', function() {
    // Simulated user data
    const userData = {
        name: 'João Silva',
        username: 'joaosilva',
        email: 'joao.silva@exemplo.com',
        phone: '(11) 99999-9999',
        location: 'São Paulo, SP',
        avatar: './assets/avatar-default.jpg',
        courses: [
            {
                id: 1,
                name: 'Desenvolvimento Web',
                progress: 80,
                status: 'Em andamento'
            },
            {
                id: 2,
                name: 'Marketing Digital',
                progress: 100,
                status: 'Concluído'
            },
            {
                id: 3,
                name: 'Design UX/UI',
                progress: 60,
                status: 'Em andamento'
            }
        ]
    };

    // Update profile information
    function updateProfile() {
        document.querySelector('.profile-info h1').textContent = userData.name;
        document.querySelector('.profile-info p').textContent = `@${userData.username}`;
        document.querySelector('.info-item:nth-child(1) span').textContent = userData.email;
        document.querySelector('.info-item:nth-child(2) span').textContent = userData.phone;
        document.querySelector('.info-item:nth-child(3) span').textContent = userData.location;
    }

    // Render courses
    function renderCourses() {
        const coursesList = document.querySelector('.courses-list');
        coursesList.innerHTML = userData.courses.map(course => `
            <div class="course-card">
                <h3>${course.name}</h3>
                <div class="progress">
                    <div class="progress-bar" 
                         role="progressbar" 
                         style="width: ${course.progress}%" 
                         aria-valuenow="${course.progress}" 
                         aria-valuemin="0" 
                         aria-valuemax="100">
                        ${course.progress}%
                    </div>
                </div>
                <span class="status ${course.status === 'Concluído' ? 'completed' : 'in-progress'}">
                    ${course.status}
                </span>
            </div>
        `).join('');
    }

    // Initialize profile
    updateProfile();
    renderCourses();

    // Handle profile picture upload
    document.querySelector('.edit-avatar').addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.querySelector('.profile-avatar img').src = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        }
        input.click();
    });

    document.getElementById('btnTrocarFoto').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('inputFotoPerfil').click();
    });

    document.getElementById('inputFotoPerfil').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(ev) {
                document.getElementById('fotoPerfil').src = ev.target.result;
            }
            reader.readAsDataURL(file);
        }
    });

    // Editar Perfil
    const modalEditarPerfil = new bootstrap.Modal(document.getElementById('modalEditarPerfil'));
    const btnEditarPerfil = document.getElementById('btnEditarPerfil');
    const inputNome = document.getElementById('inputNome');
    const inputUsuario = document.getElementById('inputUsuario');
    const inputEmail = document.getElementById('inputEmail');

    btnEditarPerfil.addEventListener('click', function() {
        // Preenche os campos com os dados atuais
        inputNome.value = document.querySelector('h2.fw-bold.mb-1').textContent;
        inputUsuario.value = document.querySelector('.text-muted.mb-2').textContent.replace('@', '');
        inputEmail.value = document.querySelector('.bi-envelope').parentElement.innerText.replace('E-mail', '').replace('✉', '').trim();
        modalEditarPerfil.show();
    });

    document.getElementById('formEditarPerfil').addEventListener('submit', function(e) {
        e.preventDefault();
        // Atualiza os dados no perfil
        document.querySelector('.fw-bold.mb-1').textContent = inputNome.value;
        document.querySelector('.text-muted.mb-2').textContent = '@' + inputUsuario.value;
        document.querySelector('.bi-envelope').parentElement.innerHTML = '<i class="bi bi-envelope"></i> ' + inputEmail.value;
        modalEditarPerfil.hide();
    });
});

