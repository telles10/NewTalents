document.addEventListener('DOMContentLoaded', function () {
    // Sidebar funcional
    const sidebar = document.getElementById('sidebar');
    const openSidebar = document.getElementById('openSidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    const overlay = document.getElementById('sidebarOverlay');

    if (openSidebar && sidebar && closeSidebar && overlay) {
        openSidebar.addEventListener('click', function () {
            sidebar.classList.add('active');
            overlay.classList.add('active');
        });
        closeSidebar.addEventListener('click', function () {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
        overlay.addEventListener('click', function () {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // Notificação funcional com efeito superficial e animação
    const notificationDropdown = document.getElementById('notificationDropdown');
    if (notificationDropdown) {
        notificationDropdown.classList.add('notificacao-superficial');
        notificationDropdown.addEventListener('click', function (e) {
            e.preventDefault();
            notificationDropdown.classList.add('clicado');
            setTimeout(() => {
                notificationDropdown.classList.remove('clicado');
                window.location.href = "notificação.html";
            }, 180); // tempo da animação
        });
    }

    // Redireciona todos os botões/links de voltar para home.html
    document.querySelectorAll('.voltar').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = "home.html";
        });
    });

    // Exibir nome ou email do usuário logado na navbar e foto
    function atualizarPerfilNavbar() {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        const userNameSpan = document.getElementById('userName');
        const userPhoto = document.getElementById('userPhoto');
        if (usuarioLogado && userNameSpan) {
            userNameSpan.textContent = usuarioLogado.nome || usuarioLogado.email;
        }
        if (usuarioLogado && usuarioLogado.foto && userPhoto) {
            userPhoto.src = usuarioLogado.foto;
        } else if (userPhoto) {
            userPhoto.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
        }
    }
    atualizarPerfilNavbar();

    // Dropdown manual para evitar conflito com Bootstrap JS
    const profileBtn = document.getElementById('profileBtn');
    const profileMenu = document.getElementById('profileMenu');
    if (profileBtn && profileMenu) {
        profileBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            profileMenu.classList.toggle('show');
        });
        document.addEventListener('click', function (e) {
            if (!profileMenu.contains(e.target) && !profileBtn.contains(e.target)) {
                profileMenu.classList.remove('show');
            }
        });
        profileMenu.addEventListener('click', function(e){
            e.stopPropagation();
        });
    }

    // Sair - redireciona para index.html e limpa dados do usuário
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            localStorage.removeItem('usuarioLogado');
            localStorage.removeItem('fotoUsuario');
            localStorage.removeItem('cv_foto');
            window.location.href = "index.html";
        });
    }
});