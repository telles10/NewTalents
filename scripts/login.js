window.addEventListener('DOMContentLoaded', function() {
    // Partículas de fundo
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

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const nome = document.getElementById('nome') ? document.getElementById('nome').value.trim() : '';
            const email = document.getElementById('email').value.trim();
            const senha = document.getElementById('senha').value.trim();
            if (!email || !senha) {
                alert('Preencha todos os campos.');
                return;
            }

            // Salva o login na lista de logins
            let logins = JSON.parse(localStorage.getItem('logins')) || [];
            logins.push({ nome, email, senha, data: new Date().toISOString() });
            localStorage.setItem('logins', JSON.stringify(logins));

            // Salva o usuário logado
            localStorage.setItem('usuarioLogado', JSON.stringify({ nome, email }));

            // Redireciona para home.html
            window.location.href = "home.html";
        });
    }

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
});

