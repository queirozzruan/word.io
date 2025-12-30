const game = new Wordio();
const tabuleiroElement = document.getElementById("board");
const tecladoElement = document.getElementById("keyboard");
const TECLAS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

function iniciarGame() {
  if (!tabuleiroElement || !tecladoElement) return;
  criarTabuleiro();
  criarTeclado();
}

function criarTabuleiro() {
  for (let i = 0; i < 6; i++) {
    let linha = document.createElement("div");
    linha.className = "row";
    for (let j = 0; j < 5; j++) {
      let celula = document.createElement("div");
      celula.className = "tile";
      celula.id = `celula-${i}-${j}`;
      linha.appendChild(celula);
    }
    tabuleiroElement.appendChild(linha);
  }
}

function criarTeclado() {
  TECLAS.forEach((fileira) => {
    const linhaDiv = document.createElement("div");
    linhaDiv.className = "key-row";
    fileira.forEach((key) => {
      const btn = document.createElement("button");
      btn.textContent = key === "BACKSPACE" ? "⌫" : key;
      btn.className = "key";
      if (key === "ENTER" || key === "BACKSPACE") btn.classList.add("wide");
      btn.dataset.key = key;
      btn.onclick = () => processarEntrada(key);
      linhaDiv.appendChild(btn);
    });
    tecladoElement.appendChild(linhaDiv);
  });
}

function processarEntrada(key) {
  if (game.fimdeJogo) return;

  if (key === "ENTER") {
    const linhaIdx = game.tentativas.length;
    const resultado = game.submeterTentativa();
    if (resultado) animarLinha(linhaIdx, resultado);
  } else if (key === "BACKSPACE" || key === "⌫") {
    game.tentativaAtual = game.tentativaAtual.slice(0, -1);
  } else if (game.tentativaAtual.length < 5 && /^[a-zA-Z]$/.test(key)) {
    game.tentativaAtual += key.toUpperCase();
  }
  mostrarTentativaAtual();
}

document.addEventListener("keydown", (e) => {
  const key =
    e.key === "Enter" ? "ENTER" : e.key === "Backspace" ? "BACKSPACE" : e.key;
  processarEntrada(key);
});

function mostrarTentativaAtual() {
  const linhaIdx = game.tentativas.length;
  if (linhaIdx >= 6) return;
  for (let i = 0; i < 5; i++) {
    const celula = document.getElementById(`celula-${linhaIdx}-${i}`);
    if (celula) celula.textContent = game.tentativaAtual[i] || "";
  }
}

function animarLinha(linhaIdx, resultado) {
  const palavraTentada = game.tentativas[linhaIdx].palalavra;
  resultado.forEach((status, i) => {
    const celula = document.getElementById(`celula-${linhaIdx}-${i}`);
    setTimeout(() => {
      celula.classList.add("flip");
      setTimeout(() => {
        celula.classList.remove("flip");
        celula.classList.add("reveal", status);
        atualizarTecla(palavraTentada[i], status);
      }, 250);
    }, i * 150);
  });

  setTimeout(() => {
    if (game.fimdeJogo) {
      alert(
        game.tentativas[game.tentativas.length - 1].palalavra ===
          game.palavraCorreta
          ? "Parabéns! Você acertou!"
          : `Fim de jogo! A palavra era: ${game.palavraCorreta}`
      );
    }
  }, 1500);
}

function atualizarTecla(letra, status) {
  const btn = document.querySelector(`[data-key='${letra}']`);
  if (!btn) return;
  if (btn.classList.contains("correto")) return;
  if (btn.classList.contains("presente") && status === "incorreto") return;
  btn.classList.remove("presente", "incorreto");
  btn.classList.add(status);
}

window.addEventListener("DOMContentLoaded", iniciarGame);
