document.addEventListener('DOMContentLoaded', function () {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    const pagina = window.location.pathname.split('/').pop().toLowerCase();
    const paginasPublicas = ['index.html', 'login.html', 'cadastro.html', ''];

    // Se NÃO estiver logado e tentar acessar página privada, vai para index
    if (!usuarioLogado && !paginasPublicas.includes(pagina)) {
        setTimeout(() => window.location.replace("index.html"), 50);
        return;
    }

    // Se estiver logado e tentar acessar página pública, vai para home
    if (usuarioLogado && paginasPublicas.includes(pagina)) {
        setTimeout(() => window.location.replace("home.html"), 50);
        return;
    }
});