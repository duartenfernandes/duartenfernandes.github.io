// A. Estado e referências ao DOM
const URL_BASE = "https://deisishop.pythonanywhere.com";

const divProdutos = document.querySelector("#produtos");
const divCesto = document.querySelector("#cesto");
const elTotal = document.querySelector("#total");
const selectCategorias = document.querySelector("#categorias");
const selectOrdenar = document.querySelector("#ordenar");
const inputPesquisa = document.querySelector("#pesquisa");
const checkEstudante = document.querySelector("#estudante");
const inputCupao = document.querySelector("#cupao");
const btnComprar = document.querySelector("#comprar");
const elResposta = document.querySelector("#resposta-compra");

let todosOsProdutos = []; // guardados após o fetch

if (localStorage.getItem("produtos-selecionados") === null) {
  localStorage.setItem("produtos-selecionados", JSON.stringify([]));
}

// B. Funções utilitárias
function lerCesto() {
  return JSON.parse(localStorage.getItem("produtos-selecionados")) || [];
}

function guardarCesto(lista) {
  localStorage.setItem("produtos-selecionados", JSON.stringify(lista));
}

function urlImagem(caminho) {
  if (caminho.startsWith("http")) return caminho;
  return URL_BASE + (caminho.startsWith("/") ? "" : "/") + caminho;
}

function criarProduto(produto) {
  const article = document.createElement("article");

  const titulo = document.createElement("h3");
  titulo.textContent = produto.title;

  const imagem = document.createElement("img");
  imagem.src = urlImagem(produto.image);
  imagem.alt = produto.title;

  const preco = document.createElement("p");
  preco.textContent = "Preço: " + produto.price.toFixed(2) + " €";

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
  imagem.src = urlImagem(produto.image);
  imagem.alt = produto.title;

  const preco = document.createElement("p");
  preco.textContent = "Preço: " + produto.price.toFixed(2) + " €";

  const botao = document.createElement("button");
  botao.textContent = "- Remover do Cesto";
  botao.addEventListener("click", () => removerDoCesto(produto));

  article.append(titulo, imagem, preco, botao);
  return article;
}

// C. Renderização e handlers
function renderizarProdutos(produtos) {
  divProdutos.innerHTML = "";

  if (produtos.length === 0) {
    divProdutos.textContent = "Nenhum produto encontrado.";
    return;
  }

  produtos.forEach(produto => divProdutos.append(criarProduto(produto)));
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
  if (indice !== -1) cesto.splice(indice, 1);
  guardarCesto(cesto);
  atualizaCesto();
}

function atualizaCesto() {
  const cesto = lerCesto();

  divCesto.innerHTML = "";
  cesto.forEach(produto => divCesto.append(criaProdutoCesto(produto)));

  const total = cesto.reduce((soma, p) => soma + p.price, 0);
  elTotal.textContent = "Custo total: " + total.toFixed(2) + " €";
}

// Aplica categoria + pesquisa + ordenação e volta a desenhar
function atualizarListaFiltrada() {
  let lista = [...todosOsProdutos]; // cópia, para não alterar o original

  const categoria = selectCategorias.value;
  if (categoria) {
    lista = lista.filter(p => p.category === categoria);
  }

  const texto = inputPesquisa.value.trim().toLowerCase();
  if (texto) {
    lista = lista.filter(p => p.title.toLowerCase().includes(texto));
  }

  if (selectOrdenar.value === "asc") {
    lista.sort((a, b) => a.price - b.price);
  } else if (selectOrdenar.value === "desc") {
    lista.sort((a, b) => b.price - a.price);
  }

  renderizarProdutos(lista);
}

async function comprar() {
  const cesto = lerCesto();

  if (cesto.length === 0) {
    elResposta.textContent = "O cesto está vazio!";
    return;
  }

  btnComprar.disabled = true;
  btnComprar.textContent = "A processar...";

  try {
    const resposta = await fetch(URL_BASE + "/buy/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        products: cesto.map(p => p.id),
        student: checkEstudante.checked,
        coupon: inputCupao.value.trim(),
        name: ""
      })
    });

    const dados = await resposta.json();
    console.log("Resposta da API:", dados);   // ver os nomes dos campos

    if (resposta.ok) {
      // a API pode chamar "totalCost" ou "total" ao valor final
      const total = Number(dados.totalCost ?? dados.total);
      
      elResposta.innerHTML =
        "<p class='valor-final'><strong>Valor final a pagar (com eventuais descontos): " +
        total.toFixed(2) + " €</strong></p>" +
        "<p class='referencia'>Referência de pagamento: " + dados.reference + "</p>";

      /*guardarCesto([]);
      atualizaCesto();*/
    } else {
      elResposta.textContent = "Erro: " + (dados.error || "Não foi possível concluir a compra.");
    }
  } catch (erro) {
    console.error(erro);
    elResposta.textContent = "Erro de rede. Tenta novamente.";
  } finally {
    btnComprar.disabled = false;
    btnComprar.textContent = "Comprar";
  }
}

// D. Event Listeners
selectCategorias.addEventListener("change", atualizarListaFiltrada);
selectOrdenar.addEventListener("change", atualizarListaFiltrada);
inputPesquisa.addEventListener("input", atualizarListaFiltrada);
btnComprar.addEventListener("click", comprar);

// E. Inicialização (AJAX com fetch)
async function carregarProdutos() {
  try {
    const resposta = await fetch(URL_BASE + "/products/");
    if (!resposta.ok) throw new Error("Erro ao carregar produtos");

    const dados = await resposta.json();

    // price vem como string na API: converter para número
    todosOsProdutos = dados.map(p => ({ ...p, price: Number(p.price) }));

    renderizarProdutos(todosOsProdutos);
  } catch (erro) {
    console.error("Erro ao obter produtos:", erro);
    divProdutos.textContent = "Erro ao carregar produtos da loja.";
  }
}

async function carregarCategorias() {
  try {
    const resposta = await fetch(URL_BASE + "/categories/");
    if (!resposta.ok) throw new Error("Erro ao carregar categorias");

    const categorias = await resposta.json();
    categorias.forEach(cat => {
      const opcao = document.createElement("option");
      opcao.value = cat.name;
      opcao.textContent = cat.name;
      selectCategorias.append(opcao);
    });
  } catch (erro) {
    console.error("Erro ao obter categorias:", erro);
  }
}

carregarProdutos();
carregarCategorias();
atualizaCesto();