document.addEventListener('DOMContentLoaded', function () {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    const pagina = window.location.pathname.split('/').pop().toLowerCase();
    const paginasPublicas = ['index.html', 'login.html', 'cadastro.html', ''];
    const paginasPrivadas = ['home.html', 'cursos.html', 'tutores.html', 'mentoria.html', 'curriculo.html', 'mentor.html', 'mentoriaia.html', 'mentoriaia.html', 'mentoriaia.html', 'mentoriaia.html', 'mentorai.html', 'mentoriaia.html', 'mentoriaia.html', 'mentorai.html', 'mentorIA.html', 'mentorIa.html', 'mentoriaIA.html', 'mentorIA.html'];

    // Se NÃO estiver logado e tentar acessar página privada, volta para anterior ou index
    if (!usuarioLogado && !paginasPublicas.includes(pagina)) {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = "index.html";
        }
        return;
    }

    // Se estiver logado e tentar acessar página pública, volta para anterior ou home
    if (usuarioLogado && paginasPublicas.includes(pagina)) {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = "home.html";
        }
        return;
    }

    // Se NÃO estiver logado, bloqueia acesso à home.html
    if (!usuarioLogado && pagina === 'home.html') {
        alert('Você precisa estar logado para acessar a Home.');
        window.location.href = 'index.html';
    }

    // Se estiver logado, bloqueia acesso a todas as páginas exceto home.html
    if (usuarioLogado && pagina !== 'home.html') {
        alert('Você já está logado. Redirecionando para a Home.');
        window.location.href = 'home.html';
    }

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
        // Adiciona classe para animação CSS
        notificationDropdown.classList.add('notificacao-superficial');
        notificationDropdown.addEventListener('click', function (e) {
            e.preventDefault();
            // Animação de clique
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

    // Perfil do usuário na navbar
    const user = JSON.parse(localStorage.getItem('usuarioLogado'));
    const userName = document.getElementById('userName');
    const userPhoto = document.getElementById('userPhoto');
    const foto = localStorage.getItem('fotoUsuario');
    if (user && userName) {
        userName.textContent = user.nome ? user.nome : user.email;
    }
    if (userPhoto) {
        // Mostra a foto do currículo se existir, senão usa a fotoUsuario, senão usa padrão
        const fotoSalva = localStorage.getItem('cv_foto');
        userPhoto.src = fotoSalva ? fotoSalva : (foto ? foto : "https://cdn-icons-png.flaticon.com/512/149/149071.png");
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

    // Sair - redireciona para index.html
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }

    // Atualiza badge de notificações na navbar
    function atualizarBadgeNotificacoes() {
        const badge = document.getElementById('notificacaoBadge');
        let notificacoes = [];
        try {
            notificacoes = JSON.parse(localStorage.getItem('notificacoes')) || [];
        } catch {}
        const qtd = notificacoes.length;
        if (badge) {
            if (qtd > 0) {
                badge.textContent = qtd > 9 ? '9+' : qtd;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        }
    }
    atualizarBadgeNotificacoes();
    window.addEventListener('storage', atualizarBadgeNotificacoes);
});