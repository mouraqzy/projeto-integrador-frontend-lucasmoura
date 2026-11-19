# Portfólio Pessoal — Lucas Moura do Nascimento

Site de portfólio pessoal voltado a recrutadores, professores e colegas da área de tecnologia.
Reúne minhas habilidades, os projetos que desenvolvi (com horas dedicadas e classificação de esforço)
e um formulário de contato. O objetivo é servir como cartão de visitas digital e consolidar, em HTML,
CSS e JavaScript puros, o que aprendi na disciplina de Desenvolvimento Front-end para Web.

## Tecnologias utilizadas

- HTML5 (semântico, com vídeo e formulário)
- CSS3 (variáveis, Flexbox, Grid, layout responsivo)
- JavaScript puro, sem bibliotecas ou frameworks
- Git e GitHub (Conventional Commits, branches e Pull Requests)

## Capturas de tela

| Desktop | Celular |
|---|---|
| ![Página do portfólio em desktop](assets/images/print-desktop.png) | ![Página do portfólio em celular](assets/images/print-celular.png) |

## Estrutura de pastas

```
projeto-integrador-frontend-lucasmoura/
├── index.html
├── css/
│   ├── reset.css
│   └── style.css
├── js/
│   ├── logica.js
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
| Conventional Commits, branches e Pull Requests | Aba *Commits* e *Pull requests* do GitHub (PRs #1 a #12) |
| Versão final na `main` | Branch `main` |
| README completo | Este arquivo |

### HTML

| Requisito | Onde foi atendido |
|---|---|
| Estrutura HTML5 válida | `index.html`, `<head>` (DOCTYPE, `lang`, charset, viewport, title) |
| `h1`, parágrafo, lista, tabela, link externo, imagem com `alt` | `index.html`: `#titulo-principal`, `.lista-linguagens`, tabela "Resumo dos projetos", seção "Saiba mais", `.foto-perfil` |
| Semântica (header, nav, main, sections, footer) | `index.html` (estrutura geral) |
| Formulário (4+ campos, label/for, fieldset, required, pattern) | `index.html`, seção `#contato` |
| Vídeo com 2 formatos, preload justificado, poster | `index.html`, seção "Aplicação mais recente" |

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
| Navbar com Flexbox | `css/style.css`, seção "Navbar (Flexbox)", classe `.navbar` |
| Grid, pseudo-classe estrutural, hover com `transform` | `css/style.css`: `.grade-projetos`, `.projeto:nth-child(even)`, `.projeto:hover` |
| Legível em celular e desktop | `css/style.css`; prints acima |

### JavaScript

| Requisito | Onde foi atendido |
|---|---|
| Lógica: `if/else`, `switch`, `for...of` com acumulador, `do...while`, comentário de planejamento | `js/logica.js`, função `executarAnaliseDeProjetos` e comentário no topo |
| Funções e escopo: 2+ funções, `const/let`, `Number()`, `return` | `js/script.js`: `estimarSemanas`, `classificarEsforco`; `js/logica.js`: `pedirMinimoDeHoras` |
| `map`, `filter`, `reduce`, DOM com `createElement` e `textContent` | `js/script.js`: `analisarProjetos`, `montarResumo`, `criarElementoProjeto`, `mostrarResultado` |
| Área de resultado com `aria-live` | `index.html`, `#resultado` (`aria-live="polite"`); `js/script.js`, função `mostrarResultado` |
| Nenhum `innerHTML` com texto do usuário | `js/script.js` (uso de `textContent`) |
| Script ligado ao final do `body` com `defer` | `index.html`, final do `<body>` |

## Autor

Lucas Moura do Nascimento — RGM: 47569450

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