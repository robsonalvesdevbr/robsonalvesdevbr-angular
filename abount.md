# 🚀 Robson Alves - Portfolio Angular

[![Angular](https://img.shields.io/badge/Angular-21.0-red?logo=angular)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-purple?logo=bootstrap)](https://getbootstrap.com/)
[![Node.js](https://img.shields.io/badge/Node.js-22.12+-green?logo=node.js)](https://nodejs.org/)
[![Build Status](https://img.shields.io/github/workflow/status/robsonalvesdevbr/robsonalvesdevbr-angular/CI)](https://github.com/robsonalvesdevbr/robsonalvesdevbr-angular/actions)
[![License](https://img.shields.io/github/license/robsonalvesdevbr/robsonalvesdevbr-angular)](LICENSE)

> 💼 Portfolio pessoal desenvolvido com **Angular 21.0**, **Signals**, **Standalone Components** e **Bootstrap 5** para demonstrar habilidades em desenvolvimento frontend moderno.

## 📖 Sobre o Projeto

Este projeto representa meu portfolio pessoal, desenvolvido como estudo prático das mais recentes funcionalidades do Angular 21, incluindo:

- ✨ **Signals** para gerenciamento de estado reativo
- 🎯 **Standalone Components** para arquitetura moderna
- 🎨 **Bootstrap 5** com Bootstrap Icons para UI/UX profissional
- 🚀 **Detecção de Mudanças Zoneless** (production-ready no Angular 21)
- 🔧 **Path Aliases personalizados** para melhor organização
- 📱 **Design Responsivo** para todos os dispositivos
- 📊 **Google Analytics** integrado via ngx-google-analytics

## ⚡ Quick Start

### Pré-requisitos

- **Node.js** 22.12+ ([Download](https://nodejs.org/))
- **npm** 10.0.0+ (incluído com Node.js)
- **Angular CLI** 21+ (será instalado automaticamente)

### 🚀 Instalação e Execução

```bash
# 1. Clone o repositório
git clone https://github.com/robsonalvesdevbr/robsonalvesdevbr-angular.git
cd robsonalvesdevbr-angular

# 2. Configure os Git Hooks (opcional)
git config core.hooksPath .githooks

# 3. Use a versão correta do Node.js (se usar nvm)
nvm use 22.12

# 4. Instale as dependências
npm install

# 5. Execute o projeto em modo desenvolvimento
npm start
# ou
ng serve

# 6. Acesse no navegador
# http://localhost:4200
```

## 🛠️ Desenvolvimento

### Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── base-page/        # Componente base para páginas
│   │   ├── pages/            # Componentes de páginas
│   │   └── utils/            # Componentes utilitários
│   ├── data/                 # Dados estáticos da aplicação
│   ├── directives/           # Diretivas personalizadas
│   ├── initializer/          # Inicializadores da aplicação
│   ├── interfaces/           # Interfaces TypeScript
│   ├── models/               # Enums e modelos de dados
│   ├── pipes/                # Pipes personalizados
│   ├── services/             # Serviços da aplicação
│   ├── app.component.ts      # Componente raiz (standalone)
│   ├── app.config.ts         # Configuração da aplicação
│   ├── app.routes.ts         # Configuração de rotas
│   └── main.ts              # Bootstrap da aplicação
├── assets/                   # Arquivos estáticos (imagens, fonts, etc.)
├── css/                      # Estilos SCSS personalizados
├── environments/             # Configurações de ambiente
└── styles.scss              # Estilos globais SCSS
```

### Arquivos de Configuração

| Arquivo          | Descrição                    |
| ---------------- | ---------------------------- |
| `angular.json`   | Configurações do Angular CLI |
| `package.json`   | Dependências e scripts npm   |
| `tsconfig.json`  | Configurações TypeScript com path aliases |
| `eslint.config.js` | Regras do ESLint           |
| `.prettierrc`    | Configurações do Prettier    |
| `CLAUDE.md`      | Instruções para Claude Code  |

## 🔧 Comandos Úteis

### 🅰️ Angular CLI

```bash
# Desenvolvimento
ng serve                           # Servidor de desenvolvimento
ng serve --open                   # Abre automaticamente no navegador
ng serve --host 0.0.0.0 --port 4200  # Acesso por IP da rede

# Geração de código
ng generate component feature/home          # Novo componente
ng generate service core/data              # Novo serviço
ng generate guard core/auth                # Novo guard
ng generate pipe shared/capitalize         # Novo pipe

# Angular Schematics avançados
ng generate @angular/core:standalone        # Migração para standalone
ng generate @angular/core:control-flow      # Migração para control flow
ng g @angular/core:cleanup-unused-imports   # Remove imports não utilizados

# Atualizações
ng update @angular/cli @angular/core       # Atualiza Angular
ng update @angular/material @angular/cdk   # Atualiza Material
```

### 🔍 Qualidade de Código

```bash
# Formatação
npm run format                   # Formata arquivos TS/HTML/SCSS/JSON
npm run format:check             # Verifica formatação

# Linting
npm run lint                     # ESLint verificação
npm run lint:fix                 # ESLint com correção automática

# Análise de dependências
npx browserslist                 # Browsers suportados
npm outdated                     # Dependências desatualizadas
npm audit                        # Vulnerabilidades de segurança
npm audit fix                    # Corrige vulnerabilidades automaticamente
```

### 📦 Gerenciamento de Dependências

```bash
# Instalação
npm install                      # Instala dependências
npm ci                          # Instalação limpa (CI/CD)

# Atualizações
npm update                       # Atualiza dependências
npm install -g npm-check-updates # Instala ncu globalmente
ncu -u                          # Atualiza package.json
npm install                      # Instala novas versões

# Limpeza
npm cache clean --force          # Limpa cache npm
rm -rf node_modules package-lock.json  # Reset completo
npm install                      # Reinstala tudo
```

### 📊 Análise e Performance

```bash
# Bundle analysis
ng build --stats-json                          # Gera estatísticas
npx webpack-bundle-analyzer dist/stats.json    # Analisa bundle

# Source map explorer
npm install -g source-map-explorer
ng build
npx source-map-explorer dist/**/*.js

# Lighthouse CI
npm install -g @lhci/cli
lhci autorun
```

### 🐙 Git & Deploy

```bash
# Git Hooks
git config core.hooksPath .githooks    # Configura hooks customizados

# GitHub Pages Deploy
ng build --base-href="/robsonalvesdevbr-angular/"  # Build para GitHub Pages
npx angular-cli-ghpages --dir=dist/robsonalvesdevbr-angular  # Deploy

# Deploy com GitHub Actions (automático via push)
git add .
git commit -m "feat: nova funcionalidade"
git push origin main
```

### 🔍 SonarQube (Análise de Código)

```bash
# SonarQube local (Docker)
docker run --rm --network=host \
  -e SONAR_HOST_URL="http://localhost:9000/" \
  -v "$(pwd):/usr/src" \
  sonarsource/sonar-scanner-cli \
  -D"sonar.projectKey=robsonalvesdevbr-angular" \
  -D"sonar.sources=." \
  -D"sonar.host.url=http://localhost:9000" \
  -D"sonar.token=seu_token_aqui"
```

## 🧪 Testes

```bash
# Testes unitários (Vitest)
npm test                         # Executa testes com watch
npm run test:nowatch             # Executa uma vez sem watch
npm run test:coverage            # Com cobertura de código
npm run test:ui                  # Interface UI interativa do Vitest

# Testes E2E (Playwright)
npm run test:e2e                 # Executa testes E2E (headless)
npm run test:e2e:ui              # Interface UI interativa
npm run test:e2e:headed          # Com browser visível
npm run test:e2e:chromium        # Apenas Chromium
npm run test:e2e:firefox         # Apenas Firefox
npm run test:e2e:webkit          # Apenas WebKit

# Coverage report
npm run test:coverage
open coverage/index.html         # Visualiza relatório de cobertura
```

## 📦 Build & Deploy

### 🏗️ Build de Produção

```bash
# Build otimizado
npm run build:prod               # Build para produção
ng build --configuration=production

# Build com análise
ng build --configuration=production --stats-json

# Build com watch para desenvolvimento
npm run watch                    # Build com modo watch

# Build para GitHub Pages
ng build --base-href="/robsonalvesdevbr-angular/"
```

### 🚀 Deploy para GitHub Pages

1. **Manual:**

```bash
ng build --base-href="/robsonalvesdevbr-angular/"
npx angular-cli-ghpages --dir=dist/robsonalvesdevbr-angular
```

2. **Automático via GitHub Actions:**
   - Push para `main` dispara deploy automático
   - Configurado em `.github/workflows/deploy.yml`

### 📊 Performance e Otimização

```bash
# Análise de performance
ng build --configuration=production
npx lighthouse http://localhost:4200 --view

# Preload strategies
ng build --configuration=production --named-chunks
```

## 🤝 Contribuição

### 🛠️ Setup de Desenvolvimento

1. **Fork** o repositório
2. **Clone** seu fork: `git clone https://github.com/seu-usuario/robsonalvesdevbr-angular.git`
3. **Instale** dependências: `npm install`
4. **Configure** Git Hooks: `git config core.hooksPath .githooks`
5. **Crie** uma branch: `git checkout -b feature/nova-funcionalidade`

### 📝 Padrões de Código

- ✅ **TypeScript** rigoroso (sem `any`)
- ✅ **Signals** para gerenciamento de estado
- ✅ **Standalone Components** quando possível
- ✅ **Bootstrap 5** com Bootstrap Icons para UI
- ✅ **Path Aliases** para importações organizadas
- ✅ **OnPush Change Detection** para performance
- ✅ **Detecção de Mudanças Zoneless** (production-ready)
- ✅ **RxJS** para operações assíncronas
- ✅ **Async/await** preferível a `.then()`
- ✅ **Testes unitários** obrigatórios
- ✅ **ESLint + Prettier** configurados

### 🔄 Workflow

```bash
# 1. Desenvolvimento
npm start                        # Inicia servidor dev
npm run lint                     # Verifica código
npm test                         # Executa testes
npm run build:prod               # Testa build de produção

# 2. Qualidade de código
npm run format                   # Formata código
npm run lint:fix                 # Corrige problemas ESLint

# 3. Commit
git add .
git commit -m "feat: descrição da funcionalidade"

# 4. Push e PR
git push origin feature/nova-funcionalidade
# Abra Pull Request no GitHub
```

---

## 📞 Contato

**Robson Alves** - Arquiteto de Software  
📧 robsonalves.us@gmail.com  
🌐 [www.robsonalves.dev.br](https://www.robsonalves.dev.br)  
💼 [LinkedIn](https://linkedin.com/in/robsonalvesdevbr)

---

<div align="center">

**[⭐ Star este projeto](https://github.com/robsonalvesdevbr/robsonalvesdevbr-angular)** se foi útil para você!

Desenvolvido com ❤️ usando [Angular](https://angular.dev)

</div>
