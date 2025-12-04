# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio pessoal Angular v21+ usando arquitetura standalone, zoneless change detection e Vitest para testes. Aplicação estática com dados hardcoded em arquivos TypeScript.

## Tech Stack

- **Framework:** Angular 21+ (standalone components, zoneless)
- **Testing:** Vitest (unit) + Playwright (E2E)
- **Styling:** Bootstrap 5.3 + SCSS
- **Linting:** Angular ESLint + Prettier
- **Build:** Angular CLI com esbuild
- **Node:** >= 22.12

## Development Commands

### Start Development
```bash
npm start              # dev server on :4200
npm run dev            # same as start but opens browser
npm run start:prod     # production mode locally
```

### Build
```bash
npm run build          # development build
npm run build:prod     # production optimized build
npm run build:analyze  # build + bundle analysis
npm run watch          # build with watch mode
```

### Testing

#### Unit Tests (Vitest)
```bash
npm test                # watch mode
npm run test:nowatch    # single run
npm run test:coverage   # with coverage report
npm run test:ui         # Vitest UI
```

#### E2E Tests (Playwright)
```bash
npm run test:e2e           # all browsers
npm run test:e2e:chromium  # chromium only
npm run test:e2e:firefox   # firefox only
npm run test:e2e:ui        # interactive UI mode
npm run test:e2e:debug     # debug mode
npm run test:e2e:report    # show last report
```

### Code Quality
```bash
npm run lint           # run ESLint
npm run lint:fix       # auto-fix issues
npm run format         # format with Prettier
npm run format:check   # check formatting only
npm run security:check # npm audit
```

### Cleanup
```bash
npm run clean          # remove dist, cache, .angular
```

## Architecture

### Routing Pattern
- Lazy loading usando `loadComponent` e `loadChildren`
- Routes em `app.routes.ts` carregam `home.routes.ts`
- Todas as rotas desconhecidas redirecionam para home

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

### Path Aliases (tsconfig.json & vite.config.ts)
```typescript
@path-components/*   → ./src/app/components/*
@path-services/*     → ./src/app/services/*
@path-data/*         → ./src/app/data/*
@path-interfaces/*   → ./src/app/interfaces/*
@path-pipes/*        → ./src/app/pipes/*
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
- **Playwright:** testes em `e2e/`, múltiplos browsers (chromium, firefox, mobile-chrome)

### Styling Notes
- Bootstrap 5.3 integrado via SCSS
- Estilos globais: `src/styles.scss` e `src/css/styles.scss`
- Bootstrap Icons via CSS
- SCSS como `inlineStyleLanguage` padrão
- Evitar `@import` no SCSS para compatibilidade Bootstrap 5.x

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
- **Signals:** usar input() para inputs de componentes
- **Pipes:** standalone, pure quando possível
- **Services:** providedIn: 'root'
- **File naming:** dot-separated (ex: `data-service.ts`, `base-page.component.ts`)
