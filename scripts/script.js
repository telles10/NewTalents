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

    // Partículas simples no fundo
    const canvas = document.getElementById('particles-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth, h = window.innerHeight;
    canvas.width = w; canvas.height = h;
    let particles = [];
    for(let i=0;i<32;i++){
        particles.push({
            x: Math.random()*w,
            y: Math.random()*h,
            r: 1.5+Math.random()*2.5,
            dx: (Math.random()-0.5)*0.7,
            dy: (Math.random()-0.5)*0.7,
            a: 0.10+Math.random()*0.10
        });
    }
    function draw(){
        ctx.clearRect(0,0,w,h);
        for(let p of particles){
            ctx.beginPath();
            ctx.arc(p.x,p.y,p.r,0,2*Math.PI);
            ctx.fillStyle = `rgba(0,123,255,${p.a})`;
            ctx.shadowColor = "#003366";
            ctx.shadowBlur = 8;
            ctx.fill();
            p.x += p.dx; p.y += p.dy;
            if(p.x<0||p.x>w) p.dx*=-1;
            if(p.y<0||p.y>h) p.dy*=-1;
        }
        requestAnimationFrame(draw);
    }
    draw();
    window.addEventListener('resize',()=>{
        w = window.innerWidth; h = window.innerHeight;
        canvas.width = w; canvas.height = h;
    });
});
