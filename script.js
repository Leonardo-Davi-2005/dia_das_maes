document.addEventListener("DOMContentLoaded", function () {

    const botao = document.getElementById("botao-surpresa");
    const mensagem = document.getElementById("mensagem-surpresa");
    const musica = document.getElementById("musica");

    if (!botao || !mensagem || !musica) return;

    let coracoesAtivos = false;

    const texto = `Mãe,

eu tava pensando em tudo que você já fez por mim… e percebi que eu nunca te agradeci do jeito certo.

Você sempre esteve do meu lado, mesmo nos momentos difíceis.

Eu posso não falar sempre, mas eu te amo muito.

Feliz Dia das Mães ❤️`;

    function efeitoDigitando(elemento, texto) {
        let i = 0;
        elemento.innerHTML = '<span id="cursor">|</span>';

        function digitar() {
            if (i < texto.length) {
                const char = texto.charAt(i);

                const cursor = document.getElementById("cursor");

                // adiciona letra antes do cursor
                cursor.insertAdjacentHTML(
                    "beforebegin",
                    char === "\n" ? "<br>" : char
                );

                i++;

                // 👇 velocidade variável (parece humano)
                let velocidade = Math.random() * 60 + 20;

                // pausas naturais
                if (char === "." || char === "!" || char === "?") {
                    velocidade += 400;
                } else if (char === ",") {
                    velocidade += 200;
                }

                // scroll automático
                elemento.scrollIntoView({
                    behavior: "smooth",
                    block: "end"
                });

                setTimeout(digitar, velocidade);
            }
        }

        digitar();
    }

    botao.addEventListener("click", function () {

        mensagem.style.display = "block";
        mensagem.style.opacity = "1"; // não precisa mais fade manual

        // efeito digitando
        efeitoDigitando(mensagem, texto);

        // música com entrada suave
        musica.volume = 0;
        musica.currentTime = 15; // começa numa parte melhor

        setTimeout(() => {
            musica.play().catch(() => { });
        }, 300);

        let volume = 0;
        const fadeAudio = setInterval(() => {
            if (volume >= 0.25) {
                clearInterval(fadeAudio);
            } else {
                volume = Math.min(volume + 0.02, 0.25);
                musica.volume = volume;
            }
        }, 200);

        // corações
        if (!coracoesAtivos) {
            const intervalo = setInterval(criarCoracao, 500);

            setTimeout(() => {
                clearInterval(intervalo);
            }, 10000);

            coracoesAtivos = true;
        }

        botao.innerText = "Eu te amo ❤️";
        botao.disabled = true;
    });

    function criarCoracao() {
        const container = document.querySelector(".hearts");
        if (!container) return;

        const heart = document.createElement("div");
        heart.classList.add("heart");

        const emojis = ["❤️", "💖", "💕", "💗"];
        heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (Math.random() * 25 + 10) + "px";

        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 4000);
    }

});