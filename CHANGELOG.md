# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2026-05-26

### Changed

#### Framework
- Upgrade Angular 21.0.8 → 21.2.14 (latest stable)
- Upgrade @angular/cli 21.0.5 → 21.2.12
- Upgrade @angular-devkit/build-angular 21.0.5 → 21.2.12
- Upgrade @angular-eslint/* 21.1.0 → 21.4.0
- Upgrade @playwright/test 1.57.0 → 1.60.0
- Upgrade typescript-eslint 8.53.0 → 8.60.0
- Upgrade eslint 9.39.1 → 9.39.4

#### Linting
- Migrado de `.eslintrc.json` (legacy) para `eslint.config.js` (flat config ESLint 9)
- Adicionado override para `*.spec.ts`: `@typescript-eslint/no-explicit-any` desativado, `no-unused-vars` com suporte a prefixo `_`

#### Tests
- Corrigido suporte a `localStorage` no ambiente de testes jsdom + Angular 21.2.x
- Adicionado mock funcional de `localStorage` no `test-setup.ts` após `initTestEnvironment`
- Corrigidas variáveis não utilizadas em 4 arquivos de spec (prefixo `_`)
- 497/497 testes unitários passando

### Removed
- Artefatos de tentativa anterior de upgrade: `package-lock.json.backup`, `dependency-report-before.txt`, `stats-before.json`, `test-results-before.txt`

## [2.1.0] - 2026-01-12

### Security
- Resolvidas 11 vulnerabilidades HIGH relacionadas ao @angular/compiler

### Changed

#### Framework
- Atualizado Angular de 21.0.6 para 21.0.8
- Atualizado @angular/cli de 21.0.4 para 21.0.5
- Atualizado @angular-devkit/build-angular de 21.0.4 para 21.0.5
- Mantido TypeScript 5.9.3 (compatível com Angular 21)

#### Testing & Quality
- Atualizado Vitest de 4.0.16 para 4.0.17
- Atualizado @playwright/test de 1.57.0 para versão mais recente
- Atualizado typescript-eslint de 8.51.0 para 8.53.0
- @angular-eslint já estava na versão 21.1.0 (mais recente)

#### Build Tools
- Atualizado Vite para versão mais recente
- Atualizado webpack-bundle-analyzer para versão mais recente
- Atualizado http-server para versão mais recente
- Atualizado cross-env para versão mais recente

#### Runtime Dependencies
- RxJS mantido em 7.8.2 (compatível)
- Zone.js atualizado para versão mais recente
- Bootstrap mantido em 5.3.8 (aguardando Bootstrap 6 para @use/@forward)
- Atualizado @popperjs/core para versão mais recente
- Atualizado bootstrap-icons de 1.13.1 para versão mais recente
- Atualizado tslib para versão mais recente
- Atualizado jsdom e @types/jasmine para versões mais recentes

### Notes
- Projeto mantém arquitetura zoneless + standalone
- Todos os 497 testes passando (unit tests)
- Build size dentro dos budgets definidos
- 0 vulnerabilidades de segurança (redução de 11 HIGH)
- Warnings SCSS @import permanecem (esperado até Bootstrap 6)
- 46 erros de lint existentes (principalmente uso de `any` em testes) - não impedem funcionamento

### Technical Details
- Node.js: >= 22.12
- TypeScript: 5.9.3
- Angular: 21.0.8
- Vitest: 4.0.17
- Playwright: 1.57.0

---

## [2.0.0] - (data anterior)

### Initial Release
- Portfolio pessoal Angular v21+ usando arquitetura standalone
- Zoneless change detection (signals-based)
- Vitest para testes unitários
- Playwright para testes E2E
- Bootstrap 5.3 + SCSS
- Angular ESLint + Prettier
