# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Unreleased]

## [3.0.0] - 2025-11-24

### Added
- Suporte ao Angular 21.0.0 com todas as novas funcionalidades
- Detecção de mudanças zoneless agora production-ready
- Migração automática de control flow para nova sintaxe block
- Dependência @standard-schema/spec para compatibilidade com @angular/forms

### Changed
- **BREAKING CHANGE**: Upgrade de Angular 20.3.2 para 21.0.0
- Atualizado @angular/* packages de ^20.3.x para ^21.0.0
- Atualizado @angular-eslint/* de ^20.5.1 para ^21.0.0
- Atualizado TypeScript de 5.9.2 para 5.9.3
- Atualizado Bootstrap de 5.3.7 para 5.3.8
- Migração automática de templates para control flow syntax (3 arquivos):
  - `language-switcher.component.html`
  - `animated-counter.component.ts`
  - `language-switcher.component.ts`

### Fixed
- Compatibilidade com peer dependencies do Angular 21
- Testes unitários validados (130/130 passando)
- Testes E2E validados (35/35 passando)

### Performance
- Redução de bundle size: 584.92 kB → 583.66 kB (raw)
- Redução de bundle size: 118.08 kB → 117.74 kB (gzipped)
- Otimizações de change detection com zoneless stable

### Documentation
- Atualizado README.md com versões corretas
- Atualizado CLAUDE.md com stack tecnológica Angular 21
- Atualizado badges para refletir Angular 21.0

---

## [2.0.0] - 2025-11-23

### Added
- Implementação inicial do portfolio com Angular 20.2
- Standalone components em toda aplicação
- Zoneless change detection (experimental)
- Sistema de signals para gerenciamento de estado
- Testes E2E com Playwright
- CI/CD com GitHub Actions
- Deploy automático para Azure Static Web Apps

### Changed
- Migração completa para arquitetura standalone (sem NgModules)

---

[Unreleased]: https://github.com/robsonalvesdevbr/robsonalvesdevbr-angular/compare/v3.0.0...HEAD
[3.0.0]: https://github.com/robsonalvesdevbr/robsonalvesdevbr-angular/compare/v2.0.0...v3.0.0
[2.0.0]: https://github.com/robsonalvesdevbr/robsonalvesdevbr-angular/releases/tag/v2.0.0
