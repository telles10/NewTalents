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

    // Notificação funcional
    const notificationDropdown = document.getElementById('notificationDropdown');
    const notificationMenu = document.getElementById('notificationMenu');
    if (notificationDropdown && notificationMenu) {
        notificationDropdown.addEventListener('click', function (e) {
            e.stopPropagation();
            notificationMenu.classList.toggle('show');
        });
        document.addEventListener('click', function (e) {
            if (!notificationMenu.contains(e.target) && !notificationDropdown.contains(e.target)) {
                notificationMenu.classList.remove('show');
            }
        });
        notificationMenu.addEventListener('click', function(e){
            e.stopPropagation();
        });
    }

    // Redireciona todos os botões/links de voltar para home.html
    document.querySelectorAll('.voltar').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = "home.html";
        });
    });

    // Perfil do usuário na navbar
    const user = JSON.parse(localStorage.getItem('usuarioLogado'));
    const userName = document.getElementById('userName');
    const userPhoto = document.getElementById('userPhoto');
    const foto = localStorage.getItem('fotoUsuario');
    if (user && userName) {
        userName.textContent = user.nome ? user.nome : user.email;
    }
    if (userPhoto) {
        userPhoto.src = foto ? foto : "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    }

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

    // Sair
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            localStorage.removeItem('usuarioLogado');
            window.location.href = "index.html";
        });
    }
});