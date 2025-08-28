# CLAUDE.md

Este arquivo fornece orientações para Claude Code (claude.ai/code) ao trabalhar com código neste repositório.

## Comandos de Desenvolvimento

### Build e Servir

- `npm start` - Iniciar servidor de desenvolvimento (equivalente a `ng serve --no-hmr`)
- `ng build` - Build para desenvolvimento
- `ng build --configuration production` ou `npm run build:prod` - Build para produção
- `ng build --watch --configuration development` ou `npm run watch` - Build com modo watch

### Testes

- `npm test` - Executar testes com modo watch (Karma + Jasmine)
- `npm run test-nowatch` - Executar testes uma vez sem modo watch (Chrome headless)
- `npm run test-coverage` - Executar testes com relatório de cobertura

### Qualidade de Código

- `npm run lint` - Executar ESLint em arquivos TypeScript e HTML
- `npm run lint:fix` - Executar ESLint com correção automática
- `npm run format` - Formatar código com Prettier
- `npm run format:check` - Verificar formatação do código

### Requisitos

- Node.js >= 22.9 (especificado em package.json engines)

## Visão Geral da Arquitetura

### Stack Tecnológica

- **Angular 20.2** com componentes standalone (sem módulos)
- **TypeScript 5.9.2** com modo strict habilitado
- **Bootstrap 5.3.7** para estilização com Bootstrap Icons
- **SCSS** para estilos de componentes
- **Detecção de Mudanças Zoneless** (recurso experimental do Angular)
- **Google Analytics** integração via `ngx-google-analytics`
- **ESLint + Prettier** para qualidade de código
- **Biome** como ferramenta de linting adicional

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

- **Testes Unitários**: Escreva utilizando Karma
- **Mocks**: Priorize para serviços e evite dependências diretas em APIs externas
- **Testing Libraries**: Utilize `Spectator` ou `Testing Library` para simplificar componentes de teste

### Project Guidelines

- **Estrutura de Pastas**: Mantenha uma estrutura de pastas organizada e consistente
- **Nomenclatura**: Siga convenções de nomenclatura para arquivos e pastas
- **Documentação**: Documente componentes e serviços de forma clara e concisa
- **Revisões de Código**: Realize revisões de código regulares para garantir a qualidade
- **Emojis**: Nunca utilize emojis para melhorar a comunicação e a compreensão nos comentários e mensagens de commit, logs, outputs, etc.
