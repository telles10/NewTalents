document.addEventListener('DOMContentLoaded', function () {
    const micBtn = document.getElementById('micBtn');
    const iaBubble = document.getElementById('iaBubble');
    const userMessage = document.getElementById('userMessage');
    const sendMessage = document.getElementById('sendMessage');
    const voltarBtns = document.querySelectorAll('.btn-voltar, .btn-back');
    let recognizing = false;
    let recognition;
    let synth = window.speechSynthesis;
    let utter;

    // --- Reconhecimento de voz ---
    if (micBtn && iaBubble && userMessage && sendMessage) {
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
            };
            recognition.onerror = (event) => {
                recognizing = false;
                micBtn.classList.remove('active');
                iaBubble.innerHTML = "Não consegui ouvir. Clique e tente de novo!<br><small>" + (event.error || "") + "</small>";
            };
            recognition.onresult = (event) => {
                const msg = event.results[0][0].transcript;
                userMessage.value = msg;
                iaBubble.innerHTML = `<span class="text-primary"><i class="bi bi-person"></i> ${msg}</span>`;
                sendChat(msg);
            };

            micBtn.addEventListener('click', function () {
                if (recognition && !recognizing) {
                    stopVoice();
                    recognition.start();
                }
            });
        } else {
            micBtn.disabled = true;
            iaBubble.innerHTML = "Seu navegador não suporta reconhecimento de voz.";
        }

        sendMessage.addEventListener('click', () => {
            stopVoice();
            sendChat(userMessage.value);
        });
        userMessage.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                stopVoice();
                sendChat(userMessage.value);
            }
        });

        // Para a voz ao clicar na barra do chat (campo de digitação)
        userMessage.addEventListener('focus', stopVoice);

        // Para a voz ao clicar no botão de voltar
        voltarBtns.forEach(btn => {
            btn.addEventListener('click', stopVoice);
        });

        // Para a voz ao clicar na seta de voltar no canto superior esquerdo
        const setaVoltar = document.querySelector('.btn-back-nt');
        if (setaVoltar) {
            setaVoltar.addEventListener('click', stopVoice);
        }
    }

    // --- IA gratuita baseada em respostas inteligentes e sites confiáveis ---
    function sendChat(msg) {
        msg = (msg || userMessage.value).trim().toLowerCase();
        if (!msg) return;
        iaBubble.innerHTML = `<span class="text-primary"><i class="bi bi-person"></i> ${msg}</span>`;
        userMessage.value = '';
        iaBubble.innerHTML += `<div class="mt-2 text-secondary small"><i class="bi bi-robot"></i> Pensando...</div>`;

        setTimeout(() => {
            const resposta = getRespostaSimulada(msg);
            iaBubble.innerHTML = `<span class="text-info"><i class="bi bi-robot"></i> ${resposta}</span>`;
            speak(resposta);
        }, 800);
    }

    // --- IA simulada com compreensão ampla, tolerância a erros e respostas para tudo ---
    function getRespostaSimulada(msg) {
        msg = msg.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        let palavras = msg.split(/\W+/);

        // Ajuda personalizada
        if (/preciso de ajuda|me ajuda|ajuda|socorro|duvida|dúvida|ajudar|me socorre|me salva|me orienta|me explica|explica|explicar|ensina|ensinar/.test(msg)) {
            return `Claro! Que tipo de ajuda você precisa?<br>
            <b>1.</b> Currículo<br>
            <b>2.</b> Entrevista<br>
            <b>3.</b> Vagas de emprego<br>
            <b>4.</b> LinkedIn<br>
            <b>5.</b> Motivação<br>
            <b>6.</b> Cursos gratuitos<br>
            <b>7.</b> Simulação de entrevista<br>
            <b>8.</b> Dicas gerais<br>
            <i>Digite o número ou o tema que deseja ajuda!</i>`;
        }

        // Simulação de IA real: responde tudo, inclusive perguntas abertas
        if (
            /simulacao|simulação|simular|entrevista|simulação de entrevista|me ajuda com uma simulação|me treina|treinar|treino|treinamento|fingir|finge|fazer de conta|me faz uma pergunta|me faz perguntas|me faz uma simulação|me faz simulação|me faz entrevista|me faz uma entrevista|me faz perguntas de entrevista|me faz perguntas para entrevista|me faz perguntas para simulação|me faz perguntas para simular|me faz perguntas para treinar|me faz perguntas para treinamento|me faz perguntas para fingir|me faz perguntas para fazer de conta|me faz perguntas para fazer de conta que estou em uma entrevista|me faz perguntas para fazer de conta que estou em uma simulação|me faz perguntas para fazer de conta que estou em uma simulação de entrevista|me faz perguntas para fazer de conta que estou em uma simulação de entrevista de emprego|me faz perguntas para fazer de conta que estou em uma simulação de entrevista de trabalho|me faz perguntas para fazer de conta que estou em uma simulação de entrevista de estágio|me faz perguntas para fazer de conta que estou em uma simulação de entrevista de trainee|me faz perguntas para fazer de conta que estou em uma simulação de entrevista de jovem aprendiz|me faz perguntas para fazer de conta que estou em uma simulação de entrevista de primeiro emprego/i
            .test(msg)
        ) {
            return `Vamos simular uma entrevista! Pergunta clássica: <b>"Fale sobre você."</b> Responda de forma breve, destacando suas experiências e motivações.<br>
            Se quiser outra pergunta, digite: <b>próxima</b>`;
        }

        // Cumprimentos e apresentação
        if (palavras.some(p => ["ola","oi","bom","boa","saudacao","eai","fala"].includes(p))) {
            return "Olá! Como posso ajudar na sua carreira ou dúvidas profissionais?";
        }
        if (msg.includes("nome") || msg.includes("quem é você") || msg.includes("quem e voce")) {
            return "Sou Mentor IA, sua assistente virtual de carreira e entrevistas!";
        }

        // Currículo
        if (/curriculo|currículo|curriculoo|curriculu|curiculo|curriculum|curricilo/.test(msg)) {
            return `Monte seu currículo com modelos gratuitos do <a href="https://www.canva.com/pt_br/curriculos/modelos/" target="_blank">Canva</a> ou <a href="https://www.vagas.com.br/profissoes/modelos-de-curriculo" target="_blank">Vagas.com</a>. Foque em experiências, habilidades e resultados.`;
        }
        if (/foto curriculo|foto no curriculo|foto currículo|foto no currículo/.test(msg)) {
            return "Evite foto no currículo, a não ser que a vaga peça. O importante é destacar suas experiências e habilidades.";
        }
        if (/objetivo curriculo|objetivo no curriculo|objetivo currículo|objetivo no currículo/.test(msg)) {
            return "No objetivo, seja breve e mostre seu interesse pela vaga e área de atuação.";
        }
        if (/formacao|formação|formacao academica|formação acadêmica/.test(msg)) {
            return "Na formação, coloque o nome do curso, instituição e ano de conclusão.";
        }
        if (/experiencia|experiência|experiencias|experiências/.test(msg)) {
            return "Liste experiências relevantes, com cargo, empresa, período e principais atividades.";
        }
        if (/idioma|ingles|espanhol|idiomas|frances|alemao|italiano/.test(msg)) {
            return "Inclua idiomas no currículo apenas se tiver pelo menos nível intermediário. Seja honesto sobre seu nível.";
        }
        if (/curso|cursos gratuitos|certificado|certificados|curso online|cursos online/.test(msg)) {
            return `Veja cursos gratuitos em <a href="https://www.ev.org.br/" target="_blank">Fundação Bradesco</a>, <a href="https://www.coursera.org/" target="_blank">Coursera</a>, <a href="https://www.alura.com.br/" target="_blank">Alura Start</a>, <a href="https://www.senai.com.br/" target="_blank">SENAI</a> e <a href="https://www.sebrae.com.br/sites/PortalSebrae/cursosonline" target="_blank">Sebrae</a>.`;
        }

        // Vagas e emprego
        if (/vaga|emprego|trabalho|contratar|contratação|contratacao/.test(msg)) {
            return `Busque vagas em <a href="https://www.linkedin.com/jobs/" target="_blank">LinkedIn</a>, <a href="https://www.catho.com.br/" target="_blank">Catho</a>, <a href="https://www.vagas.com.br/" target="_blank">Vagas.com</a>, <a href="https://www.infojobs.com.br/" target="_blank">InfoJobs</a> e grupos de WhatsApp/Telegram da sua área.`;
        }
        if (/primeiro emprego|jovem aprendiz|aprendiz/.test(msg)) {
            return "Para o primeiro emprego, destaque cursos, projetos, voluntariado e habilidades comportamentais.";
        }
        if (/remoto|home office|trabalho em casa|teletrabalho/.test(msg)) {
            return "O trabalho remoto exige disciplina, boa comunicação e organização. Veja vagas remotas no LinkedIn, Remotar e Trampos.co.";
        }
        if (/estagio|estágio|estagiar/.test(msg)) {
            return "Para estágio, busque vagas em CIEE, Nube, LinkedIn, Vagas.com e destaque cursos e projetos acadêmicos.";
        }

        // LinkedIn
        if (/linkedin|linkdin|lindedin|linkeding/.test(msg)) {
            return `Mantenha seu LinkedIn atualizado, conecte-se com profissionais da sua área e participe de grupos de interesse. Veja dicas em <a href="https://www.linkedin.com/pulse/como-melhorar-o-seu-linkedin-em-2023-lucas-cavalcante/" target="_blank">Como melhorar seu LinkedIn</a> e <a href="https://www.napratica.org.br/como-melhorar-linkedin/" target="_blank">NaPrática</a>.`;
        }

        // Simulação de entrevista e "sobre mim"
        if (
            /sobre mim|fale sobre voce|apresentacao pessoal|me apresentar|me descreva|me descrever|me apresentar para entrevista|me apresentar para o recrutador/.test(msg)
        ) {
            return `<b>Dicas para responder "Fale sobre você" na entrevista:</b><br>
            - Comece com seu nome e formação.<br>
            - Destaque experiências e conquistas relevantes.<br>
            - Mostre entusiasmo e o que te motiva.<br>
            - Seja breve (1 a 2 minutos).<br>
            <i>Exemplo:</i> "Sou Ana, formada em Administração, tenho experiência em atendimento ao cliente e sou apaixonada por aprender e crescer profissionalmente."<br>
            <b>Dica:</b> Foque no que é relevante para a vaga e termine mostrando interesse na empresa.<br>
            Se quiser simular outra pergunta, digite: <b>próxima</b>`;
        }
        if (/proxima|próxima|outra pergunta|manda outra|mais uma|próxima pergunta|pergunta seguinte/.test(msg)) {
            const perguntas = [
                'Por que você quer trabalhar nesta empresa?',
                'Quais são seus pontos fortes?',
                'Quais são seus pontos a melhorar?',
                'Conte sobre um desafio profissional e como superou.',
                'Como você lida com pressão?',
                'Onde você se vê daqui a 5 anos?',
                'Por que devemos te contratar?',
                'Como você trabalha em equipe?',
                'Qual sua maior realização profissional?',
                'Como você lida com feedbacks?',
                'Você tem experiência com trabalho remoto?',
                'Como você organiza seu tempo e tarefas?',
                'Como lida com mudanças?',
                'Como busca se atualizar profissionalmente?',
                'Como lida com conflitos no trabalho?',
                'Qual seu maior aprendizado até hoje?',
                'Como você define sucesso profissional?',
                'Como você reage a críticas?',
                'O que te motiva no trabalho?',
                'Como você prioriza suas tarefas?',
                'Como lida com metas e prazos?',
                'Como você lida com clientes difíceis?',
                'Como você aprende coisas novas?',
                'Como você lida com erros?',
                'Como você se mantém motivado?',
                'Como você lida com pressão de prazos?',
                'Como você se comunica com colegas?',
                'Como você resolve problemas?',
                'Como você lida com mudanças de planos?',
                'Como você busca feedback?',
                'Como você se organiza no dia a dia?',
                'Como você lida com ansiedade?',
                'Como você lida com críticas negativas?',
                'Como você lida com liderança?',
                'Como você lida com diversidade?',
                'Como você lida com inclusão?',
                'Como você lida com metas agressivas?',
                'Como você lida com multitarefas?',
                'Como você lida com deadlines apertados?',
                'Como você lida com pressão de equipe?',
                'Como você lida com conflitos pessoais?',
                'Como você lida com mudanças de setor?',
                'Como você lida com novas tecnologias?',
                'Como você lida com feedback negativo?',
                'Como você lida com feedback positivo?',
                'Como você lida com trabalho em grupo?',
                'Como você lida com trabalho individual?',
                'Como você lida com desafios inesperados?'
            ];
            const pergunta = perguntas[Math.floor(Math.random() * perguntas.length)];
            return `<b>Pergunta de entrevista:</b> "${pergunta}"<br>Responda como se estivesse em uma entrevista. Se quiser outra, digite: <b>próxima</b>`;
        }

        // Soft skills, carreira, motivação, cursos, networking, inclusão, ansiedade, salário, portfólio, estágio, feedback, tecnologia, liderança, adaptação, diferencial, etc.
        if (/soft skill|habilidade comportamental|comportamental|comunicacao|resiliencia|empatia|lideranca|liderança|criatividade|proatividade|colaboracao|colaboração|adaptabilidade|flexibilidade/.test(msg)) {
            return `Soft skills são habilidades como comunicação, trabalho em equipe, resiliência, empatia, liderança, criatividade, proatividade, colaboração e adaptabilidade.`;
        }
        if (/hard skill|habilidade tecnica|tecnica|tecnicas|programacao|programação|informática|excel|powerpoint|word|sql|python|javascript|java|c#|php|html|css/.test(msg)) {
            return `Hard skills são habilidades técnicas, como ferramentas, idiomas ou programação.`;
        }
        if (/carreira|profissao|profissão|trilhar carreira|crescimento|promocao|promoção|subir de cargo|ascensao/.test(msg)) {
            return `Invista em cursos, participe de eventos, busque feedbacks, mantenha-se atualizado e mostre resultados. Veja cursos gratuitos em <a href="https://www.ev.org.br/" target="_blank">Fundação Bradesco</a>, <a href="https://www.coursera.org/" target="_blank">Coursera</a>, <a href="https://www.alura.com.br/" target="_blank">Alura</a>, <a href="https://www.senac.br/" target="_blank">Senac</a>.`;
        }
        if (/motivacao|motivação|desanimado|desmotivado|animo|ânimo|inspiracao|inspiração/.test(msg)) {
            return "Não desista! O mercado é competitivo, mas com persistência e aprendizado você conquista seu espaço. Evolua um pouco a cada dia!";
        }
        if (/ansiedade|nervoso|nervosa|medo|inseguro|insegura|tenso|tensa/.test(msg)) {
            return "É normal sentir ansiedade antes de entrevistas. Respire fundo, prepare-se bem e lembre-se: cada entrevista é uma oportunidade de aprendizado!";
        }
        if (/salario|pretensao salarial|pretensão salarial|ganhar mais|remuneracao|remuneração|faixa salarial/.test(msg)) {
            return "Pesquise a média salarial da sua área em sites como Glassdoor, Catho e LoveMondays. Seja realista e flexível ao informar sua pretensão.";
        }
        if (/networking|contatos profissionais|conhecer pessoas|relacionamento profissional|rede de contatos/.test(msg)) {
            return "Networking é fundamental! Participe de eventos, grupos online e mantenha contato com colegas de profissão. Use LinkedIn, Meetup, Eventbrite e comunidades da sua área.";
        }
        if (/portfólio|portfolio|projetos pessoais|portifolio|portifólio/.test(msg)) {
            return "Monte um portfólio online com seus projetos. Use plataformas como Behance, GitHub, Wix, Notion ou até um site próprio.";
        }
        if (/feedback|avaliacao|avaliação|retorno|comentario|comentário/.test(msg)) {
            return "Receber feedback é importante para o crescimento profissional. Ouça com atenção e busque evoluir.";
        }
        if (/tecnologia|programacao|programação|informática|digital|inovacao|inovação/.test(msg)) {
            return "O setor de tecnologia está em alta! Invista em cursos de programação, participe de comunidades e pratique com projetos próprios. Veja também Rocketseat, Digital Innovation One e Udemy.";
        }
        if (/mulher.*mercado|mercado.*mulher|diversidade|inclusao|inclusão|pcd|deficiencia|deficiência|lgbt|lgbtqia|negro|negra|etnia|minorias/.test(msg)) {
            return "Diversidade e inclusão são essenciais no mercado. Busque grupos de apoio e oportunidades afirmativas. Mulheres, PCDs, LGBTQIA+ e pessoas negras têm cada vez mais espaço e programas específicos. Veja PrograMaria, Pretalab, Transempregos e Indique uma Preta.";
        }
        if (/roupa entrevista|como se vestir|vestimenta|dress code|visual entrevista/.test(msg)) {
            return "Vista-se de forma adequada ao perfil da empresa. Prefira roupas discretas, limpas e bem passadas. O importante é estar confortável e confiante.";
        }
        if (/diferencial|meu diferencial|o que te destaca|ponto forte|pontos fortes/.test(msg)) {
            return "Seu diferencial pode ser uma habilidade, experiência, idioma ou atitude positiva. Pense no que você faz de melhor e destaque isso na entrevista.";
        }
        if (/objetivo profissional|objetivo de carreira|meta profissional/.test(msg)) {
            return "Seu objetivo profissional deve ser claro e alinhado com a vaga. Mostre onde quer chegar e como pode contribuir para a empresa.";
        }
        if (/demissao|demissão|fui demitido|perdi o emprego|mandado embora/.test(msg)) {
            return "Se foi demitido, seja honesto na entrevista, explique de forma breve e foque no que aprendeu e como está pronto para novos desafios.";
        }
        if (/recolocacao|recolocação|voltar ao mercado|retornar ao mercado/.test(msg)) {
            return "Para se recolocar, atualize seu currículo, faça networking, busque cursos e esteja aberto a novas oportunidades.";
        }
        if (/video entrevista|entrevista online|entrevista virtual|entrevista por video/.test(msg)) {
            return "Em entrevistas online, teste o equipamento antes, escolha um local silencioso e mantenha contato visual pela câmera.";
        }
        if (/negociar salario|negociar salário|negociar remuneração|negociar valor/.test(msg)) {
            return "Pesquise a média salarial da sua área, mostre seu valor e seja flexível. Negocie com respeito e clareza.";
        }
        if (/pedir aumento|solicitar aumento|aumento salarial/.test(msg)) {
            return "Mostre resultados, escolha o momento certo e seja claro sobre suas expectativas. Prepare argumentos sólidos.";
        }
        if (/pedir feedback|solicitar feedback|feedback entrevista/.test(msg)) {
            return "Seja educado e direto: 'Gostaria de um feedback para poder evoluir profissionalmente.'";
        }
        if (/chefe dificil|chefe difícil|gestor dificil|gestor difícil|chefe ruim|gestor ruim/.test(msg)) {
            return "Mantenha o profissionalismo, busque diálogo e foque em soluções. Se necessário, procure o RH.";
        }
        if (/crescer na empresa|subir de cargo|promoção|promocao/.test(msg)) {
            return "Mostre iniciativa, busque aprender sempre, entregue resultados e seja colaborativo.";
        }
        if (/mudar de area|mudança de área|transicao de carreira|transição de carreira/.test(msg)) {
            return "Invista em cursos, busque projetos voluntários e destaque habilidades transferíveis. Mostre vontade de aprender.";
        }
        if (/curriculo criativo|currículo criativo|curriculo diferente|currículo diferente/.test(msg)) {
            return "Use modelos diferenciados no Canva, mas mantenha a clareza e objetividade. Evite exageros.";
        }
        if (/fazer networking|ampliar networking|construir networking/.test(msg)) {
            return "Participe de eventos, grupos online, mantenha contato com colegas e seja proativo em ajudar os outros.";
        }
        if (/destacar no mercado|ser destaque|ser reconhecido/.test(msg)) {
            return "Busque aprendizado contínuo, desenvolva soft skills e construa um portfólio de resultados.";
        }
        if (/lidar com fracasso|fracassos|erro|erros/.test(msg)) {
            return "Fracassos fazem parte do crescimento. Aprenda com eles, ajuste sua rota e siga em frente com resiliência.";
        }
        if (/ser promovido|promoção|promocao/.test(msg)) {
            return "Entregue resultados, demonstre liderança, busque feedbacks e esteja sempre disposto a aprender.";
        }
        if (/montar portfólio|montar portfolio|criar portfólio|criar portfolio/.test(msg)) {
            return "Inclua seus melhores projetos, organize por área e use plataformas como Behance ou GitHub.";
        }
        if (/preparar para entrevista|preparação para entrevista|como se preparar para entrevista/.test(msg)) {
            return "Pesquise sobre a empresa, revise seu currículo, treine respostas e prepare perguntas para o entrevistador.";
        }

        // Agradecimento
        if (/obrigado|obrigada|valeu|agradecido|agradeço|grato|grata/.test(msg)) {
            return "De nada! Estou aqui para ajudar no que precisar.";
        }

        // Resposta para qualquer outra pergunta (IA real)
        if (msg.length > 3) {
            return `Ótima pergunta! Sou uma IA de carreira, entrevistas, currículo, vagas, LinkedIn, motivação, cursos, tecnologia, soft skills, networking, inclusão e dúvidas profissionais. Se sua pergunta for sobre esses temas, posso ajudar! Se não encontrar resposta, tente reformular ou peça dicas.<br>
            <b>Veja também:</b> <a href="https://www.vagas.com.br/profissoes/dicas-de-carreira" target="_blank">Vagas.com</a>, <a href="https://www.catho.com.br/carreira-sucesso/" target="_blank">Catho</a>, <a href="https://www.linkedin.com/pulse/como-melhorar-o-seu-linkedin-em-2023-lucas-cavalcante/" target="_blank">LinkedIn Dicas</a>, <a href="https://www.napratica.org.br/entrevista-de-emprego/" target="_blank">NaPrática</a>.`;
        }

        // Resposta padrão com links úteis
        return `Desculpe, não entendi perfeitamente. Você pode perguntar sobre currículo, entrevista, vagas, LinkedIn, simulação de entrevista, soft skills, carreira, cursos, salário, networking, portfólio, estágio, home office, tecnologia, inclusão ou pedir dicas.<br>
        Veja também dicas em <a href="https://www.vagas.com.br/profissoes/dicas-de-carreira" target="_blank">Vagas.com</a> e <a href="https://www.catho.com.br/carreira-sucesso/" target="_blank">Catho Carreira</a>.`;
    }

    // --- Voz da IA ---
    function speak(text) {
        stopVoice();
        if ('speechSynthesis' in window) {
            utter = new SpeechSynthesisUtterance(text.replace(/<[^>]+>/g, ''));
            utter.lang = 'pt-BR';
            utter.rate = 1.7;
            utter.pitch = 1.18;

            let voices = synth.getVoices();
            let voice = voices.find(v =>
                v.lang === 'pt-BR' && v.gender === 'female'
            );
            if (!voice) voice = voices.find(v =>
                v.lang === 'pt-BR' && /fem|mulher|female|Vitoria|Vitória|Maria|Helena|Camila|Luciana|Fernanda|Paulina|Sofia|Google|Microsoft/i.test(v.name)
            );
            if (!voice) voice = voices.find(v => v.lang === 'pt-BR');
            if (!voice) voice = voices.find(v => v.lang.startsWith('pt'));
            if (voice) utter.voice = voice;

            if (voices.length === 0) {
                synth.onvoiceschanged = () => {
                    let voices2 = synth.getVoices();
                    let voice2 = voices2.find(v =>
                        v.lang === 'pt-BR' && v.gender === 'female'
                    );
                    if (!voice2) voice2 = voices2.find(v =>
                        v.lang === 'pt-BR' && /fem|mulher|female|Vitoria|Vitória|Maria|Helena|Camila|Luciana|Fernanda|Paulina|Sofia|Google|Microsoft/i.test(v.name)
                    );
                    if (!voice2) voice2 = voices2.find(v => v.lang === 'pt-BR');
                    if (!voice2) voice2 = voices2.find(v => v.lang.startsWith('pt'));
                    if (voice2) utter.voice = voice2;
                    synth.speak(utter);
                };
            } else {
                synth.speak(utter);
            }
        }
    }

    function stopVoice() {
        if ('speechSynthesis' in window) {
            synth.cancel();
        }
    }
});

