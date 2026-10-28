// --- 1. Passa por aqui (com toggle) ---
const h2PassaRato = document.getElementById("passaRato");

h2PassaRato.addEventListener("mousemove", function() {
  // alterna uma classe CSS
  h2PassaRato.classList.toggle("ativo");

  // muda o texto conforme o estado
  if (h2PassaRato.classList.contains("ativo")) {
    h2PassaRato.textContent = "Obrigada por passares! 😄";
  } else {
    h2PassaRato.textContent = "1. Passa por aqui!";
  }
});


// --- 2. Pinta-me! (versão com querySelectorAll e data-color) ---
document.querySelectorAll("button.color").forEach((button) => {
  button.addEventListener("click", () => {
    const cor = button.dataset.color;
    const texto = document.getElementById("textoColorido");

    texto.style.color = cor;
  });
});


// --- 3. Experimenta escrever... ---
const inputTexto = document.getElementById("inputTexto");
const cores = ["lightcoral", "lightyellow", "lightblue", "lightgreen"];

let indiceCor = 0;

inputTexto.addEventListener("keydown", function() { 
  setTimeout(() => {
      if (inputTexto.value.length === 0) {
        // Se estiver vazio fundo branco
        inputTexto.style.backgroundColor = "white";
        indiceCor = 0;
      } else {
        // Alterna cor
        indiceCor = (indiceCor + 1) % cores.length;
        inputTexto.style.backgroundColor = cores[indiceCor];
      }
    }, 0);
});

/*
// --- 4. Escolha uma cor em inglês --- 
function submeterCor() {
  const cor = document.getElementById("corEscolhida").value.toLowerCase();
  document.body.style.backgroundColor = cor;
}
*/
/*
// --- 4. Escolha uma cor em inglês --- 
document.addEventListener('DOMContentLoaded', () => {
  // --- 4. Escolha uma cor em inglês ---
  submeterCor = () => {
    const cor = document.getElementById("corEscolhida").value.toLowerCase();
    document.body.style.backgroundColor = cor;
  };
});
*/

// --- 4. Escolha uma cor em inglês (this)--- 
document.querySelector('#cor').onchange = function() {
  document.body.style.backgroundColor = this.value;
};


// --- 5. Conta... --- no HTML

// --- 6. Formulário... --- no HTML

// --- Exercício 7: contador automático --- no HTML