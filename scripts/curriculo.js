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

// Adicione ou mantenha este script para personalização e foto de perfil
// filepath: \\sn928escoladfp1\pastas alunos$\54946783857\Desktop\projeto\NewTalents\scripts\curriculo.js
window.addEventListener('DOMContentLoaded', function() {
    const fotoPerfil = document.getElementById('fotoPerfil');
    const fotoPreview = document.getElementById('fotoPreview');
    const btnSalvar = document.getElementById('btnSalvar');
    const btnEditar = document.getElementById('btnEditar');
    const campos = [
        'nome', 'cargo', 'localizacao', 'email', 'telefone',
        'sobre', 'formacao', 'experiencia', 'habilidades', 'idiomas'
    ];

    // Carregar dados do currículo e foto
    function carregarCurriculo() {
        const dados = JSON.parse(localStorage.getItem('curriculo')) || {};
        campos.forEach(id => {
            const el = document.getElementById(id);
            if (el && dados[id]) el.value = dados[id];
        });
        if (dados.foto) {
            fotoPreview.src = dados.foto;
        } else {
            // Se não houver foto no curriculo, tenta pegar do usuarioLogado
            const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
            if (usuario && usuario.foto) fotoPreview.src = usuario.foto;
        }
        setCamposEditaveis(false);
        btnEditar.disabled = false;
        btnSalvar.disabled = true;
    }

    function setCamposEditaveis(editavel) {
        campos.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.disabled = !editavel;
        });
        fotoPerfil.disabled = !editavel;
    }

    // Trocar foto ao selecionar arquivo
    fotoPerfil.addEventListener('change', function () {
        const file = fotoPerfil.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                fotoPreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Editar currículo
    btnEditar.addEventListener('click', function () {
        setCamposEditaveis(true);
        btnSalvar.disabled = false;
        btnEditar.disabled = true;
    });

    // Salvar currículo e foto
    btnSalvar.addEventListener('click', function () {
        const dados = {};
        campos.forEach(id => {
            const el = document.getElementById(id);
            if (el) dados[id] = el.value;
        });
        dados.foto = fotoPreview.src;
        localStorage.setItem('curriculo', JSON.stringify(dados));

        // Atualiza foto do usuário logado (navbar)
        let usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
        if (usuario) {
            usuario.foto = fotoPreview.src;
            localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        }
        const userPhoto = document.getElementById('userPhoto');
        if (userPhoto) userPhoto.src = fotoPreview.src;

        setCamposEditaveis(false);
        btnEditar.disabled = false;
        btnSalvar.disabled = true;
        alert('Currículo salvo com sucesso!');
    });

    carregarCurriculo();
});


