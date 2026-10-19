# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio pessoal Angular v22+ usando arquitetura standalone, zoneless change detection e Vitest para testes. Aplicação estática com dados hardcoded em arquivos TypeScript.

## Tech Stack

- **Framework:** Angular 22+ (standalone components, zoneless)
- **Testing:** Vitest (unit) + Playwright (E2E)
- **Styling:** SCSS com design tokens próprios (layout Bento Grid) + Bootstrap 5.3 só para grid/utilitários/formulários
- **Linting:** Angular ESLint + Prettier
- **Build:** Angular CLI com esbuild
- **Node:** >= 24
- **Package manager:** pnpm 11

## Development Commands

### Start Development
```bash
pnpm start              # dev server on :4200
pnpm run dev            # same as start but opens browser
pnpm run start:prod     # production mode locally
```

### Build
```bash
pnpm run build          # development build
pnpm run build:prod     # production optimized build
pnpm run build:analyze  # build + bundle analysis
pnpm run watch          # build with watch mode
```

### Testing

#### Unit Tests (Vitest)
```bash
pnpm test                # watch mode
pnpm run test:nowatch    # single run
pnpm run test:coverage   # with coverage report
pnpm run test:ui         # Vitest UI
```

#### E2E Tests (Playwright)
```bash
pnpm run test:e2e           # all browsers
pnpm run test:e2e:chromium  # chromium only
pnpm run test:e2e:firefox   # firefox only
pnpm run test:e2e:ui        # interactive UI mode
pnpm run test:e2e:debug     # debug mode
pnpm run test:e2e:report    # show last report
```

### Code Quality
```bash
pnpm run lint           # run ESLint
pnpm run lint:fix       # auto-fix issues
pnpm run format         # format with Prettier
pnpm run format:check   # check formatting only
pnpm run security:check # pnpm audit
```

### Cleanup
```bash
pnpm run clean          # remove dist, cache, .angular
```

## Architecture

### Routing Pattern
- Existe uma única rota real (`app.routes.ts` → `home.routes.ts` → `HomeComponent`); todas as rotas desconhecidas redirecionam para home
- O code-splitting de fato é feito via `@defer (on viewport; prefetch on idle)` em `home.component.ts`, não pelo Router

### Component Structure
- **BasePageComponent:** classe base abstrata para páginas com lógica compartilhada (ex: bg-light)
- **Pages:** `src/app/components/pages/*` - componentes de página standalone
- **Utils:** `src/app/components/utils/*` - componentes reutilizáveis (loading, placeholder, counter)
- **Services:** camada de dados e utilitários

### Data Flow
- **DataService** (`src/app/services/data-service.ts`): provê acesso readonly aos dados via Proxy
- Dados hardcoded em `src/app/data/*` (Profile, Course, Book, Graduation, FormationCourse)
- Interfaces em `src/app/interfaces/*`
- Enums para tags e categorias em `src/app/models/*`

### Serviços Especializados

#### Performance & Tracking
- **PerformanceMonitorService**: Monitora métricas de performance da aplicação
- **EngagementTrackingService**: Rastreia engajamento do usuário
- **VirtualPageTrackingService**: Tracking de visualizações virtuais para analytics

#### Utilitários
- **DataTransformationService**: Transformações de dados complexas
- **PaginationService**: Lógica de paginação centralizada
- **SEOService**: Gerenciamento de meta tags e otimizações SEO
- **LanguageService**: Gerenciamento de internacionalização (i18n)

### Path Aliases (tsconfig.json & vite.config.ts)
```typescript
@path-components/*   → ./src/app/components/*
@path-services/*     → ./src/app/services/*
@path-data/*         → ./src/app/data/*
@path-interfaces/*   → ./src/app/interfaces/*
@path-pipes/*        → ./src/app/pipes/*
@path-utils/*        → ./src/app/utils/*
@path-app/*          → ./src/app/*
@path-environments/* → ./src/environments/*
```

### Configuration
- **app.config.ts:** zoneless change detection, Google Analytics, router com scroll restoration
- **Environment files:** `src/environments/` com file replacement no build
- **Vitest:** configuração customizada em `vite.config.ts` com plugin para resolver templates Angular
- **Playwright:** base URL `http://localhost:4200`, auto-start dev server

### Testing Setup
- **Vitest:** usa jsdom, setup em `src/test-setup.ts`
- **Coverage exclusions:** test files, configs, main.ts, environments
- **Playwright:** testes em `e2e/`, múltiplos browsers (chromium, firefox, mobile-chrome). Se o navegador não estiver instalado: `pnpm exec playwright install`
- **E2E e `@defer`:** o conteúdo abaixo da dobra só entra no DOM depois de rolar; use `HomePage.loadDeferredContent()` (`e2e/pages/home.page.ts`) antes de localizar seções
- **Vitest e templates:** o plugin em `vite.config.ts` inlina `templateUrl`; por isso `test.experimental.fsModuleCache` está **desligado** (com o cache em disco, mudança só no `.html` servia o template antigo). Não reative

### Styling Notes
- Layout **Bento Grid**: cards de vidro (`.tile`) sobre fundo em mesh, tema escuro por padrão
- Entrypoints globais (em `angular.json`): `src/css/styles.scss` (Bootstrap customizado + âncoras/skip-link/foco) → `src/css/bento.scss` (design system, carregado por último)
- `src/scss/_tokens.scss`: tokens em CSS custom properties (`--bg`, `--surface`, `--text`, `--accent`, `--radius-card`, `--space-*`...). Tema via `[data-bs-theme]` em `<html>` (escrito por `ThemeService`; padrão `dark`; valores salvos `light|dark|auto` são respeitados)
- `src/scss/_bento.scss`: primitivas `.bento` (grid 12 colunas, 1 coluna <860px), `.tile`, `.pill`, `.eyebrow`, `.mesh-bg`
- `src/scss/sections/*`: um parcial por seção (`_nav`, `_hero`, `_about`, `_skills`, `_cards`, `_catalog`, `_contact`, `_section`); registrar novos em `src/css/bento.scss` com `@use`
- `src/scss/_motion.scss`: entrada dos cards com scroll-driven animations (`.tile`), só em `@media screen` + `prefers-reduced-motion: no-preference` + `@supports (animation-timeline)`
- `.card-grid` (flex com crescimento): 1 coluna (<768px), 2 (≥768px), 4 (≥1100px; `.card-grid--3` usa 3). A última linha sempre estica para ficar completa. Tamanhos de página: Cursos, Livros e Trilhas 8 (4x2) — manter múltiplos de 4
- Filtros de Cursos/Livros (tags, instituições/editoras) são acordeões: `ChipsAccordionDirective` (`src/app/directives/chips-accordion.directive.ts`, `exportAs: 'chipsAccordion'`) na `.catalog-chips-list` recolhe em uma linha (`.is-collapsed`, `max-height`); a seta `.catalog-toggle` só aparece quando algum chip quebra de linha (`overflowing()`, medido com ResizeObserver; sem layout, como no jsdom, assume `true`); `:focus-within` abre a lista para o foco por teclado nunca cair num chip oculto. Fieldsets usam `.catalog-chips--collapsible` (grade com a coluna da seta de largura fixa para não oscilar)
- Favorito é um selo (`.item-favorite`) no canto inferior direito do logo (`.item-logo-wrap`), não mais uma estrela no título
- A navegação em pílula é escura nos dois temas (o logo `robsonalves.png` só tem contraste em fundo escuro); ao mudar a altura dela, atualizar só `--navbar-height-normal|mobile` em `src/css/styles.scss` (a rolagem por âncora em `navigation.component.ts` lê essas variáveis)
- O skip-link aponta para `#main-content` (o `<header>` do masthead, `tabindex="-1"`), que existe antes do `@defer`
- Estilos novos vão em parciais globais, não em `styles:` de componente (budget de 3 kB por componente)
- Bootstrap Icons via CSS; SCSS como `inlineStyleLanguage` padrão
- `@import` só em `src/scss/_bootstrap-custom.scss` (Bootstrap 5.x); SCSS novo usa `@use`
- Bootstrap importado: só módulos usados (ver `_bootstrap-custom.scss`; `progress`, `close`, `card`, `badge` e `list-group` **não** estão importados)

### Imagens
- Retrato único otimizado em `src/assets/img/profile.webp` (800x800), usado no hero e no contato; `myimage.jpg` segue em og:image/SEO
- Originais de alta resolução ficam fora do bundle (`.superpowers/originals/`, ignorado pelo git)

### Conteúdo calculado vs. fixo
- O hero calcula anos de experiência (`yearsSince(CAREER_START_YEAR)` em `src/app/utils/career.utils.ts`, início em 2001) e conta cursos/livros/graduações pelos dados
- Os textos fixos (i18n `pt-BR.json`/`en-US.json`, `seo.service.ts`, `virtual-page-tracking.service.ts`) dizem "25+ anos": atualizar manualmente quando o número virar

### Performance Optimizations
- Zoneless change detection (signals-based)
- Lazy loading de rotas
- OnPush change detection strategy nos componentes
- DataService usa Proxy para evitar clones desnecessários
- Memoization utils em `src/app/utils/memoize.utils.ts`

### Bundle Budgets (production)
- Initial: warn 600kB, error 800kB
- Component styles: warn 3kB, error 5kB
- Polyfills: warn 100kB, error 150kB

## Code Conventions

- **Components:** ChangeDetectionStrategy.OnPush por padrão
- **Signals:** usar input() para inputs de componentes (implementado em BasePageComponent)
- **Pipes:** standalone, pure quando possível
- **Services:** providedIn: 'root'
- **File naming:** dot-separated (ex: `data-service.ts`, `base-page.component.ts`)

## Known Issues

### SCSS @import Deprecation Warnings ⚠️ (Resolvido)

**Status**: Silenciados via configuração no `angular.json` (Angular CLI 22+)
**Root Cause**: Bootstrap 5.3.8 usa `@import` (deprecated em Dart Sass)
**Impacto**: Nenhum (apenas informativo até Dart Sass 3.0)
**Resolução Planejada**: Migração para Bootstrap 6 + @use/@forward, quando estável

**Como foi resolvido**
A partir do Angular CLI 22, o builder `@angular/build:application` passou a suportar
`stylePreprocessorOptions.sass.silenceDeprecations` no `angular.json`. O `.sassrc.json`
continua **não sendo lido** pelo Angular CLI (arquivo pode ser removido ou mantido apenas
como referência para ferramentas externas de Sass).

```json
"options": {
  "stylePreprocessorOptions": {
    "sass": {
      "silenceDeprecations": ["import"]
    }
  }
}
```

Validado com `npm run build`, `npm run build:prod` e `npm run test:nowatch`: zero warnings
de deprecation, build e testes passando normalmente.

**Referências**:
- [Sass @import deprecation](https://sass-lang.com/documentation/at-rules/import)
- [Bootstrap 6 roadmap](https://github.com/twbs/bootstrap/discussions)
- Arquivos afetados: `src/scss/_bootstrap-custom.scss`, `src/css/styles.scss`

<!-- code-review-graph MCP tools -->
## MCP Tools: code-review-graph

**IMPORTANT: This project has a knowledge graph. ALWAYS use the
code-review-graph MCP tools BEFORE using Grep/Glob/Read to explore
the codebase.** The graph is faster, cheaper (fewer tokens), and gives
you structural context (callers, dependents, test coverage) that file
scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes_tool` or `query_graph_tool` instead of Grep
- **Understanding impact**: `get_impact_radius_tool` instead of manually tracing imports
- **Code review**: `detect_changes_tool` + `get_review_context_tool` instead of reading entire files
- **Finding relationships**: `query_graph_tool` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview_tool` + `list_communities_tool`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Key Tools

| Tool | Use when |
| ------ | ---------- |
| `detect_changes_tool` | Reviewing code changes — gives risk-scored analysis |
| `get_review_context_tool` | Need source snippets for review — token-efficient |
| `get_impact_radius_tool` | Understanding blast radius of a change |
| `get_affected_flows_tool` | Finding which execution paths are impacted |
| `query_graph_tool` | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes_tool` | Finding functions/classes by name or keyword |
| `get_architecture_overview_tool` | Understanding high-level codebase structure |
| `refactor_tool` | Planning renames, finding dead code |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes_tool` for code review.
3. Use `get_affected_flows_tool` to understand impact.
4. Use `query_graph_tool` pattern="tests_for" to check coverage.
