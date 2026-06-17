# State Hermitage Museum frontend replica

Este projeto implementa uma replica frontend local das telas do State Hermitage Museum mostradas nos screenshots de referencia. Esta etapa reproduz a interface existente antes de qualquer modificacao futura de usabilidade, sem redesign ou modernizacao autoral.

## Stack

- React
- TypeScript
- Vite
- React Router
- CSS puro
- ESLint

## Requisitos

Este projeto deve ser executado em container Docker.

Requisitos:

- Docker
- Docker Compose

Nao e necessario instalar Node.js ou npm diretamente na maquina host. O projeto nao usa backend, banco de dados, variaveis de ambiente, login, APIs externas ou chaves.

## Execucao com Docker Compose

Na raiz do projeto, execute:

```bash
docker compose up --build
```

Depois acesse:

```text
http://localhost:5173
```

A rota de revisao com links para todas as telas e:

```text
http://localhost:5173/__review
```

Para parar o container:

```bash
docker compose down
```

## Comandos uteis no container

Para executar build:

```bash
docker compose run --rm hermitage-frontend npm run build
```

Para executar lint:

```bash
docker compose run --rm hermitage-frontend npm run lint
```

Para abrir um shell dentro do container:

```bash
docker compose run --rm hermitage-frontend sh
```

## Execucao local sem Docker

O uso local sem Docker e opcional e exige Node.js/npm instalados na maquina:

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

## Rotas

| Tela | Rota | Referencia |
|---|---|---|
| Home | `/` | `Screenshot From 2026-06-17 18-59-34.png` |
| Menu aberto | `/` + menu | `Screenshot From 2026-06-17 19-02-38.png` |
| Tours | `/virtual-visit` | `Screenshot From 2026-06-17 19-02-48.png` |
| Main Museum Complex mapa | `/virtual-visit/main-museum-complex` | `Screenshot From 2026-06-17 19-03-51.png` |
| Main Museum Complex legenda | `/virtual-visit/main-museum-complex` | `Screenshot From 2026-06-17 19-03-57.png` |
| Main Museum Complex rodape | `/virtual-visit/main-museum-complex` | `Screenshot From 2026-06-17 19-04-05.png` |
| Busca geral | `/search?q=ch` | `Screenshot From 2026-06-17 19-05-06.png` |
| Busca avancada | `/search/artworks` | `Screenshot From 2026-06-17 19-05-16.png` |
| Resultados de obras | `/search/artworks` | `Screenshot From 2026-06-17 19-05-21.png` |
| Detalhe da obra, imagem | `/artworks/portrait-of-burchard-richter` | `Screenshot From 2026-06-17 19-05-42.png` |
| Detalhe da obra, metadados | `/artworks/portrait-of-burchard-richter` | `Screenshot From 2026-06-17 19-05-47.png` |
| Detalhe da obra, rodape | `/artworks/portrait-of-burchard-richter` | `Screenshot From 2026-06-17 19-05-51.png` |
| Compra institucional | `/tickets` | `Screenshot From 2026-06-17 19-06-21.png` |
| Catalogo de ingressos | `/ticket-shop` | `Screenshot From 2026-06-17 19-06-50.png` |
| Data e horario | `/ticket-shop/main-museum-complex` | `Screenshot From 2026-06-17 19-06-56.png` |
| Quantidades | `/ticket-shop/main-museum-complex/quantity` | `Screenshot From 2026-06-17 19-07-10.png` |
| Checkout | `/ticket-shop/checkout` | `Screenshot From 2026-06-17 19-07-22.png` |

Aliases implementados:

- `/tours`
- `/collection`
- `/collection/search`
- `/collection/artworks/:artworkId`

A rota `/__review` lista links para todas as telas e nao aparece na navegacao principal.

## Dados mockados

Os dados locais ficam em:

- `src/data/artworks.ts`
- `src/data/virtualVisit.ts`
- `src/data/tickets.ts`

A busca usa dados locais simulados e atualiza a query string. O fluxo de ingressos persiste o pedido em `sessionStorage`, incluindo data, horario e quantidades.

## Screenshots

As capturas originais ficam em `paginas/` e foram usadas como fonte visual principal. O acesso ao site oficial nao estava disponivel durante a implementacao inicial, entao os screenshots locais prevaleceram.

## Assets temporarios

Foram extraidos recortes limpos dos screenshots para uso local em `src/assets`:

- logotipos;
- banners fotograficos;
- imagem e miniaturas de obras;
- mapa do Main Museum Complex;
- imagens dos cards de ingressos.

Esses recortes sao temporarios ate a substituicao por assets originais licenciados. Nenhuma tela usa screenshot inteiro como background navegavel.

## Limitacoes conhecidas

- A fidelidade visual foi aproximada a partir das capturas locais, mas nao foi validada com comparacao automatizada porque este ambiente nao possui `node`/`npm` instalados.
- Alguns textos pequenos ilegiveis nas capturas foram inferidos a partir dos padroes visiveis.
- Os icones sociais e alguns controles pequenos foram reproduzidos em CSS/texto simples.
- As imagens originais oficiais devem substituir os recortes temporarios em uma etapa posterior.
