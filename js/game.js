class Wordio {
  constructor() {
    this.palavraCorreta =
      palavras[Math.floor(Math.random() * palavras.length)].toUpperCase();
    this.tentativaAtual = "";
    this.tentativas = [];
    this.maxTentativas = 6;
    this.fimdeJogo = false;
  }

  submeterTentativa() {
    if (this.tentativaAtual.length !== 5) return null;
    const resultado = this.checarTentativa(this.tentativaAtual);
    this.tentativas.push({ palalavra: this.tentativaAtual, resultado });

    if (
      this.tentativaAtual === this.palavraCorreta ||
      this.tentativas.length >= this.maxTentativas
    ) {
      this.fimdeJogo = true;
    }

    this.tentativaAtual = "";
    return resultado;
  }

  checarTentativa(tentativa) {
    const resultado = Array(5).fill("incorreto");
    const palavraCorretaArray = this.palavraCorreta.split("");
    const tentativaArray = tentativa.split(""); // Adicionado esta linha que faltava

    // Verdes
    tentativaArray.forEach((char, i) => {
      if (char === palavraCorretaArray[i]) {
        resultado[i] = "correto";
        palavraCorretaArray[i] = null;
      }
    });

    // Amarelos
    tentativaArray.forEach((char, i) => {
      if (resultado[i] !== "correto" && palavraCorretaArray.includes(char)) {
        resultado[i] = "presente";
        palavraCorretaArray[palavraCorretaArray.indexOf(char)] = null;
      }
    });

    return resultado;
  }
}
