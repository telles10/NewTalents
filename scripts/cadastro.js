window.addEventListener('DOMContentLoaded', function() {
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

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const senha = document.getElementById('senha').value;
            const confirmar = document.getElementById('confirmarSenha').value;

            if (!nome || !email || !telefone || !senha || !confirmar) {
                alert('Preencha todos os campos.');
                return;
            }
            const telPattern = /^\+\d{1,3}\s?\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
            if (!telPattern.test(telefone)) {
                alert('Digite o telefone no formato: +55 (11) 91234-5678');
                return;
            }
            if (senha !== confirmar) {
                alert('As senhas não coincidem.');
                return;
            }

            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            // Verifica duplicidade de email, telefone ou senha
            if (usuarios.some(u => u.email === email)) {
                alert('Este email já está cadastrado. Use outro.');
                return;
            }
            if (usuarios.some(u => u.telefone === telefone)) {
                alert('Este telefone já está cadastrado. Use outro.');
                return;
            }
            if (usuarios.some(u => u.senha === senha)) {
                alert('Esta senha já está em uso. Escolha outra senha.');
                return;
            }

            usuarios.push({ nome, email, telefone, senha });
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            alert('Cadastro realizado com sucesso!');
            form.reset();
            window.location.href = "login.html";
        });
    }
});

