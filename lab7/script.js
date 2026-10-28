
// A. Estado e variáveis com referência de elementos do DOM
const divProdutos = document.querySelector("#produtos");
const divCesto = document.querySelector("#cesto");
const elTotal = document.querySelector("#total");

// Cria a chave com lista vazia, caso ainda não exista
if (localStorage.getItem("produtos-selecionados") === null) {
  localStorage.setItem("produtos-selecionados", JSON.stringify([]));
}

// B. Funções utilitárias
function lerCesto() {
  return JSON.parse(localStorage.getItem("produtos-selecionados"));
}

function guardarCesto(lista) {
  localStorage.setItem("produtos-selecionados", JSON.stringify(lista));
}

function criarProduto(produto) {
    const article = document.createElement("article");

    const titulo = document.createElement("h3");
    titulo.textContent = produto.title;

    const imagem = document.createElement("img");
    imagem.src = produto.image;
    imagem.alt = produto.title;

    const preco = document.createElement("p");
    preco.textContent ="Custo total: " + produto.price + " €";

    const descricao = document.createElement("p");
    descricao.classList.add("descricao");
    descricao.textContent = produto.description;

    const botao = document.createElement("button");
    botao.textContent = "+ Adicionar ao Cesto";
    botao.addEventListener("click", () => adicionarAoCesto(produto));

    article.append(titulo, imagem, preco, descricao, botao);

    return article;
}

    function criaProdutoCesto(produto) {
    const article = document.createElement("article");

    const titulo = document.createElement("h3");
    titulo.textContent = produto.title;

    const imagem = document.createElement("img");
    imagem.src = produto.image;
    imagem.alt = produto.title;

    const preco = document.createElement("p");
    preco.textContent = "Custo total: " + produto.price + " €";

    const botao = document.createElement("button");
    botao.textContent = "- Remover do Cesto";
    botao.addEventListener("click", () => removerDoCesto(produto));

    article.append(titulo, imagem, preco, botao);
    return article;
    }

// C. Event handlers function renderizarProdutos(produtos) {
function renderizarProdutos(produtos) {
    produtos.forEach(produto => {
        const article = criarProduto(produto);
        divProdutos.append(article);
    });
}

function adicionarAoCesto(produto) {
  const cesto = lerCesto();
  cesto.push(produto);
  guardarCesto(cesto);
  atualizaCesto();
}

function removerDoCesto(produto) {
  const cesto = lerCesto();
  const indice = cesto.findIndex(p => p.id === produto.id);
  if (indice !== -1) {
    cesto.splice(indice, 1); // remove só 1 elemento nessa posição
  }
  guardarCesto(cesto);
  atualizaCesto();
}

function atualizaCesto() {
  const cesto = lerCesto();

  divCesto.innerHTML = ""; // limpa antes de voltar a desenhar
  cesto.forEach(produto => {
    divCesto.append(criaProdutoCesto(produto));
  });

  const total = cesto.reduce((soma, p) => soma + p.price, 0);
  elTotal.textContent = "Custo total: " + total.toFixed(2) + " €";
}

// D. Event Listeners
 
// E. Inicialização
renderizarProdutos(produtos);
atualizaCesto();