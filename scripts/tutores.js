document.addEventListener('DOMContentLoaded', function () {
    // Chat Modal Bootstrap
    const chatModal = new bootstrap.Modal(document.getElementById('chatModal'));
    const chatArea = document.getElementById('chatArea');
    const userMessage = document.getElementById('userMessage');
    const sendMessage = document.getElementById('sendMessage');
    const voiceMessage = document.getElementById('voiceMessage');
    let currentTutor = 'Mentor IA 3D';
    let lastTutorReply = '';

    document.querySelectorAll('.start-chat-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            currentTutor = btn.getAttribute('data-tutor');
            document.getElementById('chatModalLabel').textContent = `Conversa com ${currentTutor}`;
            chatArea.innerHTML = `<div class="text-secondary small">O Mentor IA 3D está pronto para te ajudar! Faça uma pergunta de entrevista.</div>`;
            userMessage.value = '';
            chatModal.show();
        });
    });

    sendMessage.addEventListener('click', sendChat);
    userMessage.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') sendChat();
    });

    function sendChat() {
        const msg = userMessage.value.trim();
        if (!msg) return;
        chatArea.innerHTML += `<div class="text-end mb-2"><span class="badge bg-primary">${msg}</span></div>`;
        userMessage.value = '';
        setTimeout(() => {
            lastTutorReply = getTutorReply(currentTutor, msg);
            chatArea.innerHTML += `<div class="text-start mb-2"><span class="badge bg-light text-dark">${lastTutorReply}</span></div>`;
            chatArea.scrollTop = chatArea.scrollHeight;
            speak(lastTutorReply);
        }, 700);
    }

    // Web Speech API para síntese de voz
    function speak(text) {
        if ('speechSynthesis' in window) {
            const utter = new SpeechSynthesisUtterance(text);
            utter.lang = 'pt-BR';
            window.speechSynthesis.speak(utter);
        }
    }

    // Botão para ouvir a última resposta novamente
    voiceMessage.addEventListener('click', function () {
        if (lastTutorReply) speak(lastTutorReply);
    });

    function getTutorReply(tutor, msg) {
        // Simulação de IA: respostas básicas
        if (/ingl[eê]s|english/i.test(msg)) {
            return "Let's practice! Tell me about your strengths in English.";
        }
        if (/t[eé]cnica|l[oó]gica|projeto/i.test(msg)) {
            return "Vamos praticar uma questão técnica: explique um projeto que você já desenvolveu.";
        }
        if (/rh|comportamental|pessoal|soft/i.test(msg)) {
            return "Ótima pergunta! Em entrevistas de RH, seja sincero e destaque suas experiências positivas.";
        }
        if (/dica|melhor|preparar/i.test(msg)) {
            return "Prepare-se pesquisando sobre a empresa, revisando seu currículo e praticando respostas para perguntas comuns.";
        }
        return "Estou aqui para ajudar! Faça outra pergunta ou peça uma simulação de entrevista.";
    }

    // BLOQUEIO DE CAMINHOS
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    const pagina = window.location.pathname.split('/').pop().toLowerCase();
    const paginasPublicas = ['index.html', 'login.html', 'cadastro.html', ''];
    const paginasPrivadas = ['home.html', 'cursos.html', 'tutores.html', 'mentoria.html', 'curriculo.html', 'mentor.html', 'mentoriaia.html', 'mentoriaia.html', 'mentoriaia.html', 'mentoriaia.html', 'mentorai.html', 'mentoriaia.html', 'mentoriaia.html', 'mentorai.html', 'mentorIA.html', 'mentorIa.html', 'mentoriaIA.html', 'mentorIA.html'];

    // Se NÃO estiver logado e tentar acessar página privada, volta para a anterior ou index
    if (!usuarioLogado && !paginasPublicas.includes(pagina)) {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = "index.html";
        }
        return;
    }

    // Se estiver logado e tentar acessar página pública, volta para a anterior ou home
    if (usuarioLogado && paginasPublicas.includes(pagina)) {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = "home.html";
        }
        return;
    }
});


