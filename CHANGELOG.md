# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
