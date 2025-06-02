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
    // Salvar e carregar campos personalizáveis
    const fields = [
        "nome", "cargo", "localizacao", "email", "telefone",
        "sobre", "formacao", "experiencia", "habilidades", "idiomas"
    ];
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            const saved = localStorage.getItem("cv_" + id);
            if (saved) el.value = saved;
            el.addEventListener("input", () => {
                localStorage.setItem("cv_" + id, el.value);
            });
        }
    });

    // Foto de perfil personalizada e salva
    const fotoInput = document.getElementById("fotoPerfil");
    const fotoPreview = document.getElementById("fotoPreview");
    if (fotoInput && fotoPreview) {
        const savedImg = localStorage.getItem("cv_foto");
        if (savedImg) fotoPreview.src = savedImg;
        fotoInput.addEventListener("change", function(e) {
            const file = e.target.files[0];
            if (file && file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    fotoPreview.src = evt.target.result;
                    localStorage.setItem("cv_foto", evt.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
    }
});

window.addEventListener('DOMContentLoaded', function() {
    // Função para habilitar/desabilitar campos
    function setEditable(editable) {
        const fields = document.querySelectorAll(
            "#nome, #cargo, #localizacao, #email, #telefone, #sobre, #formacao, #experiencia, #habilidades, #idiomas"
        );
        fields.forEach(f => { if (f) f.disabled = !editable; });
    }

    // Inicialmente só pode salvar, editar desabilitado
    setEditable(true);
    document.getElementById('btnSalvar').disabled = false;
    document.getElementById('btnEditar').disabled = true;

    document.getElementById('btnSalvar').onclick = function() {
        setEditable(false);
        this.disabled = true;
        document.getElementById('btnEditar').disabled = false;
    };
    document.getElementById('btnEditar').onclick = function() {
        setEditable(true);
        this.disabled = true;
        document.getElementById('btnSalvar').disabled = false;
    };
});