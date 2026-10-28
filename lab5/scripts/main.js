// ===== Parte 1: Eventos 1.0 =====
function entra() {
    document.querySelector("#passa").textContent = "Obrigado!";
}
function sai() {
    document.querySelector("#passa").textContent = "Passe aqui!";
}

const cores = ["lightblue", "lightgreen", "lightpink", "khaki"];
let indiceCor = 0;
function mudaCorInput() {
    document.querySelector("#texto").style.backgroundColor = cores[indiceCor];
    indiceCor = (indiceCor + 1) % cores.length;
}

// ===== Parte 2: Eventos 2.0 =====
let total = 0;
const conta = () => {                       // arrow function (só esta versão)
    total++;
    document.querySelector("#contador").textContent = total;
};

document.addEventListener("DOMContentLoaded", () => {
    // querySelectorAll + dataset
    document.querySelectorAll("button.color").forEach((botao) => {
        botao.onclick = () => {
            document.querySelector("#pinta").style.color = botao.dataset.color;
        };
    });

    // select + this
    document.querySelector("#corFundo").addEventListener("change", function () {
        document.body.style.backgroundColor = this.value;
    });

    // select flex
    document.querySelector("#direcao").onchange = function () {
        document.querySelector("#caixa").style.flexDirection = this.value;
    };

    // formulário
    document.querySelector("#formUser").onsubmit = (e) => {
        e.preventDefault();
        const nome = document.querySelector("#nome").value;
        const idade = document.querySelector("#idade").value;
        document.querySelector("#mensagem").textContent = `Olá, o ${nome} tem ${idade}!`;
    };
});

// ===== localStorage =====
// A. variáveis
const nodeValor = document.querySelector("#valor");
let contadorGuardado = Number(localStorage.getItem("contadorGuardado")) || 0;

// B. event handlers
const mostra = () => {
    nodeValor.textContent = contadorGuardado;
    localStorage.setItem("contadorGuardado", contadorGuardado);
};
const incrementa = () => { contadorGuardado++; mostra(); };
const decrementa = () => { contadorGuardado--; mostra(); };
const reset      = () => { contadorGuardado = 0; mostra(); };

// C. event listeners
document.querySelector("#inc").onclick = incrementa;
document.querySelector("#dec").onclick = decrementa;
document.querySelector("#reset").onclick = reset;

mostra();

// ===== setInterval =====
let segundos = 0;
const contaAuto = () => {
    segundos++;
    document.querySelector("#auto").textContent = segundos;
};
setInterval(contaAuto, 1000);