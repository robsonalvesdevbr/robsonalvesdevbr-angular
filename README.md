# Portfolio Robson Alves - Angular

![Angular](https://img.shields.io/badge/Angular-21.0-DD0031?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap)
![Node](https://img.shields.io/badge/Node-%3E%3D22.12-339933?logo=node.js)
![License](https://img.shields.io/badge/license-private-lightgrey)

Portfolio pessoal desenvolvido com Angular 21+, utilizando as mais recentes funcionalidades do framework incluindo standalone components, zoneless change detection e signals.

## 📋 Sobre

Aplicação single-page moderna que apresenta:

- 🎓 Formação acadêmica e cursos
- 📚 Livros e publicações
- 💼 Experiência profissional
- 📊 Dashboard com estatísticas
- 🌐 Suporte a múltiplos idiomas
- 📱 Design responsivo

## 🚀 Tecnologias

### Core
- **Angular 21+** - Framework principal com standalone components
- **TypeScript 5.9** - Linguagem de programação
- **RxJS 7.8** - Programação reativa

### UI/UX
- **Bootstrap 5.3** - Framework CSS
- **Bootstrap Icons** - Biblioteca de ícones
- **SCSS** - Pré-processador CSS

### Testing
- **Vitest 4.0** - Framework de testes unitários
- **Playwright 1.56** - Testes E2E multi-browser
- **@vitest/coverage-v8** - Cobertura de código

### Qualidade de Código
- **ESLint 9** - Linting de código
- **Prettier 3.6** - Formatação de código
- **Angular ESLint** - Regras específicas do Angular

### Analytics
- **Google Analytics** - Rastreamento de uso via ngx-google-analytics

### Build & Dev Tools
- **Angular CLI 21** - Ferramentas de desenvolvimento
- **Vite 7.2** - Build tool para testes
- **esbuild** - Bundler rápido (via Angular CLI)

## 📦 Pré-requisitos

- Node.js >= 22.12
- npm (incluído com Node.js)

## 🔧 Instalação

```bash
# Clone o repositório
git clone https://github.com/robsonalvesdevbr/robsonalvesdevbr-angular.git

# Entre no diretório
cd robsonalvesdevbr-angular

# Instale as dependências
npm install
```

## 🎯 Comandos Disponíveis

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento (porta 4200)
npm start

# Iniciar e abrir automaticamente no browser
npm run dev

# Iniciar em modo de produção localmente
npm run start:prod
```

### Build

```bash
# Build de desenvolvimento
npm run build

# Build de produção otimizado
npm run build:prod

# Analisar tamanho do bundle
npm run build:analyze

# Build com watch mode
npm run watch
```

### Testes

#### Testes Unitários (Vitest)

```bash
# Executar testes em modo watch
npm test

# Executar testes uma vez
npm run test:nowatch

# Gerar relatório de cobertura
npm run test:coverage

# Interface visual do Vitest
npm run test:ui
```

#### Testes E2E (Playwright)

```bash
# Executar todos os testes E2E
npm run test:e2e

# Modo interativo com UI
npm run test:e2e:ui

# Modo debug
npm run test:e2e:debug

# Executar em browser específico
npm run test:e2e:chromium
npm run test:e2e:firefox

# Ver último relatório
npm run test:e2e:report
```

### Qualidade de Código

```bash
# Executar linter
npm run lint

# Corrigir problemas automaticamente
npm run lint:fix

# Formatar código
npm run format

# Verificar formatação
npm run format:check

# Auditoria de segurança
npm run security:check
```

### Utilitários

```bash
# Limpar arquivos gerados
npm run clean
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── base-page/          # Componente base para páginas
│   │   ├── pages/              # Páginas da aplicação
│   │   └── utils/              # Componentes reutilizáveis
│   ├── data/                   # Dados hardcoded
│   ├── interfaces/             # Interfaces TypeScript
│   ├── models/                 # Enums e modelos
│   ├── pipes/                  # Pipes customizados
│   ├── services/               # Serviços da aplicação
│   ├── routes/                 # Configuração de rotas
│   ├── utils/                  # Utilitários
│   ├── app.config.ts          # Configuração da aplicação
│   └── app.routes.ts          # Rotas principais
├── assets/                     # Recursos estáticos
├── environments/               # Configurações de ambiente
└── styles.scss                 # Estilos globais
```

## ⚡ Características Técnicas

### Arquitetura Moderna

- **Standalone Components** - Sem NgModules
- **Zoneless Change Detection** - Performance otimizada com signals
- **Lazy Loading** - Carregamento sob demanda de rotas
- **OnPush Change Detection** - Estratégia otimizada por padrão

### Path Aliases

O projeto utiliza aliases para imports mais limpos:

```typescript
@path-components/*   → ./src/app/components/*
@path-services/*     → ./src/app/services/*
@path-data/*         → ./src/app/data/*
@path-interfaces/*   → ./src/app/interfaces/*
@path-pipes/*        → ./src/app/pipes/*
```

### Performance

- Zoneless change detection baseado em signals
- Lazy loading de todas as rotas
- DataService com Proxy para dados readonly
- Bundle budgets configurados
- Otimizações de build para produção

### Testing

- **Unit Tests:** Vitest com jsdom para componentes Angular
- **E2E Tests:** Playwright com suporte multi-browser
- **Coverage:** Relatórios detalhados de cobertura
- **Auto-start:** Playwright inicia automaticamente o dev server

## 🔒 Bundle Budgets

Limites configurados para produção:

- **Initial bundle:** warning em 600kB, erro em 800kB
- **Component styles:** warning em 3kB, erro em 5kB
- **Polyfills:** warning em 100kB, erro em 150kB

## 📝 Convenções de Código

- **Componentes:** ChangeDetectionStrategy.OnPush
- **Signals:** usar `input()` para inputs de componentes
- **Pipes:** standalone e pure quando possível
- **Services:** `providedIn: 'root'`
- **Naming:** dot-separated (ex: `data.service.ts`)
- **Prettier:** single quotes, trailing commas, 100 chars line width

## 🤝 Contribuição

Este é um projeto pessoal privado. Contribuições não são aceitas no momento.

## 📄 Licença

Este projeto é privado e todos os direitos são reservados.

## 👤 Autor

**Robson Alves**

- GitHub: [@robsonalvesdevbr](https://github.com/robsonalvesdevbr)

---

Desenvolvido com ❤️ usando Angular
