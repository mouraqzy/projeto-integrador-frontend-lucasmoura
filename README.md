# Portfólio Pessoal — Lucas Moura do Nascimento

Site de portfólio pessoal voltado a recrutadores, professores e colegas da área de tecnologia.
Reúne minhas habilidades, os projetos que desenvolvi (com horas dedicadas e classificação de esforço)
e um formulário de contato. O objetivo é servir como cartão de visitas digital e consolidar, em HTML,
CSS e JavaScript puros, o que aprendi na disciplina de Desenvolvimento Front-end para Web.

## Tecnologias utilizadas

- HTML5 (semântico, com vídeo, formulários e gráfico em SVG)
- CSS3 (variáveis, Flexbox, Grid, navbar sticky com dropdown e menu hambúrguer, layout responsivo)
- JavaScript puro, sem bibliotecas ou frameworks
- Git e GitHub (Conventional Commits, branches e Pull Requests)

## Capturas de tela

| Desktop | Celular |
|---|---|
| ![Página do portfólio em desktop](assets/images/print-desktop-v2.png) | ![Página do portfólio em celular](assets/images/print-celular-v2.png) |

## Estrutura de pastas

```
projeto-integrador-frontend-lucasmoura/
├── index.html
├── css/
│   ├── reset.css
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   └── videos/
├── .gitignore
└── README.md
```

## Como executar

1. Clone o repositório:
   ```
   git clone https://github.com/mouraqzy/projeto-integrador-frontend-lucasmoura.git
   ```
2. Abra o arquivo `index.html` no navegador, ou use a extensão **Live Server** do VS Code.

## Mapa dos requisitos

### Repositório e organização

| Requisito | Onde foi atendido |
|---|---|
| Repositório público com o nome correto | GitHub: `mouraqzy/projeto-integrador-frontend-lucasmoura` |
| Pastas em minúsculas, sem espaços | Raiz: `index.html`, `css/`, `js/`, `assets/images/`, `assets/videos/` |
| Caminhos relativos, sem 404 | `index.html` (todos os `href` e `src` são relativos) |
| Conventional Commits, branches e Pull Requests | Aba *Commits* e *Pull requests* do GitHub (mais de 15 PRs mesclados) |
| Versão final na `main` | Branch `main` |
| README completo | Este arquivo |

### HTML

| Requisito | Onde foi atendido |
|---|---|
| Estrutura HTML5 válida | `index.html`, `<head>` (DOCTYPE, `lang`, charset, viewport, title) |
| `h1`, parágrafo, lista, tabela, link externo, imagem com `alt` | `index.html`: `#titulo-principal`, `.lista-linguagens`, tabela "Resumo dos projetos", seção "Saiba mais", `.foto-perfil` |
| Semântica (header, nav, main, sections, footer) | `index.html`: `<header>`, `<nav class="barra-nav">`, um único `<main>`, seções com `h2` e `<footer>` |
| Formulário (4+ campos, label/for, fieldset, required, pattern) | `index.html`, seção `#contato` |
| Vídeo com 2 formatos, preload justificado, poster | `index.html`, seção "Aplicação mais recente" (`#video`) |
| Gráfico SVG responsivo, ligado ao tema | `index.html`: `<svg id="grafico">` com `viewBox`, `title` e `desc`; `js/script.js`: `desenharGrafico`; `css/style.css`: seção "Gráfico em SVG" |

### CSS

| Requisito | Onde foi atendido |
|---|---|
| `reset.css` e `style.css`, `box-sizing: border-box` | `css/reset.css`, `css/style.css` |
| 5+ variáveis CSS | `css/style.css`, bloco `:root` |
| 3+ classes, 1+ ID, 1+ combinador | `css/style.css`: `.card`, `.projeto`, `.botao`, `#titulo-principal`, `.card > h2`, `.projeto h3` |
| Box model explícito | `css/style.css`, `.card` (padding, border, margin) |
| 4 estados de link na ordem | `css/style.css`, `a:link`, `a:visited`, `a:hover`, `a:active` |
| Tabela e lista estilizadas | `css/style.css`, seções "Tabela" e "Lista de linguagens" |
| `font-size` em rem, com justificativa | `css/style.css`, comentário no bloco "Base" |
| Navbar com Flexbox, `.ativo`, dropdown, sticky e hambúrguer | `css/style.css`, seção "Navbar": `.navbar` (flex), `.barra-nav` (`position: sticky`), `.submenu` (dropdown com `:hover` e `:focus-within`), `.menu-botao` (hambúrguer); `.ativo` aplicado por `marcarItemAtivo` em `js/script.js` |
| Grid, pseudo-classe estrutural, hover com `transform` | `css/style.css`: `.grade-projetos`, `.projeto:nth-child(even)`, `.projeto:hover` |
| Legível em celular e desktop | `css/style.css`; prints acima |

### JavaScript

Todo o JavaScript está em um único arquivo, `js/script.js` (os arquivos `logica.js` e `main.js` das aulas anteriores foram unificados nele).

| Requisito | Onde foi atendido |
|---|---|
| Lógica (Aula 9): `if / else if / else`, `switch`, `for...of` com acumulador, `do...while`, comentário de planejamento | `js/script.js`: comentário no topo (tema, entrada, processamento, saída, pseudocódigo e teste de mesa); `classificarEsforco` (`if / else if / else`); `descreverCategoria` (`switch` com `break` e `default`); `calcularResumo` (`for...of` com acumulador, contador e máximo); `calcularLimiteEixo` (`do...while`) |
| Funções e escopo (Aula 10): 2+ funções, `const/let`, `Number()`, `return`, escopo local | `js/script.js`: `estimarSemanas` (parâmetro padrão) e `classificarEsforco`; `lerMinimoHoras` (`Number()` com validação); escopo local explicado em comentário em `calcularResumo` |
| Arrays e DOM (Aula 11): `map`, `filter`, `reduce`, `createElement`/`textContent`, classes | `js/script.js`: `analisarProjetos` (`map`), `filtrarProjetos` (`filter`), `desenharGrafico` (`reduce`), `criarElementoProjeto` e `desenharLista` (`createElement`, `textContent`, `classList`) |
| Eventos (a): `<button>` com `aria-expanded` / `aria-pressed`, pelo teclado | `index.html`: `#menu-botao` (`aria-expanded`) e `#somente-favoritos` (`aria-pressed`); `js/script.js`: `tratarCliqueMenuBotao`, `tratarTeclaEscape` (Escape fecha e devolve o foco), `alternarSomenteFavoritos` |
| Eventos (b): delegação em lista criada por JavaScript | `js/script.js`: `tratarCliqueLista` (um único ouvinte em `#lista-projetos`, com `closest` e `dataset`); funciona também para projetos adicionados depois |
| Eventos (c): busca ou filtro com `input` / `change` | `js/script.js`: `iniciarSecaoEsforco` liga `#busca` e `#minimo-horas` (`input`) e `#filtro-categoria` (`change`) à função `desenhar` |
| Eventos (d): resumo que se atualiza, com `aria-live` | `index.html`: `#resumo` (`aria-live="polite"`); `js/script.js`: `montarResumo` e `desenhar` |
| Eventos (e): nenhum `innerHTML` com texto digitado | `js/script.js`: todo texto entra por `textContent`; digitar `<b>teste</b>` em "Adicionar projeto" mostra o texto literal |
| Script ligado ao final do `body` com `defer` | `index.html`, final do `<body>` |
| Console sem erros | Testado no Chromium: nenhuma mensagem de erro ao abrir e usar a página |

### Qualidade e acessibilidade

| Requisito | Onde foi atendido |
|---|---|
| `alt`, `label` e `aria-*` | `index.html`: `alt` na foto de perfil, ícones decorativos com `alt=""`, todos os campos com `label` e `for`/`id`, `aria-label` nos botões da lista (`criarElementoProjeto`), `role="img"` com `title` e `desc` no SVG |
| Navegação por teclado e foco visível | `css/style.css`: regras `:focus-visible`; `js/script.js`: foco devolvido após redesenhar a lista (`tratarCliqueLista`) |

## Autor

Lucas Moura do Nascimento — RGM: 47569450 — Curso: Ciência da Computação

## Avaliações recebidas

### Avaliação do Projeto Integrador — Lucas Moura

O projeto apresenta uma boa organização dos arquivos, utilizando pastas separadas para assets, css e js. Essa estrutura facilita a manutenção e demonstra uma boa aplicação dos princípios de organização de um projeto Front-end.

O README também apresenta de forma clara a proposta do projeto, que consiste no desenvolvimento de um portfólio pessoal ao longo do semestre.

Outro ponto positivo é a utilização do GitHub para versionamento, com 10 commits registrados, demonstrando a evolução do projeto.

Como ponto de melhoria, seria interessante adicionar mais informações na descrição do repositório, como as tecnologias utilizadas e o link para a versão publicada do projeto.

avaliado por jose simplicio|27/08/2026| 22hrs39min

### Análise do  projeto

O projeto do Lucas Moura está de acordo com os conteúdos trabalhados nas aulas até o momento. A proposta está clara, o repositório possui uma organização inicial adequada com pastas bem estruturadas (assets, css, js) e o uso de Git, commits e Pull Requests está sendo realizado corretamente. Não identifiquei, dentro dos requisitos avaliados, algo importante que esteja faltando. Como sugestão, o projeto está ótimo para a finalização e para continuar aprimorando conforme as últimas aulas.

Análise realizada  - Rafael Aquino | 09/11/2026 | 22h23