# Redesign Bento Grid do portfólio — Design

Data: 2026-10-18 · Status: aguardando aprovação

## Intenção

O portfólio usa o template Agency (Bootstrap), com visual genérico e quase sem imagens.
O objetivo é modernizar o layout inteiro para um estilo **Bento Grid moderno**: cards de
tamanhos variados, vidro fosco sutil, bordas em gradiente, mesh de fundo e animações leves.
O mockup aprovado está em `.superpowers/brainstorm/28558-1792372775/content/bento-mockup.html`.

## Objetivos

- Todas as seções (Navegação, Masthead, Sobre, Skills, Graduação, Cursos, Trilhas, Livros,
  Contato, Footer) no estilo bento, com identidade visual única.
- Mais imagens: retrato no hero, capas de livros e logos de instituições/tecnologias.
- Tokens de design próprios (cor, raio, sombra, espaçamento, tipografia) em CSS custom properties.
- Tema escuro como padrão; tema claro continua completo e acessível.
- Mobile-first: no mobile o bento colapsa para uma coluna.

## Não objetivos

- Não alterar dados (`src/app/data/*`), traduções, SEO, rotas ou analytics.
- Não criar páginas novas nem trocar o framework de estilos (Bootstrap segue para grid/utilitários).

## Anti-objetivos (seria falha mesmo que "funcione")

- Perder acessibilidade (skip-link, focus ring, contraste AA, navegação por teclado).
- Estourar os budgets de bundle (initial 600 kB warn / 800 kB error; estilos de componente 3/5 kB).
- Quebrar `data-testid` usados nos testes E2E (Playwright) e unitários (Vitest).
- Efeitos pesados que prejudiquem LCP/CLS (blur e animações só em elementos pequenos ou com `will-change` controlado).

## Decisões já tomadas pelo usuário

- Direção visual: **Bento Grid Moderno** (mockup aprovado: "Ficou bom").
- Foto do hero: `src/assets/img/myimage.jpg` (assumido; usuário disse "usa esta foto" sem anexo).

## Escolhas minhas (a validar na leitura)

- Mantém Angular standalone, OnPush, `@defer`, i18n e estrutura de componentes.
- Tipografia: Inter (corpo/títulos) no lugar de Montserrat + Roboto Slab, com `font-display: swap`.
- SCSS novo com `@use`; tokens em `:root` e `[data-bs-theme='dark']` (já existe esse seletor).
- Animações de entrada via `animation-timeline: view()` com fallback para IntersectionObserver;
  tudo desligado em `prefers-reduced-motion`.
- Remover CSS morto do template Agency (`#portfolio`, `.portfolio-modal`, `.team-member`, etc.)
  somente após confirmar que nenhum componente usa as classes.
- Métricas do hero (23+ anos, nº de cursos, clouds) saem dos dados existentes, não são digitadas à mão.
  Textos como "Disponível para projetos" do mockup são ilustrativos e precisam de chave i18n e aprovação.
- Ordem de entrega: (1) tokens, base e navegação; (2) hero e Sobre; (3) Skills e Graduação;
  (4) Cursos, Trilhas, Livros, Contato e Footer; (5) limpeza de CSS morto e revisão de performance.

## Pontos abertos

- **Resolução da foto:** 480×480 fica macia em cards grandes com tela retina. Opções: usar como está
  com recorte e overlay, ou o usuário fornecer versão ≥ 1000px.
- **Capas de livros e cursos:** hoje existem logos de editoras em `assets/img/publishers`; capas reais
  precisam ser fornecidas ou buscadas (decisão do usuário).
- **Fundo cinza claro da foto** no tema escuro: tratar com máscara/gradiente ou aceitar o retângulo arredondado.

## Verificação esperada

`pnpm run lint`, `pnpm run test:nowatch`, `pnpm run build:prod` (budgets) e `pnpm run test:e2e:chromium`
passando a cada etapa; checagem visual em claro/escuro e em 375px, 768px e 1280px.

## Próximo passo

Aprovado este documento, escrever o plano de implementação (superpowers:writing-plans).
