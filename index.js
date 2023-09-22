class JogoDaForca {
    constructor() {
        this.palavras = ["JAVASCRIPT", "PYTHON", "HTML", "CSS", "NODEJS", "REACT", "JAVA", "PHP", "RUBY", "C"];
        this.palavra = "";
        this.tentativasMaximas = 7;
        this.tentativas = 0;
        this.letrasTentadas = [];
        this.palavraEscondida = "";
        this.canvas = document.getElementById("canvas-forca");
        this.context = this.canvas.getContext("2d");
        this.iniciarDesenhoForca();
        this.criarTecladoQWERTY();
        this.escolherPalavraAleatoria();
    }

    iniciarDesenhoForca() {
        const context = this.context;
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        context.lineWidth = 2;
        context.strokeStyle = "#333";
//parte de cima
        context.beginPath();
        context.moveTo(20, 20);
        context.lineTo(100, 20);
        context.stroke();
        context.closePath();
//base
        context.beginPath();
        context.moveTo(0, 180);
        context.lineTo(120, 180);
        context.stroke();

        context.beginPath();
        context.moveTo(22, 180);
        context.lineTo(22, 20);
        context.stroke();

        if (this.tentativas >= 1) {
            context.beginPath();
            context.moveTo(100, 20);
            context.lineTo(100, 40);
            context.stroke();
        }

        if (this.tentativas >= 2) {
            context.beginPath();
            context.arc(100, 55, 15, 0, Math.PI * 2);
            context.stroke();
        }

        if (this.tentativas >= 3) {
            context.beginPath();
            context.moveTo(100, 70);
            context.lineTo(100, 120);
            context.stroke();
        }

        if (this.tentativas >= 4) {
            context.beginPath();
            context.moveTo(100, 80);
            context.lineTo(80, 100);
            context.stroke();
        }

        if (this.tentativas >= 5) {
            context.beginPath();
            context.moveTo(100, 80);
            context.lineTo(120, 100);
            context.stroke();
        }

        if (this.tentativas >= 6) {
            context.beginPath();
            context.moveTo(100, 120);
            context.lineTo(80, 140);
            context.stroke();
        }

        if (this.tentativas >= 7) {
            context.beginPath();
            context.moveTo(100, 120);
            context.lineTo(120, 140);
            context.stroke();
        }
    }
    criarTecladoQWERTY() {
        const tecladoDiv = document.getElementById("teclado");
        const rows = [
            ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
            ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
            ["Z", "X", "C", "V", "B", "N", "M"]
        ];

        rows.forEach(row => {
            const rowDiv = document.createElement("div");
            rowDiv.classList.add("row");
            row.forEach(letra => {
                const button = document.createElement("button");
                button.textContent = letra;
                button.addEventListener("click", () => {
                    this.tentarLetra(letra);
                });
                rowDiv.appendChild(button);
            });
            tecladoDiv.appendChild(rowDiv);
        });
    }


    escolherPalavraAleatoria() {
        const indiceAleatorio = Math.floor(Math.random() * this.palavras.length);
        this.palavra = this.palavras[indiceAleatorio].toUpperCase();
        this.palavraEscondida = this.esconderPalavra();
        this.atualizarInterface();
    }

    esconderPalavra() {
        return this.palavra.replace(/[A-Z]/g, "_");
    }

    tentarLetra(letra) {
        letra = letra.toUpperCase();
        if (!this.ehLetraValida(letra)) {
            alert("Por favor, insira uma letra válida.");
            return;
        }

        if (this.letrasTentadas.includes(letra)) {
            alert("Você já tentou essa letra antes.");
            return;
        }

        this.letrasTentadas.push(letra);

        if (this.palavra.includes(letra)) {
            this.atualizarPalavraEscondida(letra);
        } else {
            this.tentativas++;
        }

        this.atualizarInterface();
        this.iniciarDesenhoForca();
        this.verificarFimDeJogo();
    }

    ehLetraValida(letra) {
        return /^[A-Z]$/.test(letra);
    }

    atualizarPalavraEscondida(letra) {
        const palavraArray = this.palavra.split('');
        for (let i = 0; i < palavraArray.length; i++) {
            if (palavraArray[i] === letra) {
                this.palavraEscondida = this.palavraEscondida.substring(0, i) + letra + this.palavraEscondida.substring(i + 1);
            }
        }
    }

    atualizarInterface() {
        document.getElementById("palavra-escondida").textContent = this.palavraEscondida;
        document.getElementById("tentativas").textContent = "Tentativas restantes: " + (this.tentativasMaximas - this.tentativas);
    }

    verificarFimDeJogo() {
        if (this.palavraEscondida === this.palavra) {
            alert("Parabéns! Você ganhou. A palavra era: " + this.palavra);
            this.reiniciarJogo();
        } else if (this.tentativas === this.tentativasMaximas) {
            alert("Você perdeu! A palavra era: " + this.palavra);
            this.reiniciarJogo();
        }
    }

    reiniciarJogo() {
        this.tentativas = 0;
        this.letrasTentadas = [];
        this.iniciarDesenhoForca();
        this.escolherPalavraAleatoria();
    }
}

const jogo = new JogoDaForca();
jogo.atualizarInterface();
