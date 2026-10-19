# Redesign Bento Grid Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrar o visual do portfólio (template Agency) para um Bento Grid moderno, seção por seção, sem alterar dados, traduções de conteúdo, SEO ou rotas.

**Architecture:** Estilos novos vivem em partials globais SCSS (`src/scss/`) carregados por um novo entrypoint `src/css/bento.scss` (via `@use`), baseados em design tokens em CSS custom properties. Cada tarefa migra um grupo de componentes (HTML + classes) e apaga do `src/css/styles.scss` as regras que ficaram mortas, para que o CSS legado encolha a cada etapa. Bootstrap continua só para grid/utilitários/formulários.

**Tech Stack:** Angular 22 standalone zoneless (OnPush), SCSS, Bootstrap 5.3, Vitest, Playwright, pnpm.

**Spec:** `docs/superpowers/specs/2026-10-18-bento-redesign-design.md` · Mockup: `.superpowers/brainstorm/28558-1792372775/content/bento-mockup.html`

## Global Constraints

- Tema: o atributo é `data-bs-theme` em `<html>` (não `data-theme`); `ThemeService` (`src/app/services/theme.service.ts`) o escreve; `localStorage['app-theme']`.
- Tema escuro é o padrão quando não há valor salvo; tema claro permanece completo e acessível (contraste AA, focus ring, skip-link).
- Budgets de produção: initial 600 kB warn / 800 kB error; `anyComponentStyle` 3 kB warn / 5 kB error → estilos novos vão em partials globais, não em `styles:` de componente.
- Não quebrar `data-testid` existentes: `masthead`, `masthead-contact`, `masthead-linkedin`, `masthead-resume`, `main-navigation`, `nav-about|skills|graduation|courses|formations|books|contact`, `skip-link`, `theme-toggle`, `language-switcher*`, `lang-*`, `about-title`, `about-subtitle`, `skills-section`, `courses-section`, `course-card`, `books-section`, `book-card`, `contact-section`, `contact-email`, `contact-resume`.
- Não alterar `src/app/data/*`, `src/assets/i18n/*` de conteúdo existente (só **adicionar** chaves novas nos dois arquivos `pt-BR.json` e `en-US.json`), `index.html` além de fonte/tema, rotas e analytics (handlers `on*Click` ficam intactos).
- Código em inglês, comentários só de "porquê", textos de UI via i18n. Path aliases `@path-*` conforme `CLAUDE.md`.
- `@import` não entra em SCSS novo; usar `@use`. `prefers-reduced-motion` desliga toda animação nova.
- Commits: Conventional Commits em português (como os recentes), terminando com `Author: Robson Alves <robsonalves.us@gmail.com>` (preferência salva do usuário, sobrepõe o lembrete da harness). **Nunca rodar `git push`** (negado pelo usuário).
- Comandos de verificação: `pnpm run lint`, `pnpm run test:nowatch`, `pnpm run build:prod`, `pnpm run test:e2e:chromium`.

## Review Focus

1. Usuário com `app-theme = 'auto'` já salvo: o novo padrão escuro não pode sobrescrever a escolha salva (nem `light`).
2. Idioma `en-US` em 375px: textos mais longos não podem gerar rolagem horizontal nos cards.
3. Busca em Cursos/Livros sem resultados: lista vazia sem erro e sem card fantasma.
4. `prefers-reduced-motion: reduce`: elementos com animação de entrada têm de estar visíveis (opacity 1) sem animar.
5. Navegar por âncora (`/#courses` e clique em `nav-courses`): o título da seção não pode ficar escondido atrás da navegação em pílula.
6. Logo/imagem ausente (instituição sem logo): mantém o fallback atual `assets/img/others/formacao.png`, sem imagem quebrada.

(Cada linha tem seu teste na tarefa dona do código: 1→T1, 2→T8, 3→T6, 4→T8, 5→T2, 6→T5.)

---

### Task 1: Fundações — tokens, fonte, tema escuro padrão, primitivas bento

**Files:**
- Create: `src/scss/_tokens.scss`, `src/scss/_bento.scss`, `src/css/bento.scss`
- Modify: `angular.json` (adicionar `src/css/bento.scss` ao fim de `styles`, no build e no test se existir), `src/index.html` (fonte + fallback do tema), `src/app/services/theme.service.ts` (`DEFAULT_THEME`), `src/styles.scss` (remover tokens duplicados se migrarem)
- Test: `src/app/services/theme.service.spec.ts`

**Interfaces:**
- Produces: tokens CSS `--bg`, `--bg-elevated`, `--surface`, `--surface-border`, `--text`, `--text-muted`, `--accent`, `--accent-rgb`, `--violet`, `--cyan`, `--radius-card: 22px`, `--radius-pill`, `--space-1..6`, `--shadow-card`, `--font-sans`; por tema via `:root` e `[data-bs-theme='dark'|'light']` (valores do mockup). Classes: `.bento` (grid 12 colunas, gap 14px; colapsa a 1 coluna `<860px`), `.tile` (vidro + borda em gradiente + hover), `.tile--span-{3,4,5,7,8,12}`, `.tile--row-2`, `.eyebrow`, `.pill`, `.mesh-bg` (fundo com 3 blobs, `position: fixed`, `pointer-events: none`).

- [ ] **Step 1: Escrever testes de tema em `theme.service.spec.ts`:**
  - `'should default to dark when nothing is stored'`: sem `localStorage`, `service.theme() === 'dark'` e `resolvedTheme() === 'dark'` mesmo com `matchMedia` retornando `matches: false`.
  - `'should honor stored auto'`: `localStorage['app-theme']='auto'` + `matchMedia` claro ⇒ `resolvedTheme() === 'light'`.
  - `'should honor stored light'`: ⇒ `'light'`.
  - Ajustar o teste existente `'should default to auto theme'` (linha ~25) para o novo padrão.
- [ ] **Step 2:** `pnpm vitest run src/app/services/theme.service.spec.ts` ⇒ FAIL (padrão ainda é `'auto'`).
- [ ] **Step 3:** Em `theme.service.ts` trocar `DEFAULT_THEME` para `'dark'`. Em `index.html` o script inline passa a usar `'dark'` quando não há valor `light|dark` salvo **e** não há `'auto'` salvo (se `'auto'`, mantém `matchMedia`); no `catch` também `'dark'`.
- [ ] **Step 4:** `pnpm vitest run src/app/services/theme.service.spec.ts` ⇒ PASS.
- [ ] **Step 5:** Criar `_tokens.scss`, `_bento.scss`, `bento.scss` (`@use '../scss/tokens'; @use '../scss/bento';`), registrar em `angular.json`; trocar o `<link>` de Google Fonts por `Inter:wght@400;500;600;700;800` com `display=swap` (CSP já permite `fonts.gstatic.com`); `body { font-family: var(--font-sans) }`. Reaproveitar `--brand-accent*` existentes como alias dos novos tokens até a Task 8, para não quebrar regras legadas.
- [ ] **Step 6:** `pnpm run build:prod` ⇒ sem erro de budget; `pnpm run test:e2e:chromium -- theme-toggle` ⇒ PASS.
- [ ] **Step 7: Commit** — `feat(theme): adicionar tokens de design, fonte Inter e tema escuro padrão`

---

### Task 2: Navegação em pílula

**Files:**
- Modify: `src/app/components/pages/navigation/navigation.component.html`, `navigation.component.scss` (≤3 kB), `src/css/styles.scss` (remover regras `#mainNav*` ~linhas 251–526 que ficarem sem uso), `src/styles.scss` (`--navbar-height-*` novos), `src/app/components/theme-toggle/theme-toggle.component.ts` (cores do botão por token)
- Test: `e2e/specs/navigation.spec.ts`, `navigation.component.spec.ts`

**Interfaces:**
- Consumes: tokens e `.pill` da Task 1.
- Produces: `--navbar-height-normal|shrink|mobile` recalculados para a pílula (usados por `scroll-margin-top` de `section[id]`).

- [ ] **Step 1: Teste e2e (Review Focus 5)** em `navigation.spec.ts`: `'deve deixar o título da seção abaixo da navegação após clicar no link'` — para cada `nav-about|skills|courses|contact`: clicar, aguardar `scrollend`/estabilizar, e afirmar `sectionHeading.boundingBox().y >= nav.boundingBox().y + nav.boundingBox().height`.
- [ ] **Step 2:** Rodar o spec ⇒ FAIL ou PASS conforme a altura atual; registrar o resultado.
- [ ] **Step 3:** Reestilizar `#mainNav` como pílula flutuante (sticky/fixed com margem, `backdrop-filter`, borda `--surface-border`). Manter intactos: lógica de `navbar-shrink`, `activeSection`, `closeMenu()`, `toggleMenu()`, skip-link e todos os `data-testid`. Mobile: menu colapsado vira painel `.tile` abaixo da pílula.
- [ ] **Step 4:** Ajustar `--navbar-height-*` à altura real medida da pílula (três estados).
- [ ] **Step 5:** `pnpm vitest run src/app/components/pages/navigation` e `pnpm run test:e2e:chromium -- navigation theme-toggle language-switching` ⇒ PASS.
- [ ] **Step 6: Commit** — `feat(nav): navegação em pílula flutuante com vidro fosco`

---

### Task 3: Masthead — hero em bento com retrato e métricas

**Files:**
- Create: `src/app/utils/career.utils.ts`, `src/app/utils/career.utils.spec.ts`, `src/scss/sections/_hero.scss`
- Modify: `masterhead.component.html`, `masterhead.component.ts`, `masterhead.component.spec.ts`, `src/assets/i18n/pt-BR.json` e `en-US.json`, `src/css/bento.scss`, `src/css/styles.scss` (remover `header.masthead*` e `.masthead-photo`, ~linhas 380–526)
- Delete: `src/assets/img/header-bg.jpg` (somente se `grep -rn header-bg src` não achar mais nada)

**Interfaces:**
- Produces: `yearsSince(startYear: number, now: Date = new Date()): number` em `career.utils.ts`; `CAREER_START_YEAR = 2001` (primeira entrada da timeline de Sobre). `MasterheadComponent.stats: readonly { labelKey: string; value: string }[]` com 4 itens: anos (`yearsSince`), cursos (`getCourses().length`), (pós)graduações (`getGraduations().length`), livros (`getBooks().length`), formatados `"N+"` para anos e `"N"` para os demais. Chaves i18n novas: `masterhead.stats.years|courses|graduations|books`.

- [ ] **Step 1: Testes** — `career.utils.spec.ts`: `yearsSince(2001, new Date('2026-10-18')) === 25`; `yearsSince(2001, new Date('2001-06-01')) === 0`; ano futuro ⇒ `0` (nunca negativo). `masterhead.component.spec.ts`: renderiza `data-testid` `masthead`, `masthead-contact`, `masthead-linkedin`, `masthead-resume`; 4 elementos `[data-testid="masthead-stat"]`; imagem do retrato com `alt` de `contact.photoAlt`.
- [ ] **Step 2:** `pnpm vitest run src/app/utils/career.utils.spec.ts src/app/components/pages/masterhead` ⇒ FAIL.
- [ ] **Step 3:** Implementar `yearsSince` (diferença de anos completos, piso 0) e `stats` no componente (lendo `DataService`).
- [ ] **Step 4:** Reescrever o template do hero conforme o mockup: tile principal (eyebrow, `<h1>` com nome, role, tagline, 3 CTAs com os mesmos handlers), tile do retrato (`NgOptimizedImage` `ngSrc="assets/img/myimage.jpg"` 480×480 `priority`, `object-fit: cover; object-position: center top`, gradiente inferior com legenda de cidade e role vindos de `getProfile()`), 4 tiles de métrica. O `<h1>` usa gradiente de texto só em uma palavra de destaque se a chave i18n existente permitir; **não** criar o texto "Disponível para projetos" (não aprovado). Remover o `background-image` de `header-bg.jpg`; mesh de fundo via `.mesh-bg` no `app-home`.
- [ ] **Step 5:** Verificar `pnpm vitest run`, `pnpm run test:e2e:chromium -- home contact` ⇒ PASS; conferir visualmente claro/escuro (a foto tem fundo cinza claro: usar overlay do tema, aceitar retângulo arredondado — Ponto aberto do spec).
- [ ] **Step 6: Commit** — `feat(masthead): hero em bento com retrato e métricas calculadas`

---

### Task 4: Sobre — timeline compacta em card

**Files:**
- Modify: `about.component.html`, `about.component.spec.ts`, `src/scss/sections/_about.scss` (criar), `src/css/bento.scss`, `src/css/styles.scss` (remover `.timeline*` ~667–858 **só depois** da Task 5, pois Graduação ainda usa a classe)

**Interfaces:**
- Consumes: `.tile`, `.eyebrow`. Produces: `.bento-timeline` (lista vertical com marcador dourado) reutilizada pela Task 5.

- [ ] **Step 1: Teste** — spec renderiza `about-title`, `about-subtitle` e exatamente **6** itens `.bento-timeline li` (valor atual: 6 `<li>` no template; reconfirmar com `grep -c "<li" about.component.html`).
- [ ] **Step 2:** `pnpm vitest run src/app/components/pages/about` ⇒ FAIL.
- [ ] **Step 3:** Trocar a timeline de dois lados por `.bento-timeline` dentro de um `.tile` (ícone `bi-*` existente de cada item vira o marcador; `h4` período + título + descrição preservam as mesmas chaves i18n).
- [ ] **Step 4:** `pnpm vitest run src/app/components/pages/about && pnpm run test:e2e:chromium -- home` ⇒ PASS.
- [ ] **Step 5: Commit** — `feat(about): timeline compacta em card bento`

---

### Task 5: Skills, (Pós)Graduação e Trilhas

**Files:**
- Modify: `skills.component.html`/`.spec.ts`, `graduation.component.html`/`.spec.ts`, `formationcourse.component.html`/`.spec.ts`, `src/scss/sections/_skills.scss`, `_cards.scss` (criar), `src/css/bento.scss`, `src/css/styles.scss` (agora remover `.timeline*`)

**Interfaces:**
- Consumes: `.bento`, `.tile`, `.pill`, `.bento-timeline`. Produces: `data-testid="graduation-card"` e `data-testid="formation-card"` (novos), `.item-card` (logo 56px + título + meta) para listas.

- [ ] **Step 1: Testes** — skills: um `.tile` por `skillGroups` e um `.pill` por skill (contagens vindas de `DataService.getSkillGroups()`); graduation: um `graduation-card` por item, e com `institutionLogo` vazio o `<img>` usa `assets/img/others/formacao.png` (Review Focus 6); formationcourse: um `formation-card` por item na página atual e `pagination-controls` presente.
- [ ] **Step 2:** `pnpm vitest run src/app/components/pages/{skills,graduation,formationcourse}` ⇒ FAIL.
- [ ] **Step 3:** Skills em bento (cada grupo um tile; cor de acento do ponto por índice via `--tile-hue` em CSS, sem dados novos). Graduação e Trilhas como grid de `.item-card` dentro de tiles, mantendo `sortby`, `paginate`, `trackBy*`, badge de quantidade e `imgcurso`.
- [ ] **Step 4:** Testes unitários ⇒ PASS; `pnpm run build:prod` (budgets) ⇒ OK.
- [ ] **Step 5: Commit** — `feat(skills,formacao): migrar skills, graduação e trilhas para bento`

---

### Task 6: Cursos e Livros em grid de cards

**Files:**
- Modify: `course.component.html`/`.scss`/`.spec.ts`, `book.component.html`/`.scss`/`.spec.ts`, `src/scss/sections/_catalog.scss` (criar), `src/css/bento.scss`, `src/css/styles.scss` (remover `.list-group-light`, `.badge-offset`, `.icon-favorite` se órfãos)

**Interfaces:**
- Consumes: `.item-card`, `.pill`. Produces: toolbar `.catalog-toolbar` (busca + filtros em `.tile`) compartilhada pelos dois.

- [ ] **Step 1: Testes** — nos specs de course e book: (a) com a lista de dados real, renderiza um `course-card`/`book-card` por item da página; (b) **Review Focus 3:** definir a busca com um termo sem correspondência ⇒ nenhum `course-card`/`book-card` e nenhum erro lançado; (c) item `favorite` mostra a estrela; item com `certificateUrl` mostra o link do certificado.
- [ ] **Step 2:** `pnpm vitest run src/app/components/pages/{course,book}` ⇒ FAIL onde o markup mudar.
- [ ] **Step 3:** Converter `<ul class="list-group">` em grid responsivo de `.item-card` (1/2/3 colunas), preservando: `data-testid` dos cards, busca, filtros por instituição/editora e tags (`btn-check`), chips de filtros ativos, `appHighlight`, `paginate` + `pagination-controls`, `absoluteIndex`, handlers de analytics. Capas reais de livros ficam **fora desta tarefa** (pendente de decisão do usuário): usar o logo da editora como hoje.
- [ ] **Step 4:** `pnpm vitest run && pnpm run test:e2e:chromium -- courses books` ⇒ PASS.
- [ ] **Step 5: Commit** — `feat(cursos,livros): grid de cards bento preservando filtros e paginação`

---

### Task 7: Contato e Footer

**Files:**
- Modify: `contact.component.html`/`.scss`/`.spec.ts`, `footer.component.html`/`.spec.ts`, `src/scss/sections/_contact.scss` (criar), `src/css/bento.scss`, `src/css/styles.scss` (remover `section#contact*`, `.footer`, `.contact-section`)

**Interfaces:** Consumes `.tile`, `.eyebrow`.

- [ ] **Step 1: Testes** — contact: `contact-section`, `contact-email` (href `mailto:` com o e-mail do perfil), `contact-resume`, e um link por entrada de `urlList`; footer: texto de copyright e os dois links externos (`rel="noopener"`).
- [ ] **Step 2:** `pnpm vitest run src/app/components/pages/{contact,footer}` ⇒ FAIL onde mudar.
- [ ] **Step 3:** Contato como tile de destaque com gradiente dourado (foto circular existente, e-mail, currículo, redes); footer em linha fina com borda superior. Links e handlers intactos.
- [ ] **Step 4:** `pnpm vitest run && pnpm run test:e2e:chromium -- contact` ⇒ PASS.
- [ ] **Step 5: Commit** — `feat(contato): contato e rodapé no estilo bento`

---

### Task 8: Movimento, responsividade e limpeza do CSS legado

**Files:**
- Create: `src/scss/_motion.scss`, `e2e/specs/layout.spec.ts`
- Modify: `src/css/bento.scss`, `src/css/styles.scss` (apagar o que sobrar do Agency), `src/styles.scss` (remover aliases `--brand-*` se não houver mais uso)

**Interfaces:** Produces: `.reveal` (entrada ao rolar via `animation-timeline: view()` dentro de `@supports`; sem suporte, o elemento fica visível e estático — **desvio do spec**, que previa IntersectionObserver; escolhido por simplicidade, sinalizado ao usuário), aplicado aos `.tile`.

- [ ] **Step 1: Testes e2e em `layout.spec.ts`:** (a) **Review Focus 2:** em `en-US` (via `language-switcher`) com viewport 375×800, `document.documentElement.scrollWidth <= window.innerWidth` e o mesmo em 768 e 1280; (b) **Review Focus 4:** com `page.emulateMedia({ reducedMotion: 'reduce' })`, o primeiro `.tile.reveal` fora da viewport, após rolar até ele, tem `getComputedStyle(...).opacity === '1'`; (c) `html[data-bs-theme]` ∈ `{dark, light}` e o tema padrão sem storage é `dark`.
- [ ] **Step 2:** `pnpm run test:e2e:chromium -- layout` ⇒ FAIL (a classe `.reveal` não existe / overflow possível).
- [ ] **Step 3:** Implementar `_motion.scss` (`@media (prefers-reduced-motion: no-preference)` + `@supports (animation-timeline: view())`); corrigir overflow encontrado.
- [ ] **Step 4: Limpeza:** para cada seletor restante em `src/css/styles.scss`, confirmar com `grep -rn "<classe>" src/app src/index.html` que não é usado e apagar (`#portfolio*`, `.portfolio-modal*`, `.team-member`, `.btn-social`, `.fontemenor*` etc. quando órfãos). Mover para `src/scss/` o que ainda for usado. Remover o arquivo se esvaziar (e a entrada em `angular.json`).
- [ ] **Step 5: Verificação final:** `pnpm run lint`, `pnpm run test:nowatch`, `pnpm run build:prod` (sem warnings de budget), `pnpm run test:e2e:chromium` ⇒ tudo PASS; conferência visual em claro/escuro × 375/768/1280 px.
- [ ] **Step 6:** Adicionar `.superpowers/` ao `.gitignore` (hoje não está) e **Commit** — `refactor(styles): remover CSS legado do template Agency e adicionar movimento`

---

## Self-review (spec × plano)

- Todas as seções do escopo cobertas: Nav (T2), Masthead (T3), Sobre (T4), Skills/Graduação/Trilhas (T5), Cursos/Livros (T6), Contato/Footer (T7). Tokens, tema escuro, tipografia, limpeza e budgets (T1, T8).
- Pontos abertos do spec: foto 480px (T3, usar como está) · capas de livros (T6, adiado, só logo de editora) · fundo cinza da foto (T3).
- Divergências do spec, a confirmar com o usuário: (1) animação sem fallback de IntersectionObserver (T8); (2) as métricas calculadas dão **25+** anos em 2026, enquanto os textos fixos de i18n/SEO dizem "23+" (não alterados, fora do escopo); (3) "Disponível para projetos" omitido.
