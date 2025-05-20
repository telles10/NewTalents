document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const openSidebar = document.getElementById('openSidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    const overlay = document.getElementById('sidebarOverlay');

    if (openSidebar && sidebar && closeSidebar && overlay) {
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
    }

    // Notificação funcional e acessível
    const notificationIcon = document.getElementById('notificationDropdown');
    const notificationMenu = document.getElementById('notificationMenu');
    if (notificationIcon && notificationMenu) {
        function toggleNotificationMenu(e) {
            e.stopPropagation();
            notificationMenu.classList.toggle('show');
        }
        notificationIcon.addEventListener('click', toggleNotificationMenu);
        notificationIcon.addEventListener('keydown', function(e){
            if(e.key === "Enter" || e.key === " "){
                toggleNotificationMenu(e);
            }
        });
        document.addEventListener('click', function () {
            notificationMenu.classList.remove('show');
        });
        window.addEventListener('resize', function () {
            notificationMenu.classList.remove('show');
        });
    }
});
