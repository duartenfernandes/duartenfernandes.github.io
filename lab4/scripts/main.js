let contador = 33;

// --- 2. Pinta-me!... ---
function mudarCor(cor) {
  document.getElementById("textoColorido").style.color = cor;
}

/*
function mudarCorInput() {
  document.getElementById("inputTexto").style.backgroundColor = "#f0e68c";
}
*/

// --- 3. Experimenta escrever... ---
// Lista de cores para o fundo do input
const cores = ["lightcoral", "lightyellow", "lightblue"];

const inputTexto = document.getElementById("inputTexto");

// Evento que reage a cada alteração no texto
inputTexto.addEventListener("input", function () {
  const tamanho = inputTexto.value.length;

  if (tamanho === 0) {
    // Se o campo estiver vazio, volta à cor original
    inputTexto.style.backgroundColor = "white";
  } else {
    // Muda a cor de fundo conforme o número de caracteres
    const corAtual = cores[(tamanho - 1) % cores.length];
    inputTexto.style.backgroundColor = corAtual;
  }
});

// --- 4. Escolher uma cor em inglês ... ---
function submeterCor() {
  const cor = document.getElementById("corEscolhida").value.toLowerCase();
  document.body.style.backgroundColor = cor;
}

// --- 5. Conta ---
function incrementarContador() {
  contador++;
  document.getElementById("contador").textContent = contador;
}

// --- 6. Imagem... ---
function ampliarImagem() {
  document.getElementById("foto").style.transform = "scale(1.2)";
}

function reduzirImagem() {
  document.getElementById("foto").style.transform = "scale(1)";
}

// --- 1. Passa por aqui! ---
document.getElementById("passaRato").onmousemove = function() {
  this.textContent = "Obrigada por passares! 😄";
};
document.getElementById("passaRato").onmouseout = function() {
  this.textContent = "1. Passa por aqui!";
};