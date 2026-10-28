// A. declaração de variáveis
const nodeForm = document.querySelector("#registo form");
const nodeInputNumero = document.querySelector("#registo input[type='number']");
const nodeInputSubmit = document.querySelector("#registo input[type='submit']");

const nodeUlColecao = document.querySelector("#colecao ul");
const nodeTotalColecao = document.querySelector("#colecao h3 span");

const nodeUlRepetidos = document.querySelector("#repetidos ul");
const nodeTotalRepetidos = document.querySelector("#repetidos h3 span");

// Passo 4 (localStorage): tenta ler o guardado; se não existir, começa com lista vazia
const colecao = JSON.parse(localStorage.getItem("colecao")) || [];
const repetidos = JSON.parse(localStorage.getItem("repetidos")) || [];

// B. event handlers
function guardaCarta() {
    const numero = Number(nodeInputNumero.value);

    if (colecao.includes(numero)) {
        repetidos.push(numero);
        repetidos.sort((a, b) => a - b);
    } else {
        colecao.push(numero);
        colecao.sort((a, b) => a - b);
    }

    guardaNoStorage();
    atualizaLista(colecao, nodeUlColecao);
    atualizaLista(repetidos, nodeUlRepetidos);

    nodeInputNumero.value = "";
    nodeInputNumero.focus();
}

function atualizaLista(lista, nodeUl) {
    nodeUl.innerHTML = "";   // apaga o conteúdo anterior

    if (lista === repetidos) {
        lista.forEach((numero) => {
            nodeUl.innerHTML += `<li>${numero} <button class="eliminar" data-numero="${numero}">Eliminar</button></li>`;
        });
        nodeTotalRepetidos.textContent = lista.length;
        ligaBotoesEliminar();   // os botões foram recriados, é preciso voltar a ligá-los
    } else {
        lista.forEach((numero) => {
            nodeUl.innerHTML += `<li>${numero}</li>`;
        });
        nodeTotalColecao.textContent = lista.length;
    }
}

function eliminaRepetido(numero) {
    const posicao = repetidos.indexOf(numero);
    repetidos.splice(posicao, 1);   // remove apenas UMA ocorrência

    guardaNoStorage();
    atualizaLista(repetidos, nodeUlRepetidos);
}

function ligaBotoesEliminar() {
    const botoes = document.querySelectorAll("#repetidos .eliminar");
    botoes.forEach((botao) => {
        botao.onclick = () => {
            eliminaRepetido(Number(botao.dataset.numero));
        };
    });
}

function guardaNoStorage() {
    localStorage.setItem("colecao", JSON.stringify(colecao));
    localStorage.setItem("repetidos", JSON.stringify(repetidos));
}


// C. event listeners
nodeForm.onsubmit = (event) => {
    event.preventDefault();   // impede o reload da página
    guardaCarta();
};

// ao abrir a página, mostra o que estava guardado
atualizaLista(colecao, nodeUlColecao);
atualizaLista(repetidos, nodeUlRepetidos);