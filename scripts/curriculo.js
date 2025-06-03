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
    let fotoTemp = null;

    // Ao selecionar uma foto, só mostra o preview (não salva ainda)
    if (fotoInput && fotoPreview) {
        const savedImg = localStorage.getItem("cv_foto");
        if (savedImg) fotoPreview.src = savedImg;
        fotoInput.addEventListener("change", function(e) {
            const file = e.target.files[0];
            if (file && file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    fotoPreview.src = evt.target.result;
                    fotoTemp = evt.target.result; // Só salva na variável temporária
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Função para habilitar/desabilitar campos
    function setEditable(editable) {
        const fields = document.querySelectorAll(
            "#nome, #cargo, #localizacao, #email, #telefone, #sobre, #formacao, #experiencia, #habilidades, #idiomas"
        );
        fields.forEach(f => { if (f) f.disabled = !editable; });
        if (fotoInput) fotoInput.disabled = !editable;
    }

    // Estado de edição salvo no localStorage
    let editavel = localStorage.getItem('curriculo_editavel');
    if (editavel === null) editavel = "true";
    setEditable(editavel === "true");
    document.getElementById('btnSalvar').disabled = editavel !== "true";
    document.getElementById('btnEditar').disabled = editavel === "true";

    document.getElementById('btnSalvar').onclick = function() {
        setEditable(false);
        this.disabled = true;
        document.getElementById('btnEditar').disabled = false;
        localStorage.setItem('curriculo_editavel', "false");
        // Salva a foto apenas ao clicar em salvar
        if (fotoTemp) {
            localStorage.setItem("cv_foto", fotoTemp);
            fotoTemp = null;
        }
        window.notificarAcao && window.notificarAcao('curriculo_salvo');
        mostrarMensagem('Currículo salvo com sucesso!', 'success');
    };
    document.getElementById('btnEditar').onclick = function() {
        setEditable(true);
        this.disabled = true;
        document.getElementById('btnSalvar').disabled = false;
        localStorage.setItem('curriculo_editavel', "true");
    };

    // Função para mostrar mensagem temporária
    function mostrarMensagem(texto, tipo = 'info') {
        let msg = document.createElement('div');
        msg.className = `alert alert-${tipo} position-fixed top-0 start-50 translate-middle-x mt-3 shadow`;
        msg.style.zIndex = 9999;
        msg.textContent = texto;
        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 2500);
    }


