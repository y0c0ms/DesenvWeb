# Festival Vilar de Mouros 2025

Website do Festival Vilar de Mouros 2025, com programação, candidatura a voluntário e inquérito ao público.

Projeto desenvolvido como exercício de HTML, CSS e JavaScript (React).

## Funcionalidades

- **Cabeçalho com cartaz:** título e cartaz do festival; a imagem fica transparente ao passar o rato sobre ela (`opacity`).
- **Navegação:** menu com botões para Início e Candidatura a Voluntário.
- **Slideshow:** 8 fotografias de edições anteriores (`src/imgs/fotoFestival1.jpg` a `fotoFestival8.jpg`), com mudança automática a cada 3 segundos.
- **Programação:** 20 artistas agrupados por dia (21 a 24 de agosto), com estilo musical, horário e vídeo de cada artista.
- **Candidatura a voluntário** (`/voluntario`):
  - nome e contacto;
  - seleção de 1 a 4 dias de presença; com 4 dias, as datas 21, 22, 23 e 24 são preenchidas automaticamente;
  - campos de data/hora em `<select>` limitados aos dias do festival;
  - campo de comentário com o botão "Validar comentário", que rejeita palavras de uma lista proibida (ignora maiúsculas e acentos);
  - confirmação de inscrição no fim.
- **Inquérito ao público** (`/inquerito`):
  - escolha dos artistas de que mais gostou e do horário preferido para os concertos;
  - respostas guardadas no `localStorage` do navegador;
  - página de resposta (`/inquerito/resposta`) e página de resultados (`/inquerito/resultados`).

## Stack

- React 19 e React Router 6, criado com `react-scripts` (Create React App), em `my-react-project/`.
- Páginas estáticas em `my-react-project/public/` (`voluntario.html`, `aceite.html`, `test.html`), com CSS e JavaScript simples.

## Run it

Aplicação React (a partir de `my-react-project/`):

```bash
cd my-react-project
npm install
npm start
```

O script `start` definido em `package.json` usa a sintaxe do Windows (`SET NODE_OPTIONS=... &&`). Em Linux ou macOS, execute:

```bash
cd my-react-project
npm install
NODE_OPTIONS=--openssl-legacy-provider npx react-scripts start
```

Páginas estáticas: abra `my-react-project/public/voluntario.html` ou `my-react-project/public/aceite.html` diretamente no navegador.

## Considerações

- **Imagens:** as imagens do slideshow e o cartaz estão em `my-react-project/src/imgs/`.
- **Validação do comentário:** a verificação remove acentos (`normalize("NFD")`) e compara em minúsculas.
- **Compatibilidade:** requer um navegador moderno com suporte a `String.prototype.normalize()` e JavaScript ES6+.
