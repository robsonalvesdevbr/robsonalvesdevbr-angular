# [Profile Robson Alves][1]

## Descrição

Apresentação do meu currículo como forma de estudos do [Angular][2]

## Estrutura do Projeto

A estrutura do projeto é a seguinte:

### Diretórios e Arquivos Importantes

- **.angular/**: Diretório de cache do Angular.
- **.githooks/**: Scripts de hooks do Git.
- **.github/**: Workflows do GitHub Actions.
- **.vscode/**: Configurações do Visual Studio Code.
- **angular.json**: Configurações do Angular CLI.
- **package.json**: Dependências e scripts do npm.
- **src/**: Código-fonte da aplicação.
    - **app/**: Componentes e módulos da aplicação.
        - [`app-routing.module.ts`](src/app/app-routing.module.ts): Configurações de rotas.
        - [`app.component.ts`](src/app/app.component.ts): Componente principal.
        - [`app.component.html`](src/app/app.component.html): Template do componente principal.
        - [`app.component.scss`](src/app/app.component.scss): Estilos do componente principal.
    - **assets/**: Arquivos estáticos.
    - **css/**: Arquivos CSS globais.
    - **environments/**: Configurações de ambiente.
    - [`index.html`](src/index.html): Página principal.
    - **js/**: Scripts JavaScript.
    - [`main.ts`](src/main.ts): Arquivo principal do Angular.
    - [`styles.scss`](src/styles.scss): Estilos globais.
- **tsconfig.app.json**: Configurações do TypeScript para a aplicação.
- **tsconfig.json**: Configurações gerais do TypeScript.
- **tsconfig.spec.json**: Configurações do TypeScript para testes.

## Instalação

Para instalar as dependências do projeto, execute:

```sh
npm install
```

> [!NOTE]
> Comandos uteis
>
> ```bash
> npx prettier . --write
> ```

## Git config

```bash
git config core.hooksPath .githooks
docker run --rm --network=host -e SONAR_HOST_URL="http://localhost:9000/"  -v "C:\workspace\Robson\languages\angular\robsonalvesdevbr-angular:/usr/src" sonarsource/sonar-scanner-cli
docker run --rm --network=host -e SONAR_HOST_URL="http://localhost:9000/"  -v "C:\workspace\Robson\languages\angular\robsonalvesdevbr-angular:/usr/src" sonarsource/sonar-scanner-cli -D"sonar.projectKey=robsonalvesdevbr-angular" -D"sonar.sources=." -D"sonar.host.url=http://localhost:9000" -D"sonar.token=sqp_16a2fa3d4594f20c5758741c74413cb92243dac6"
npm cache clean --force
npm outdated
npm update

npx browserslist

nvm use 20.18.0

ng update @angular/cli @angular/core
npm outdated
npm update
npm install -g npm-check-updates
ncu -u

ng g @angular/core:cleanup-unused-imports

```

## Prettier & Eslint

```bash
npm install --save-dev prettier eslint eslint-config-prettier eslint-plugin-prettier
ng add @angular-eslint/schematics

```

[1]: https://www.robsonalves.dev.br 'Arquiteto de software - Robson Alves<contato@robsonalves.dev.br>'
[2]: https://angular.dev 'Angular'
