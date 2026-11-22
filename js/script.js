/*
 * script.js - Portfólio Pessoal (Aulas 9 a 12 unificadas em um só arquivo)
 *
 * Tema: Portfólio Pessoal - esforço estimado dos meus projetos
 * Padrão: evento -> atualiza os dados -> redesenha (lista, gráfico e resumo)
 *
 * Entrada: filtros da tela (busca, categoria, horas mínimas, somente favoritos),
 *   cliques nos botões da lista e o formulário "Adicionar projeto"
 * Processamento: converter horas em semanas, classificar o esforço (rápido, médio
 *   ou longo), filtrar, somar horas, contar projetos longos e achar o de mais horas
 * Saída: lista de cartões, gráfico de barras em SVG e uma linha de resumo
 *   que o leitor de tela anuncia (aria-live)
 *
 * Pseudocódigo:
 *   1. Declarar o array de projetos (a fonte de verdade da tela)
 *   2. Ler os filtros e validar as horas mínimas (Number + faixa de 0 a 100)
 *   3. Para cada projeto: estimar semanas e classificar o esforço
 *   4. Filtrar os projetos que combinam com a busca, a categoria e o mínimo
 *   5. Para cada projeto visível: somar horas, contar longos, guardar o maior
 *   6. Redesenhar lista, gráfico e resumo a partir do resultado
 *   7. A cada evento (clique, digitação, envio): alterar os dados e voltar ao passo 2
 *
 * Teste de mesa (sem filtros), três primeiras voltas do for...of de calcularResumo:
 *   volta | projeto             | horas | semanas | faixa | totalHoras | longos | maisHoras
 *   ------+---------------------+-------+---------+-------+------------+--------+----------
 *     1   | Portfólio Pessoal   |  80   |    8    | longo |     80     |   1    | Portfólio
 *     2   | Quadro 616          |  25   |    3    | longo |    105     |   2    | Portfólio
 *     3   | Quiz FLA            |  18   |    2    | médio |    123     |   2    | Portfólio
 *
 * Testes no console (antes de ligar na página):
 *   estimarSemanas(25)        -> 3
 *   estimarSemanas(25, 5)     -> 5
 *   estimarSemanas(8)         -> 1
 *   classificarEsforco(1)     -> "rapido"
 *   classificarEsforco(2)     -> "medio"
 *   classificarEsforco(3)     -> "longo"
 */

/* ---------- Dados (fonte de verdade) ---------- */

// Cada projeto tem id, nome, horas, ano, categoria e favorito.
// O array é const, mas seu conteúdo muda (push e splice): const protege a variável, não os itens.
const projetos = [
  { id: 1, nome: "Portfólio Pessoal", horas: 80, ano: 2026, categoria: "web", favorito: false },
  { id: 2, nome: "Quadro 616", horas: 25, ano: 2026, categoria: "web", favorito: false },
  { id: 3, nome: "Quiz FLA", horas: 18, ano: 2026, categoria: "web", favorito: false },
  { id: 4, nome: "Cassino Casa Blanca", horas: 12, ano: 2026, categoria: "python", favorito: false },
  { id: 5, nome: "Gerenciador de Campeonato", horas: 8, ano: 2026, categoria: "c", favorito: false },
];

let proximoId = projetos.length + 1;

const rotulos = { rapido: "Rápido", medio: "Médio", longo: "Longo" };

/* ---------- Elementos da página (selecionados uma vez) ---------- */

const listaEl = document.querySelector("#lista-projetos");
const graficoEl = document.querySelector("#grafico");
const resumoEl = document.querySelector("#resumo");
const vazioEl = document.querySelector("#vazio");
const avisoFiltrosEl = document.querySelector("#aviso-filtros");
const campoBusca = document.querySelector("#busca");
const campoCategoria = document.querySelector("#filtro-categoria");
const campoMinimo = document.querySelector("#minimo-horas");
const botaoFavoritos = document.querySelector("#somente-favoritos");

/* ---------- Funções que calculam (não mexem na página) ---------- */

// Processa: converte horas em semanas. horasPorSemana tem valor padrão.
function estimarSemanas(horas, horasPorSemana = 10) {
  return Math.ceil(horas / horasPorSemana);
}

// Classifica: devolve a faixa em três níveis (da menor para a maior).
// A ordem das condições importa: a mais restrita vem primeiro.
function classificarEsforco(semanas) {
  if (semanas <= 1) {
    return "rapido";
  } else if (semanas <= 2) {
    return "medio";
  } else {
    return "longo";
  }
}

// switch: uma descrição diferente para cada categoria, com break e default.
function descreverCategoria(categoria) {
  let texto;

  switch (categoria) {
    case "web":
      texto = "Front-end (HTML, CSS e JS)";
      break;
    case "python":
      texto = "Python";
      break;
    case "c":
      texto = "Linguagem C";
      break;
    default:
      texto = "Outra categoria";
      break;
  }

  return texto;
}

// Remove acentos e põe em minúsculas, para "portfolio" achar "Portfólio".
function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

// Converte a entrada de horas mínimas com Number() e valida:
// vazio, texto não numérico e fora da faixa. Devolve { valor, erro }.
function lerMinimoHoras() {
  const texto = campoMinimo.value.trim();

  if (texto === "") {
    return { valor: 0, erro: "" };
  }

  const numero = Number(texto);

  if (Number.isNaN(numero)) {
    return { valor: 0, erro: "Digite um número em horas mínimas." };
  }
  if (numero < 0 || numero > 100) {
    return { valor: 0, erro: "As horas mínimas precisam estar entre 0 e 100." };
  }

  return { valor: numero, erro: "" };
}

// map: gera uma NOVA lista com o resultado de cada item (não altera a original).
function analisarProjetos(lista, horasPorSemana) {
  return lista.map((projeto) => {
    const semanas = estimarSemanas(projeto.horas, horasPorSemana);
    return { ...projeto, semanas, faixa: classificarEsforco(semanas) };
  });
}

// filter: separa só os projetos que combinam com todos os filtros.
function filtrarProjetos(lista, filtros) {
  return lista.filter((projeto) => {
    const nomeCombina = normalizar(projeto.nome).includes(filtros.busca);
    const categoriaCombina = filtros.categoria === "todas" || projeto.categoria === filtros.categoria;
    const horasCombinam = projeto.horas >= filtros.minimo;
    const favoritoCombina = !filtros.somenteFavoritos || projeto.favorito;

    return nomeCombina && categoriaCombina && horasCombinam && favoritoCombina;
  });
}

// for...of com acumulador, contador e máximo.
function calcularResumo(lista) {
  // ESCOPO LOCAL: totalHoras, longos e maisHoras só existem dentro desta função
  // (let/const têm escopo de bloco). Fora dela, ninguém consegue alterá-las por engano.
  // Já `projetos` é global do arquivo e, por isso, não é usada aqui: a função só
  // enxerga o que recebe em `lista`, o que a torna fácil de testar no console.
  let totalHoras = 0; // acumulador
  let longos = 0; // contador
  let maisHoras = null; // máximo

  for (const projeto of lista) {
    totalHoras += projeto.horas;

    if (projeto.faixa === "longo") {
      longos++;
    }
    if (maisHoras === null || projeto.horas > maisHoras.horas) {
      maisHoras = projeto;
    }
  }

  const favoritos = lista.filter((projeto) => projeto.favorito).length;

  return { totalHoras, longos, maisHoras, favoritos };
}

// Formata o resumo em uma frase (template literal).
function montarResumo(resumo, quantidade) {
  if (quantidade === 0) {
    return "Nenhum projeto para mostrar com os filtros atuais.";
  }

  return (
    `${quantidade} de ${projetos.length} projetos · ${resumo.totalHoras} h no total · ` +
    `${resumo.longos} de esforço longo · mais horas: ${resumo.maisHoras.nome} (${resumo.maisHoras.horas} h) · ` +
    `${resumo.favoritos} favorito(s).`
  );
}

// do...while: o laço roda ao menos uma vez e sobe o limite do eixo de 20 em 20 horas
// até caber o maior valor. A condição é atualizada dentro do bloco (limite += 20).
function calcularLimiteEixo(maiorHoras) {
  let limite = 0;

  do {
    limite += 20;
  } while (limite < maiorHoras);

  return limite;
}

/* ---------- Funções que MEXEM NA PÁGINA ---------- */

// Monta o elemento de um item (textContent evita innerHTML com dados digitados).
function criarElementoProjeto(item) {
  const li = document.createElement("li");
  li.classList.add("projeto", `faixa-${item.faixa}`);

  const titulo = document.createElement("h3");
  titulo.textContent = item.nome;

  const detalhe = document.createElement("p");
  detalhe.textContent = `${item.horas} h · ${item.semanas} semana(s) · esforço ${rotulos[item.faixa]}`;

  const tipo = document.createElement("p");
  tipo.textContent = descreverCategoria(item.categoria);

  const acoes = document.createElement("div");
  acoes.classList.add("acoes");

  // data-acao e data-id dizem ao ouvinte da lista o que fazer e com qual projeto.
  const botaoFavorito = document.createElement("button");
  botaoFavorito.type = "button";
  botaoFavorito.classList.add("botao-item");
  botaoFavorito.dataset.acao = "favoritar";
  botaoFavorito.dataset.id = item.id;
  botaoFavorito.setAttribute("aria-pressed", String(item.favorito));
  botaoFavorito.setAttribute("aria-label", `Favorito: ${item.nome}`);
  botaoFavorito.textContent = "Favorito";

  const botaoRemover = document.createElement("button");
  botaoRemover.type = "button";
  botaoRemover.classList.add("botao-item");
  botaoRemover.dataset.acao = "remover";
  botaoRemover.dataset.id = item.id;
  botaoRemover.setAttribute("aria-label", `Remover ${item.nome}`);
  botaoRemover.textContent = "Remover";

  acoes.append(botaoFavorito, botaoRemover);
  li.append(titulo, detalhe, tipo, acoes);
  return li;
}

function desenharLista(lista) {
  // replaceChildren troca todo o conteúdo de uma vez, sem sobrar item antigo.
  listaEl.replaceChildren(...lista.map(criarElementoProjeto));
  vazioEl.hidden = lista.length > 0;
}

/* ---------- Gráfico em SVG ---------- */

const NS_SVG = "http://www.w3.org/2000/svg";

// Cria um elemento SVG com atributos (SVG exige createElementNS).
function criarSvg(tag, atributos = {}, texto) {
  const elemento = document.createElementNS(NS_SVG, tag);

  for (const [chave, valor] of Object.entries(atributos)) {
    elemento.setAttribute(chave, valor);
  }
  if (texto !== undefined) {
    elemento.textContent = texto;
  }

  return elemento;
}

function desenharGrafico(lista) {
  const LARGURA = 400;
  const MARGEM = 8;
  const AREA_BARRA = 250; // largura máxima de uma barra
  const ALTURA_LINHA = 44;
  const TOPO = 8;
  const ALTURA_EIXO = 30;

  // reduce: acha o maior valor para calcular a escala do eixo.
  const maiorHoras = lista.reduce((maior, projeto) => Math.max(maior, projeto.horas), 0);
  const limite = calcularLimiteEixo(maiorHoras);

  const alturaTotal = lista.length === 0 ? 64 : TOPO + lista.length * ALTURA_LINHA + ALTURA_EIXO;
  graficoEl.setAttribute("viewBox", `0 0 ${LARGURA} ${alturaTotal}`);

  const descricao =
    lista.length === 0
      ? "Nenhum projeto para mostrar."
      : lista.map((projeto) => `${projeto.nome}: ${projeto.horas} horas`).join("; ");

  const filhos = [
    criarSvg("title", { id: "grafico-titulo" }, "Horas dedicadas por projeto"),
    criarSvg("desc", { id: "grafico-desc" }, descricao),
  ];

  if (lista.length === 0) {
    filhos.push(criarSvg("text", { x: MARGEM, y: 34, class: "grafico-rotulo" }, "Nenhum projeto para mostrar."));
    graficoEl.replaceChildren(...filhos);
    return;
  }

  const linhaEixo = TOPO + lista.length * ALTURA_LINHA;
  const marcas = [0, limite / 2, limite];

  // Linhas de grade e números do eixo (0, metade e limite).
  marcas.forEach((valor, indice) => {
    const x = MARGEM + (valor / limite) * AREA_BARRA;
    filhos.push(criarSvg("line", { x1: x, y1: TOPO, x2: x, y2: linhaEixo, class: "grafico-grade" }));
    filhos.push(
      criarSvg(
        "text",
        { x, y: linhaEixo + 20, class: "grafico-eixo-texto", "text-anchor": indice === 0 ? "start" : "middle" },
        `${valor} h`
      )
    );
  });

  // Uma barra por projeto, com o nome em cima e o valor ao lado.
  lista.forEach((projeto, indice) => {
    const y = TOPO + indice * ALTURA_LINHA;
    const largura = (projeto.horas / limite) * AREA_BARRA;

    filhos.push(criarSvg("text", { x: MARGEM, y: y + 15, class: "grafico-rotulo" }, projeto.nome));
    filhos.push(
      criarSvg("rect", {
        x: MARGEM,
        y: y + 21,
        width: largura,
        height: 14,
        rx: 3,
        class: `barra faixa-${projeto.faixa}`,
      })
    );
    filhos.push(
      criarSvg(
        "text",
        { x: MARGEM + largura + 6, y: y + 33, class: "grafico-valor" },
        `${projeto.horas} h · ${rotulos[projeto.faixa]}`
      )
    );
  });

  filhos.push(criarSvg("line", { x1: MARGEM, y1: linhaEixo, x2: MARGEM + AREA_BARRA, y2: linhaEixo, class: "grafico-eixo" }));

  graficoEl.replaceChildren(...filhos);
}

/* ---------- Redesenho central ---------- */

function lerFiltros() {
  const minimo = lerMinimoHoras();

  return {
    busca: normalizar(campoBusca.value.trim()),
    categoria: campoCategoria.value,
    minimo: minimo.valor,
    somenteFavoritos: botaoFavoritos.getAttribute("aria-pressed") === "true",
    erro: minimo.erro,
  };
}

function mostrarMensagem(elemento, texto, ehErro = false) {
  elemento.textContent = texto;
  elemento.classList.toggle("erro", ehErro);
}

// Lê os dados e os filtros e redesenha a parte afetada da tela.
function desenhar() {
  const filtros = lerFiltros();
  const analisados = analisarProjetos(projetos);
  const visiveis = filtrarProjetos(analisados, filtros);

  desenharLista(visiveis);

  // O gráfico SVG entra na Parte 4: enquanto o <svg> não existir no HTML, a página segue funcionando.
  if (graficoEl !== null) {
    desenharGrafico(visiveis);
  }
  resumoEl.textContent = montarResumo(calcularResumo(visiveis), visiveis.length);
  mostrarMensagem(avisoFiltrosEl, filtros.erro, filtros.erro !== "");
}

/* ---------- Eventos: lista (delegação) ---------- */

// Um único ouvinte na lista: funciona também para itens criados depois,
// porque o clique "sobe" até o <ul> e closest acha o botão certo.
function tratarCliqueLista(evento) {
  const botao = evento.target.closest("button[data-acao]");

  if (botao === null || !listaEl.contains(botao)) {
    return;
  }

  const id = Number(botao.dataset.id);
  const projeto = projetos.find((item) => item.id === id);

  if (projeto === undefined) {
    return;
  }

  const posicao = [...listaEl.querySelectorAll("li")].indexOf(botao.closest("li"));

  if (botao.dataset.acao === "favoritar") {
    projeto.favorito = !projeto.favorito;
    desenhar();

    // O botão antigo saiu da página no redesenho: devolve o foco ao novo.
    const mesmoBotao = listaEl.querySelector(`button[data-acao="favoritar"][data-id="${id}"]`);
    (mesmoBotao ?? resumoEl).focus();
  } else if (botao.dataset.acao === "remover") {
    projetos.splice(projetos.indexOf(projeto), 1);
    desenhar();

    // Foco vai para o botão Remover que ocupou o lugar, ou para o resumo se a lista esvaziou.
    const restantes = listaEl.querySelectorAll('button[data-acao="remover"]');
    const alvo = restantes.length > 0 ? restantes[Math.min(posicao, restantes.length - 1)] : resumoEl;
    alvo.focus();
  }
}

/* ---------- Eventos: filtros ---------- */

function alternarSomenteFavoritos() {
  const ativo = botaoFavoritos.getAttribute("aria-pressed") === "true";
  botaoFavoritos.setAttribute("aria-pressed", String(!ativo));
  desenhar();
}

/* ---------- Eventos: formulário "Adicionar projeto" ---------- */

function tratarEnvioNovoProjeto(evento) {
  evento.preventDefault();

  const formulario = evento.currentTarget;
  const mensagem = document.querySelector("#mensagem-novo");
  const campoNome = document.querySelector("#novo-nome");
  const campoHoras = document.querySelector("#novo-horas");
  const campoCategoriaNova = document.querySelector("#novo-categoria");

  const nome = campoNome.value.trim();
  const horas = Number(campoHoras.value);

  if (nome === "") {
    mostrarMensagem(mensagem, "Informe o nome do projeto.", true);
    campoNome.focus();
    return;
  }
  if (campoHoras.value.trim() === "" || !Number.isInteger(horas) || horas < 1 || horas > 500) {
    mostrarMensagem(mensagem, "Informe as horas como um número inteiro entre 1 e 500.", true);
    campoHoras.focus();
    return;
  }

  const novo = {
    id: proximoId++,
    nome,
    horas,
    ano: new Date().getFullYear(),
    categoria: campoCategoriaNova.value,
    favorito: false,
  };

  projetos.push(novo);
  formulario.reset();
  desenhar();

  const apareceu = listaEl.querySelector(`[data-id="${novo.id}"]`) !== null;
  const aviso = apareceu ? "" : " Ele está escondido pelos filtros atuais.";
  mostrarMensagem(mensagem, `Projeto "${nome}" adicionado.${aviso}`);
  campoNome.focus();
}

/* ---------- Eventos: formulário de contato ---------- */

function tratarEnvioContato(evento) {
  evento.preventDefault();

  const formulario = evento.currentTarget;
  const mensagem = document.querySelector("#mensagem-contato");
  const nome = document.querySelector("#nome").value.trim();

  // Simulação: nenhum dado sai do navegador.
  mostrarMensagem(mensagem, `Obrigado, ${nome}! Sua mensagem foi registrada (simulação, nada é enviado a um servidor).`);
  formulario.reset();
}

/* ---------- Navegação: menu hambúrguer, Escape e item ativo ---------- */

const menuBotao = document.querySelector("#menu-botao");
const menuLista = document.querySelector("#menu-principal");

function menuEstaAberto() {
  return menuBotao.getAttribute("aria-expanded") === "true";
}

function definirMenu(abrir) {
  menuLista.classList.toggle("aberto", abrir);
  menuBotao.setAttribute("aria-expanded", String(abrir));
}

function tratarCliqueMenuBotao() {
  definirMenu(!menuEstaAberto());
}

// Escape fecha o menu e devolve o foco ao botão que o abriu.
function tratarTeclaEscape(evento) {
  if (evento.key === "Escape" && menuEstaAberto()) {
    definirMenu(false);
    menuBotao.focus();
  }
}

// Escolher um link fecha o menu no celular.
function tratarCliqueMenuLista(evento) {
  if (evento.target.closest("a") !== null) {
    definirMenu(false);
  }
}

// Marca com .ativo o item do menu que corresponde à seção visível.
function marcarItemAtivo(idSecao) {
  for (const link of document.querySelectorAll(".navbar a")) {
    link.classList.remove("ativo");
    link.removeAttribute("aria-current");
  }

  for (const alvo of document.querySelectorAll(`.navbar a[href="#${idSecao}"]`)) {
    const item = alvo.closest(".navbar > li");
    const principal = item === null ? null : item.querySelector(":scope > a");

    if (principal !== null) {
      principal.classList.add("ativo");
      principal.setAttribute("aria-current", "location");
    }
  }
}

function tratarSecoesVisiveis(entradas) {
  for (const entrada of entradas) {
    if (entrada.isIntersecting) {
      marcarItemAtivo(entrada.target.id);
    }
  }
}

function iniciarDestaqueNavegacao() {
  if (!("IntersectionObserver" in window)) {
    return;
  }

  // A faixa central da tela é a "zona de leitura": a seção que entra nela vira a ativa.
  const observador = new IntersectionObserver(tratarSecoesVisiveis, {
    rootMargin: "-40% 0px -55% 0px",
  });

  for (const secao of document.querySelectorAll("main section")) {
    observador.observe(secao);
  }
}

function iniciarMenu() {
  if (menuBotao === null || menuLista === null) {
    console.error("Menu de navegação não encontrado no HTML.");
    return;
  }

  menuBotao.addEventListener("click", tratarCliqueMenuBotao);
  menuLista.addEventListener("click", tratarCliqueMenuLista);
  document.addEventListener("keydown", tratarTeclaEscape);
}

/* ---------- Aula 4: teste de suporte do vídeo ---------- */

function testarSuporteVideo() {
  const videoPrincipal = document.querySelector("video");

  if (videoPrincipal === null) {
    return;
  }

  console.log("Suporte a WebM:", videoPrincipal.canPlayType("video/webm"));
  console.log("Suporte a MP4:", videoPrincipal.canPlayType("video/mp4"));
}

/* ---------- Execução ---------- */

// Cada recurso tem sua função iniciar...(), chamada uma única vez:
// assim nenhum ouvinte é registrado em duplicidade.
function iniciarSecaoEsforco() {
  const elementos = [listaEl, resumoEl, vazioEl, avisoFiltrosEl, campoBusca, campoCategoria, campoMinimo, botaoFavoritos];

  if (elementos.some((elemento) => elemento === null)) {
    console.error("Algum elemento da seção #resultado não foi encontrado no HTML.");
    return;
  }

  listaEl.addEventListener("click", tratarCliqueLista);
  campoBusca.addEventListener("input", desenhar);
  campoMinimo.addEventListener("input", desenhar);
  campoCategoria.addEventListener("change", desenhar);
  botaoFavoritos.addEventListener("click", alternarSomenteFavoritos);

  const formNovo = document.querySelector("#form-novo-projeto");
  if (formNovo !== null) {
    formNovo.addEventListener("submit", tratarEnvioNovoProjeto);
  }

  desenhar(); // a página já nasce preenchida
}

function iniciarFormularioContato() {
  const formContato = document.querySelector("#form-contato");

  if (formContato !== null) {
    formContato.addEventListener("submit", tratarEnvioContato);
  }
}

iniciarMenu();
iniciarDestaqueNavegacao();
iniciarFormularioContato();
iniciarSecaoEsforco();
testarSuporteVideo();
