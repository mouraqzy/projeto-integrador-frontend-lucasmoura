/*
 * Aula 11 - Funcoes, arrays/objetos e DOM
 *
 * Tema: Portfolio Pessoal 
 * Padrao: processar -> classificar -> mostrar
 *
 * Testes no console (antes de ligar na pagina):
 *   estimarSemanas(25)        -> 3
 *   estimarSemanas(25, 5)     -> 5
 *   estimarSemanas(8)         -> 1
 *   classificarEsforco(1)     -> "rapido"
 *   classificarEsforco(2)     -> "medio"
 *   classificarEsforco(3)     -> "longo"
 */

const projetos = [
  { nome: "Portfolio Pessoal", horas: 80, ano: 2026 },
  { nome: "Quadro 616", horas: 25, ano: 2026 },
  { nome: "Quiz FLA", horas: 18, ano: 2026 },
  { nome: "Cassino Casa Blanca", horas: 12, ano: 2026 },
  { nome: "Gerenciador de Campeonato", horas: 8, ano: 2026 },
];

const rotulos = { rapido: "Rápido", medio: "Médio", longo: "Longo" };

/* ---------- Funcoes que calculam (nao mexem na pagina) ---------- */

// Processa: converte horas em semanas. horasPorSemana tem valor padrao.
function estimarSemanas(horas, horasPorSemana = 10) {
  return Math.ceil(horas / horasPorSemana);
}

// Classifica: devolve a faixa em tres niveis (da menor para a maior).
function classificarEsforco(semanas) {
  if (semanas <= 1) {
    return "rapido";
  } else if (semanas <= 2) {
    return "medio";
  } else {
    return "longo";
  }
}

// map: gera uma NOVA lista com o resultado de cada item (nao altera a original).
function analisarProjetos(lista, horasPorSemana) {
  return lista.map((projeto) => {
    const semanas = estimarSemanas(projeto.horas, horasPorSemana);
    return { ...projeto, semanas, faixa: classificarEsforco(semanas) };
  });
}

// filter + reduce: monta a linha de resumo.
function montarResumo(lista) {
  const totalHoras = lista.reduce((soma, projeto) => soma + projeto.horas, 0);
  const longos = lista.filter((projeto) => projeto.faixa === "longo");
  return `${lista.length} projetos, ${totalHoras} horas no total, ${longos.length} de esforço longo.`;
}

/* ---------- Funcoes que MEXEM NA PAGINA ---------- */

// Monta o elemento de um item (textContent evita innerHTML com dados de fora).
function criarElementoProjeto(item) {
  const artigo = document.createElement("article");
  artigo.classList.add("projeto", `faixa-${item.faixa}`);

  const titulo = document.createElement("h3");
  titulo.textContent = item.nome;

  const detalhe = document.createElement("p");
  detalhe.textContent = `${item.horas} h · ${item.semanas} semana(s) · esforço ${rotulos[item.faixa]}`;

  artigo.append(titulo, detalhe);
  return artigo;
}

function mostrarResultado(lista, textoResumo) {
  const area = document.querySelector("#resultado");

  if (area === null) {
    console.error("Area #resultado nao encontrada no HTML.");
    return;
  }

  const grade = document.createElement("div");
  grade.classList.add("grade-projetos");

  for (const item of lista) {
    grade.append(criarElementoProjeto(item));
  }

  const resumo = document.createElement("p");
  resumo.classList.add("resumo", "destaque");
  resumo.textContent = textoResumo;

  area.append(grade, resumo);
}

/* ---------- Aula 4: teste de suporte do video ---------- */

function testarSuporteVideo() {
  const videoPrincipal = document.querySelector("video");

  if (videoPrincipal === null) {
    return;
  }

  console.log("Suporte a WebM:", videoPrincipal.canPlayType("video/webm"));
  console.log("Suporte a MP4:", videoPrincipal.canPlayType("video/mp4"));
}

/* ---------- Execucao ---------- */

function iniciar() {
  const analisados = analisarProjetos(projetos);

  // sort altera o array: ordena uma COPIA, nunca a lista original.
  const maisHorasPrimeiro = [...analisados].sort((a, b) => b.horas - a.horas);

  mostrarResultado(maisHorasPrimeiro, montarResumo(analisados));
}

testarSuporteVideo();
iniciar();