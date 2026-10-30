/*
 * Aula 09 - Logica em JavaScript
 *
 * Tema: Portfolio Pessoal - analise do esforco dos meus projetos
 * Entrada: horas minimas (prompt) e comandos do menu (listar, resumo, sair)
 * Processamento: classificar cada projeto pela faixa de horas, contar quantos
 *   atingem o minimo, somar as horas e achar o projeto com mais horas
 * Saida: frases no console (template literal) e console.table com o relatorio
 *
 * Pseudocodigo:
 *   1. Declarar a lista de projetos (nome, horas, categoria)
 *   2. Pedir o minimo de horas; converter com Number() e validar
 *   3. Para cada projeto: classificar a faixa (grande / medio / pequeno)
 *   4. Para cada projeto: escolher a mensagem pela categoria (switch)
 *   5. Somar as horas, contar os que atingem o minimo e guardar o maior
 *   6. Mostrar as frases e o console.table
 *   7. Repetir um menu de comandos ate o usuario digitar "sair"
 *
 * Teste de mesa (minimo = 20), tres primeiras voltas do for...of:
 *   volta | projeto            | horas | faixa  | totalHoras | acimaDoMinimo | maisHoras
 *   ------+--------------------+-------+--------+------------+---------------+----------
 *     1   | Portfolio Pessoal  |  80 | grande |     80     |       1       | Portfolio
 *     2   | Quadro 616         |  25   | grande |    105     |       2       | Portfolio
 *     3   | Quiz FLA           |  18   | medio  |    123     |       2       | Portfolio
 */

// Dados do tema (troque as horas pelos valores reais dos seus projetos).
// Nomes das propriedades em camelCase e sem acento.
const listaProjetos = [
  { nome: "Portfolio Pessoal", horas: 80, ano: 2026, categoria: "web" },
  { nome: "Quadro 616", horas: 25, ano: 2026, categoria: "web" },
  { nome: "Quiz FLA", horas: 18, ano: 2026, categoria: "web" },
  { nome: "Cassino Casa Blanca", horas: 12, ano: 2026, categoria: "python" },
  { nome: "Gerenciador de Campeonato", horas: 8, ano: 2026, categoria: "c" },
];

// Pede o minimo de horas e valida: Cancelar (null), vazio, texto e faixa.
// Devolve um numero valido ou null.
function pedirMinimoDeHoras() {
  const resposta = prompt(
    "Quantas horas no minimo um projeto deve ter para entrar na contagem? (0 a 100)"
  );

  if (resposta === null) {
    console.warn("Entrada cancelada.");
    return null;
  }
  if (resposta.trim() === "") {
    console.warn("Voce nao digitou nada.");
    return null;
  }

  const numero = Number(resposta);

  if (Number.isNaN(numero)) {
    console.warn(`"${resposta}" nao e um numero.`);
    return null;
  }
  if (numero < 0 || numero > 100) {
    console.warn("O valor precisa estar entre 0 e 100.");
    return null;
  }

  return numero;
}

function executarAnaliseDeProjetos() {
  const minimoDeHoras = pedirMinimoDeHoras();

  if (minimoDeHoras === null) {
    console.log("Analise encerrada: entrada invalida.");
    return;
  }

  let totalHoras = 0; // acumulador
  let acimaDoMinimo = 0; // contador
  let maisHoras = listaProjetos[0]; // maximo
  const relatorio = [];

  for (const projeto of listaProjetos) {
    // Condicoes da maior faixa para a menor: a ordem importa.
    let faixa;
    if (projeto.horas >= 25) {
      faixa = "grande";
    } else if (projeto.horas >= 15) {
      faixa = "medio";
    } else {
      faixa = "pequeno";
    }

    // Uma mensagem diferente para cada categoria.
    let mensagem;
    switch (projeto.categoria) {
      case "web":
        mensagem = "Projeto de front-end";
        break;
      case "python":
        mensagem = "Projeto em Python";
        break;
      case "c":
        mensagem = "Projeto em C";
        break;
      default:
        mensagem = "Categoria desconhecida";
        break;
    }

    totalHoras += projeto.horas;

    if (projeto.horas >= minimoDeHoras) {
      acimaDoMinimo++;
    }

    if (projeto.horas > maisHoras.horas) {
      maisHoras = projeto;
    }

    relatorio.push({
      Projeto: projeto.nome,
      Horas: projeto.horas,
      Faixa: faixa,
      Tipo: mensagem,
    });
  }

  const resumo =
    `Total de horas: ${totalHoras}h. ` +
    `Projetos com pelo menos ${minimoDeHoras}h: ${acimaDoMinimo} de ${listaProjetos.length}. ` +
    `Projeto com mais horas: ${maisHoras.nome} (${maisHoras.horas}h).`;

  console.log(resumo);
  console.table(relatorio);

  // Menu: a condicao do laco e atualizada dentro do bloco.
  let comando;
  do {
    comando = prompt("Digite um comando: listar, resumo ou sair");

    if (comando === null) {
      comando = "sair"; // Cancelar tambem encerra o menu
    }
    comando = comando.trim().toLowerCase();

    if (comando === "listar") {
      console.table(relatorio);
    } else if (comando === "resumo") {
      console.log(resumo);
    } else if (comando !== "sair") {
      console.warn(`Comando "${comando}" nao existe.`);
    }
  } while (comando !== "sair");

  console.log("Menu encerrado.");
}

executarAnaliseDeProjetos();