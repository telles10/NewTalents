document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const openSidebar = document.getElementById('openSidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    const overlay = document.getElementById('sidebarOverlay');

    openSidebar.addEventListener('click', function () {
        sidebar.classList.add('open');
        overlay.style.display = 'block';
    });

    closeSidebar.addEventListener('click', function () {
        sidebar.classList.remove('open');
        overlay.style.display = 'none';
    });

    overlay.addEventListener('click', function () {
        sidebar.classList.remove('open');
        overlay.style.display = 'none';
    });
});