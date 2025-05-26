document.addEventListener('DOMContentLoaded', function () {
    const micBtn = document.getElementById('micBtn');
    const iaBubble = document.getElementById('iaBubble');
    const userMessage = document.getElementById('userMessage');
    const sendMessage = document.getElementById('sendMessage');
    let recognizing = false;
    let recognition;
    let lastTutorReply = '';

    // Web Speech API - Reconhecimento de voz
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.lang = 'pt-BR';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            recognizing = true;
            micBtn.classList.add('active');
            iaBubble.innerHTML = "Estou ouvindo... Fale sua pergunta!";
        };
        recognition.onend = () => {
            recognizing = false;
            micBtn.classList.remove('active');
            if (!lastTutorReply) iaBubble.innerHTML = "Não entendi. Tente novamente!";
        };
        recognition.onerror = () => {
            recognizing = false;
            micBtn.classList.remove('active');
            iaBubble.innerHTML = "Não consegui ouvir. Clique e tente de novo!";
        };
        recognition.onresult = (event) => {
            const msg = event.results[0][0].transcript;
            iaBubble.innerHTML = `<span class="text-primary"><i class="bi bi-person"></i> ${msg}</span>`;
            setTimeout(() => {
                lastTutorReply = getTutorReply(msg);
                iaBubble.innerHTML = `<span class="text-info"><i class="bi bi-robot"></i> ${lastTutorReply}</span>`;
                speak(lastTutorReply);
            }, 700);
        };
    } else {
        micBtn.disabled = true;
        iaBubble.innerHTML = "Seu navegador não suporta reconhecimento de voz.";
    }

    micBtn.addEventListener('click', function () {
        if (recognition && !recognizing) {
            lastTutorReply = '';
            recognition.start();
        }
    });

    sendMessage.addEventListener('click', sendChat);
    userMessage.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') sendChat();
    });

    function sendChat() {
        const msg = userMessage.value.trim();
        if (!msg) return;
        iaBubble.innerHTML = `<span class="text-primary"><i class="bi bi-person"></i> ${msg}</span>`;
        userMessage.value = '';
        setTimeout(() => {
            lastTutorReply = getTutorReply(msg);
            iaBubble.innerHTML = `<span class="text-info"><i class="bi bi-robot"></i> ${lastTutorReply}</span>`;
            speak(lastTutorReply);
        }, 700);
    }

    // Web Speech API para síntese de voz
    function speak(text) {
        if ('speechSynthesis' in window) {
            const synth = window.speechSynthesis;
            let utter = new SpeechSynthesisUtterance(text);
            utter.lang = 'pt-BR';

            // Tenta escolher uma voz feminina mais natural, se disponível
            let voices = synth.getVoices();
            let voice = voices.find(v => v.lang.startsWith('pt') && /fem|mulher|female/i.test(v.name));
            if (!voice) voice = voices.find(v => v.lang.startsWith('pt'));
            if (voice) utter.voice = voice;
            utter.rate = 1.02;
            utter.pitch = 1.08;
            synth.speak(utter);
        }
    }

    // IA Simples (substitua por integração real se quiser)
    function getTutorReply(msg) {
        msg = msg.toLowerCase();
        // Respostas mais completas e envolventes
        if (/ingl[eê]s|english/.test(msg)) {
            return "Vamos praticar inglês! Me conte sobre suas experiências profissionais em inglês ou peça uma simulação.";
        }
        if (/t[eé]cnica|l[oó]gica|projeto|desafio/.test(msg)) {
            return "Ótimo! Conte sobre um projeto que você desenvolveu ou um desafio técnico que superou. Posso simular perguntas técnicas também!";
        }
        if (/rh|comportamental|pessoal|soft/.test(msg)) {
            return "Em entrevistas de RH, destaque suas experiências positivas, como você resolve conflitos e trabalha em equipe.";
        }
        if (/dica|melhor|preparar|preparo/.test(msg)) {
            return "Dica: pesquise sobre a empresa, revise seu currículo e pratique respostas para perguntas comuns. Quer simular uma entrevista agora?";
        }
        if (/ol[áa]|oi|bom dia|boa tarde|boa noite/.test(msg)) {
            return "Olá! Como posso te ajudar hoje? Posso simular entrevistas, dar dicas ou responder dúvidas.";
        }
        if (/simula|simular|entrevista/.test(msg)) {
            return "Vamos simular! Pergunta 1: Fale sobre você e sua trajetória profissional.";
        }
        if (/obrigad[ao]/.test(msg)) {
            return "De nada! Sempre que precisar, estarei aqui para ajudar.";
        }
        if (/curr[ií]culo|cv/.test(msg)) {
            return "Seu currículo deve ser claro, objetivo e destacar suas principais conquistas. Quer dicas específicas?";
        }
        if (/experi[eê]ncia|trabalho|empresa/.test(msg)) {
            return "Conte sobre sua experiência mais relevante e o que aprendeu em cada empresa.";
        }
        // Resposta padrão
        return "Estou aqui para ajudar! Peça uma simulação de entrevista, dicas ou tire suas dúvidas sobre carreira.";
    }
});