# 🚀 Robson Alves - Portfolio Angular

[![Angular](https://img.shields.io/badge/Angular-19-red?logo=angular)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Material](https://img.shields.io/badge/Angular_Material-19-673ab7?logo=material-design)](https://material.angular.io/)
[![Node.js](https://img.shields.io/badge/Node.js-20.18.0-green?logo=node.js)](https://nodejs.org/)
[![Build Status](https://img.shields.io/github/workflow/status/robsonalvesdevbr/robsonalvesdevbr-angular/CI)](https://github.com/robsonalvesdevbr/robsonalvesdevbr-angular/actions)
[![License](https://img.shields.io/github/license/robsonalvesdevbr/robsonalvesdevbr-angular)](LICENSE)

> 💼 Portfolio pessoal desenvolvido com **Angular 19**, **Signals**, **Standalone Components** e **Angular Material** para demonstrar habilidades em desenvolvimento frontend moderno.

## 📖 Sobre o Projeto

Este projeto representa meu portfolio pessoal, desenvolvido como estudo prático das mais recentes funcionalidades do Angular 19, incluindo:

- ✨ **Signals** para gerenciamento de estado reativo
- 🎯 **Standalone Components** para arquitetura moderna
- 🎨 **Angular Material** para UI/UX profissional
- 🚀 **Lazy Loading** para performance otimizada
- 📱 **Design Responsivo** para todos os dispositivos

## ⚡ Quick Start

### Pré-requisitos

- **Node.js** 20.18.0+ ([Download](https://nodejs.org/))
- **npm** 10.0.0+ (incluído com Node.js)
- **Angular CLI** 19+ (será instalado automaticamente)

### 🚀 Instalação e Execução

```bash
# 1. Clone o repositório
git clone https://github.com/robsonalvesdevbr/robsonalvesdevbr-angular.git
cd robsonalvesdevbr-angular

# 2. Configure os Git Hooks (opcional)
git config core.hooksPath .githooks

# 3. Use a versão correta do Node.js (se usar nvm)
nvm use 20.18.0

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
│   ├── core/                 # Serviços essenciais, guards, interceptors
│   ├── shared/               # Componentes, pipes e diretivas compartilhados
│   ├── features/             # Módulos de funcionalidades (lazy-loaded)
│   ├── layout/               # Componentes de layout (header, footer)
│   ├── app.component.ts      # Componente raiz (standalone)
│   ├── app.routes.ts         # Configuração de rotas
│   └── main.ts              # Bootstrap da aplicação
├── assets/                   # Arquivos estáticos (imagens, fonts, etc.)
├── environments/             # Configurações de ambiente
└── styles.scss              # Estilos globais SCSS
```

### Arquivos de Configuração

| Arquivo          | Descrição                    |
| ---------------- | ---------------------------- |
| `angular.json`   | Configurações do Angular CLI |
| `package.json`   | Dependências e scripts npm   |
| `tsconfig.json`  | Configurações TypeScript     |
| `.eslintrc.json` | Regras do ESLint             |
| `.prettierrc`    | Configurações do Prettier    |

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
npx prettier . --write            # Formata todos os arquivos
npx prettier . --check            # Verifica formatação

# Linting
ng lint                          # ESLint verificação
ng lint --fix                   # ESLint com correção automática

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
# Testes unitários
ng test                          # Executa testes com watch
ng test --watch=false            # Executa uma vez
ng test --browsers=ChromeHeadless # Headless para CI/CD
ng test --code-coverage          # Com cobertura de código

# Testes e2e
ng e2e                          # Testes end-to-end

# Coverage report
ng test --code-coverage --watch=false
open coverage/index.html        # Visualiza relatório de cobertura
```

## 📦 Build & Deploy

### 🏗️ Build de Produção

```bash
# Build otimizado
ng build --configuration=production

# Build com análise
ng build --configuration=production --stats-json

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
- ✅ **Angular Material** para UI
- ✅ **RxJS** para operações assíncronas
- ✅ **Async/await** preferível a `.then()`
- ✅ **Testes unitários** obrigatórios
- ✅ **ESLint + Prettier** configurados

### 🔄 Workflow

```bash
# 1. Desenvolvimento
npm start                        # Inicia servidor dev
ng lint                         # Verifica código
ng test                         # Executa testes
npm run build                   # Testa build

# 2. Commit
git add .
git commit -m "feat: descrição da funcionalidade"

# 3. Push e PR
git push origin feature/nova-funcionalidade
# Abra Pull Request no GitHub
```

---

## 📞 Contato

**Robson Alves** - Arquiteto de Software  
📧 robson.curitibapr@gmail.com  
🌐 [www.robsonalves.dev.br](https://www.robsonalves.dev.br)  
💼 [LinkedIn](https://linkedin.com/in/robsonalvesdevbr)

---

<div align="center">

**[⭐ Star este projeto](https://github.com/robsonalvesdevbr/robsonalvesdevbr-angular)** se foi útil para você!

Desenvolvido com ❤️ usando [Angular](https://angular.dev)

</div>
