# CLAUDE.md

Este arquivo fornece orientações para Claude Code (claude.ai/code) ao trabalhar com código neste repositório.

## Comandos de Desenvolvimento

### Build e Servir

- `npm start` - Iniciar servidor de desenvolvimento (equivalente a `ng serve --no-hmr`)
- `ng build` - Build para desenvolvimento
- `ng build --configuration production` ou `npm run build:prod` - Build para produção
- `ng build --watch --configuration development` ou `npm run watch` - Build com modo watch

### Testes

#### Testes Unitários (Karma + Jasmine)

- `npm test` - Executar testes unitários com modo watch
- `npm run test:nowatch` - Executar testes unitários uma vez sem modo watch (Chrome headless)
- `npm run test:coverage` - Executar testes unitários com relatório de cobertura

#### Testes E2E (Playwright)

- `npm run test:e2e` - Executar testes E2E em todos os browsers (headless)
- `npm run test:e2e:ui` - Executar testes E2E com interface UI interativa
- `npm run test:e2e:headed` - Executar testes E2E com browser visível
- `npm run test:e2e:debug` - Executar testes E2E em modo debug
- `npm run test:e2e:chromium` - Executar testes E2E apenas no Chromium
- `npm run test:e2e:firefox` - Executar testes E2E apenas no Firefox
- `npm run test:e2e:webkit` - Executar testes E2E apenas no WebKit
- `npm run test:e2e:mobile` - Executar testes E2E em emulador Mobile Chrome (Pixel 5)
- `npm run test:e2e:report` - Visualizar relatório HTML dos testes E2E

### Qualidade de Código

- `npm run lint` - Executar ESLint em arquivos TypeScript e HTML
- `npm run lint:fix` - Executar ESLint com correção automática
- `npm run format` - Formatar código com Prettier
- `npm run format:check` - Verificar formatação do código

### Requisitos

- Node.js >= 22.12 (especificado em package.json engines)

## Visão Geral da Arquitetura

### Stack Tecnológica

- **Angular 21.0** com componentes standalone (sem módulos)
- **TypeScript 5.9.3** com modo strict habilitado
- **Bootstrap 5.3.8** para estilização com Bootstrap Icons
- **SCSS** para estilos de componentes
- **Detecção de Mudanças Zoneless** (production-ready desde Angular 21)
- **Google Analytics** integração via `ngx-google-analytics`
- **ESLint + Prettier** para qualidade de código

### Estrutura do Projeto

Este é um site de portfólio/currículo pessoal com os seguintes padrões arquiteturais principais:

#### Arquitetura de Componentes

- **Componentes Standalone**: Todos os componentes usam a API standalone do Angular (sem NgModules)
- **Padrão de Componente Base**: `BasePageComponent` fornece funcionalidade comum para páginas
- **Inputs baseados em Signals**: Usa a nova API de input baseada em signals do Angular
- **Detecção de Mudanças OnPush**: Componentes usam `ChangeDetectionStrategy.OnPush`

#### Gerenciamento de Dados

- **Serviço de Dados Centralizado**: `DataService` fornece dados estáticos para cursos, livros, graduações, etc.
- **Padrão de Dados Estáticos**: Todo conteúdo é armazenado em arquivos TypeScript em `src/app/data/`
- **Orientado por Interfaces**: Tipagem forte com interfaces em `src/app/interfaces/`

#### Path Aliases (TypeScript)

O projeto usa aliases de caminho personalizados definidos em `tsconfig.json`:

- `@path-components/*` → `./src/app/components/*`
- `@path-services/*` → `./src/app/services/*`
- `@path-data/*` → `./src/app/data/*`
- `@path-interfaces/*` → `./src/app/interfaces/*`
- `@path-pipes/*` → `./src/app/pipes/*`
- `@path-app/*` → `./src/app/*`
- `@path-environments/*` → `./src/environments/*`

#### Pipes Personalizados

O projeto inclui vários pipes personalizados para transformação de dados:

- `EnumToArrayPipe` - Converter enums para arrays
- `FilterPipe` - Filtrar arrays
- `ImgcursoPipe` - Manipular imagens de cursos
- `MessageDateConclusionPipe` - Formatar datas de conclusão
- `PrintTagsPipe` - Exibir tags
- `SortbyPipe` - Ordenar arrays

#### Roteamento

- Usa Angular Router com componentes lazy-loaded
- Aplicação de página única com rota wildcard redirecionando para home

### Configuração de Build

- **Desenvolvimento**: Source maps habilitados, sem otimização
- **Produção**: Orçamentos de tamanho de bundle (1MB inicial, 4kB estilos de componente)
- **Assets**: Inclui CSS/JS do Bootstrap, SCSS personalizado e assets estáticos
- **Output**: Build para `dist/robsonalves/`

### Configuração de Qualidade de Código

- **ESLint**: Configurado com regras específicas do Angular
- **Prettier**: Formatação de código com estilo consistente
- **TypeScript**: Modo strict com opções adicionais do compilador
- **Angular Compiler**: Templates strict e parâmetros de injeção

### Convenção de Nomenclatura de Componentes

- Use kebab-case para seletores de componentes
- Prefixe componentes com `app-`
- Componentes são organizados por funcionalidade em subdiretórios

### Estilização

- Usa SCSS para estilos de componentes e globais
- Bootstrap 5 integrado globalmente
- Bootstrap Icons disponível em toda a aplicação
- Estilos personalizados em `src/css/styles.scss` e `src/styles.scss`

## Práticas Recomendadas Angular 19+

### Signals e Reatividade

- **Utilize Signals**: Para gerenciar mudanças de estado de forma reativa (introduzido no Angular 16)
- **Standalone Components**: Configure quando apropriado para reduzir sobrecarga de módulos
- **Zone.js**: Use apenas quando necessário, priorizando reatividade baseada em observáveis
- **Lazy Loading**: Prefira para módulos ou componentes não críticos no carregamento inicial

### Desenvolvimento Seguro e Moderno

- **Angular Material**: Sugira criação de componentes quando aplicável
- **Evite `any`**: Não use tipo `any` ou manipulação direta do DOM
- **RxJS**: Priorize soluções que utilizem observáveis para dados assíncronos
- **Pacotes Atualizados**: Não use pacotes depreciados como `inflight` ou `rimraf`
- **Segurança XSS**: Evite interpolação direta de dados de entrada no HTML

### Padrões de Qualidade

- **TypeScript**: Use para todos os arquivos de lógica de aplicação
- **Async/Await**: Prefira para operações assíncronas
- **Abordagem Declarativa**: Use ao invés de imperativa em templates HTML e observáveis
- **Angular CLI**: Siga o estilo para estruturação de arquivos e módulos

### Estratégias de Teste

Este projeto implementa uma **abordagem híbrida de testes**, seguindo as melhores práticas da pirâmide de testes:

#### Testes Unitários (Karma + Jasmine)

- **Propósito**: Validar lógica isolada de componentes, serviços, pipes e diretivas
- **Localização**: `src/**/*.spec.ts`
- **Framework**: Karma + Jasmine (configuração padrão Angular)
- **Quando usar**:
  - Testar lógica de negócio em serviços
  - Validar transformações de dados em pipes
  - Verificar comportamento de componentes isolados
  - Testar diretivas e guards
- **Boas práticas**:
  - Use mocks para dependências externas
  - Mantenha testes rápidos e focados
  - Utilize TestBed para componentes Angular
  - Prefira `Spectator` ou `Testing Library` para simplificar testes

#### Testes E2E (Playwright)

- **Propósito**: Validar fluxos completos do usuário e integrações
- **Localização**: `e2e/**/*.spec.ts`
- **Framework**: Playwright (suporte cross-browser)
- **Quando usar**:
  - Testar navegação entre seções
  - Validar filtros e buscas funcionando end-to-end
  - Verificar formulários de contato
  - Testar responsividade (mobile/desktop)
  - Garantir que fluxos críticos funcionam em múltiplos browsers
- **Arquitetura**:
  - **Page Objects**: `e2e/pages/*.page.ts` - Encapsulam interações com páginas
  - **Specs**: `e2e/specs/*.spec.ts` - Contêm cenários de teste
  - **Fixtures**: `e2e/fixtures/*` - Dados e configurações reutilizáveis
- **Boas práticas**:
  - Use Page Object Model para manter testes organizados
  - Prefira seletores baseados em `data-testid` quando possível
  - Evite timeouts fixos, use auto-wait do Playwright
  - Teste em múltiplos browsers (chromium, firefox, webkit)
  - Execute testes em paralelo quando possível

#### Separação de Responsabilidades

```
Testes Unitários (Karma/Jasmine)
  ↓
  - Lógica isolada
  - Execução rápida (milissegundos)
  - Feedback imediato
  - Grande quantidade de testes

Testes E2E (Playwright)
  ↓
  - Fluxos completos
  - Execução mais lenta (segundos)
  - Validação realista
  - Menor quantidade, maior cobertura
```

## CI/CD e Automação

### GitHub Actions Workflows

O projeto possui três workflows automatizados:

#### 1. Playwright E2E Tests (`.github/workflows/playwright-e2e.yml`)

**Triggers:**
- Push para `main` e `develop`
- Pull requests para `main` e `develop`
- Execução manual via `workflow_dispatch`

**Funcionalidades:**
- Executa 72 testes (24 por browser) em paralelo usando matrix strategy
- Browsers testados: Chromium, Firefox, Mobile Chrome
- Upload automático de artefatos em caso de falha:
  - **Traces**: Gravações interativas para depuração (`playwright show-trace`)
  - **Screenshots**: Imagens de falhas
  - **Vídeos**: Gravações de testes falhados
  - **Relatórios HTML**: Relatório completo em formato HTML
- Comentários automáticos em PRs com resumo dos resultados
- Retenção: 30 dias para relatórios, 7 dias para traces/vídeos

**Otimizações:**
- Cache de `node_modules` via `npm ci`
- Instalação seletiva de browsers (`--with-deps chromium firefox`)
- Execução paralela com `fail-fast: false`

#### 2. Azure Static Web Apps Deploy (`.github/workflows/azure-static-web-apps-*.yml`)

**Pipeline de qualidade antes do deploy:**
1. Testes unitários (Karma/Jasmine)
2. **Testes E2E (Playwright)** - Gate de qualidade
3. Build de produção
4. Deploy para Azure Static Web Apps

**Se os testes E2E falharem, o deploy é cancelado.**

### Boas Práticas de CI/CD

**Ao criar novos workflows:**
- Use `npm ci` ao invés de `npm install` (mais rápido, determinístico)
- Configure cache para `node_modules` e browsers Playwright
- Use matrix strategy para paralelizar testes cross-browser
- Configure timeouts apropriados (20min para E2E, 30min para deploy)
- Sempre faça upload de artefatos em caso de falha
- Use `continue-on-error: true` apenas para jobs não críticos

**Variáveis de ambiente importantes:**
- `CI=true`: Ativa modo CI no Playwright (retries, relatórios otimizados)
- `NODE_ENV=production`: Para builds de produção

### Executando CI localmente

**Simular ambiente CI:**
```bash
export CI=true
npm ci
npx playwright install --with-deps chromium firefox
npm run test:e2e
```

**Ferramentas recomendadas:**
- [act](https://github.com/nektos/act): Executa GitHub Actions localmente
- [Docker](https://www.docker.com/): Para testar em ambiente containerizado

### Project Guidelines

- **Estrutura de Pastas**: Mantenha uma estrutura de pastas organizada e consistente
- **Nomenclatura**: Siga convenções de nomenclatura para arquivos e pastas
- **Documentação**: Documente componentes e serviços de forma clara e concisa
- **Revisões de Código**: Realize revisões de código regulares para garantir a qualidade
- **Emojis**: Nunca utilize emojis para melhorar a comunicação e a compreensão nos comentários e mensagens de commit, logs, outputs, etc.
