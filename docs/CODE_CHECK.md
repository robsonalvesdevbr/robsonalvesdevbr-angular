# Install ESLint and Prettier for Angular

```bash
npm install --save-dev eslint prettier eslint-plugin-prettier eslint-config-prettier @angular-eslint/builder @angular-eslint/eslint-plugin @angular-eslint/eslint-plugin-template @angular-eslint/template-parser typescript-eslint
```

# Explicação dos pacotes:

- **eslint**: O linter principal para identificar e corrigir problemas no código.
- **prettier**: O formatador de código que garante um estilo consistente.
- **eslint-plugin-prettier**: Integra o Prettier ao ESLint, permitindo que problemas de formatação sejam reportados como erros de lint.
- **eslint-config-prettier**: Desativa regras do ESLint que conflitam com o Prettier, evitando conflitos de formatação.
- **@angular-eslint/\***: Conjunto de ferramentas específicas para linting de projetos Angular, incluindo templates HTML e código TypeScript.
- **typescript-eslint**: Permite que o ESLint compreenda e faça lint em arquivos TypeScript.

# Configuração do ESLint

Crie um arquivo `.eslintrc.json` na raiz do seu projeto com o seguinte conteúdo:

```json
{
  "root": true,
  "ignorePatterns": ["projects/**/*"],
  "overrides": [
    {
      "files": ["*.ts"],
      "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates",
        "plugin:prettier/recommended" // Adiciona Prettier como uma regra ESLint e desabilita conflitos
      ],
      "rules": {
        "@typescript-eslint/no-explicit-any": "off"
        // Suas regras customizadas do ESLint aqui (opcional)
        // Exemplo:
        // "@angular-eslint/directive-selector": [
        //   "error",
        //   {
        //     "type": "attribute",
        //     "prefix": "app",
        //     "style": "camelCase"
        //   }
        // ],
        // "@angular-eslint/component-selector": [
        //   "error",
        //   {
        //     "type": "element",
        //     "prefix": "app",
        //     "style": "kebab-case"
        //   }
        // ]
      }
    },
    {
      "files": ["*.html"],
      "extends": [
        "plugin:@angular-eslint/template/recommended",
        "plugin:prettier/recommended" // Garante que o Prettier também formate HTML
      ],
      "rules": {
        // Suas regras customizadas para templates HTML aqui (opcional)
      }
    }
  ]
}
```

# Configuração do Prettier

Crie um arquivo `.prettierrc.json` na raiz do seu projeto com o seguinte conteúdo:

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "arrowParens": "avoid",
  "printWidth": 100,
  "tabWidth": 2,
  "semi": true
}
```

# Configuração do Prettier com ESLint

Crie um arquivo `.prettierignore` na raiz do seu projeto com o seguinte conteúdo:

```prettierignore
# Ignore artifacts:
node_modules
dist
coverage

# Ignore IDE files:
.idea
.vscode

# Ignore build files:
build

# Ignore config files:
angular.json
package-lock.json
package.json

# Ignore test files:
karma.conf.js
test.ts

# Ignore environment files:
src/environments/environment.ts
src/environments/environment.prod.ts

# Ignore other files:
**/*.js
**/*.ts
**/*.json

**/.git
**/.svn
**/.hg
**/node_modules
**/.angular
**/.githooks
**/.github
**/.dist
**/.husky
**/coverage
**/package-lock.json
**/yarn.lock
**/angular.json
```

# Configuração do angular.json

Adicione o seguinte trecho ao seu arquivo `angular.json`:

```json
"lint": {
  "builder": "@angular-eslint/builder:lint",
  "options": {
    "lintFilePatterns": ["src/**/*.ts", "src/**/*.html"]
  }
}
```

# Script para rodar o ESLint e Prettier

Adicione o seguinte script ao seu `package.json`:

```json
"scripts": {
  "lint": "ng lint",
  "lint:fix": "ng lint --fix",
  "format": "prettier --write \"src/**/*.{ts,html,scss,json}\"",
  "format:check": "prettier --check \"src/**/*.{ts,html,scss,json}\"",
}
```
