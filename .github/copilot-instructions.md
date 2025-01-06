## Angular 19
- Utilize Signals (Introduzido no Angular 16) para gerenciar mudanças de estado de forma reativa.
- Configure standalone components quando apropriado para reduzir a sobrecarga de módulos.
- Use Zone.js apenas quando necessário, priorizando a reatividade baseada em observáveis.
- Prefira lazy-loading para módulos ou componentes que não são críticos no carregamento inicial.

- Sugira criação de componentes com Angular Material quando aplicável.
- Evite práticas como uso de `any` ou manipulação direta do DOM.
- Priorize soluções que utilizem observáveis (`RxJS`) para lidar com dados assíncronos.

- Não use pacotes depreciados como `inflight` ou `rimraf`. Prefira substitutos modernos como `fs/promises`.
- Evite práticas inseguras como interpolação direta de dados de entrada no HTML, para evitar ataques XSS.


- Use TypeScript para todos os arquivos de lógica de aplicação.
- Prefira a utilização de `async/await` para operações assíncronas.
- Utilize a abordagem declarativa ao invés de imperativa ao lidar com templates HTML e observáveis.
- Siga o estilo do Angular CLI para estruturação de arquivos e módulos.
- Escreva testes unitários utilizando Karma.
- Priorize mocks para serviços e evite dependências diretas em APIs externas nos testes.
- Utilize `Spectator` ou `Testing Library` para simplificar a criação de componentes de teste.
