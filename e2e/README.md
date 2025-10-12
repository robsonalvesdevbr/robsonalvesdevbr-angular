# Testes E2E com Playwright

Este diretório contém os testes end-to-end (E2E) da aplicação usando Playwright.

## Estrutura

```
e2e/
├── fixtures/          # Fixtures e configurações reutilizáveis
├── pages/            # Page Object Models (POMs)
│   ├── base.page.ts           # Classe base com métodos comuns
│   ├── home.page.ts           # POM para página home/SPA
│   ├── book.page.ts           # POM para seção de livros
│   ├── course.page.ts         # POM para seção de cursos
│   └── contact.page.ts        # POM para seção de contato
└── specs/            # Testes E2E
    ├── home.spec.ts           # Testes da página home
    ├── navigation.spec.ts     # Testes de navegação
    ├── books.spec.ts          # Testes da seção de livros
    ├── courses.spec.ts        # Testes da seção de cursos
    └── contact.spec.ts        # Testes da seção de contato
```

## Executando os Testes

### Todos os browsers

```bash
npm run test:e2e
```

### Browsers específicos

```bash
npm run test:e2e:chromium   # Apenas Chromium (mais rápido)
npm run test:e2e:firefox    # Apenas Firefox
npm run test:e2e:webkit     # Apenas WebKit (Safari)
npm run test:e2e:mobile     # Mobile Chrome (Pixel 5)
```

### Modo interativo

```bash
npm run test:e2e:ui         # Interface UI do Playwright
npm run test:e2e:headed     # Browser visível
npm run test:e2e:debug      # Modo debug passo a passo
```

### Relatórios

```bash
npm run test:e2e:report     # Visualizar último relatório HTML
```

## Browsers Suportados

### Desktop
- ✅ Chromium (Chrome/Edge) - 24 testes
- ✅ Firefox - 24 testes
- ⚠️ ~~WebKit (Safari)~~ - Desabilitado no Linux devido a dependências

### Mobile
- ✅ Mobile Chrome (Pixel 5) - 24 testes
- ⚠️ ~~Mobile Safari (iPhone 12)~~ - Desabilitado no Linux devido a dependências

**Total: 72 testes em 3 browsers/dispositivos**

### Nota sobre WebKit e Mobile Safari no Linux

O WebKit (Safari) e Mobile Safari requerem dependências adicionais do sistema no Linux que não vêm instaladas por padrão. Estas dependências requerem permissões de administrador.

**Para habilitar WebKit/Safari (opcional):**

1. Instale as dependências do sistema:
```bash
sudo npx playwright install-deps
```

2. Descomente a configuração em `playwright.config.ts`:
   - Linhas 71-79 para WebKit desktop
   - Linhas 87-94 para Mobile Safari

**Alternativa sem sudo:**
```bash
sudo apt-get install libicu74 libxml2 libavif16 libmanette-0.2-0
```

**Nota:** Em ambientes macOS e Windows, o WebKit funciona sem dependências extras.

## Cobertura de Testes

### Home Page (6 testes)
- Carregamento da página
- Exibição das seções principais
- Lazy loading de seções
- Navegação por scroll
- Ordem correta das seções

### Navegação (3 testes)
- Exibição da barra de navegação
- Navegação persistente no scroll
- Navegação entre seções

### Livros (5 testes)
- Exibição da seção
- Listagem de livros
- Cards com conteúdo
- Filtros por editora
- Busca de livros

### Cursos (5 testes)
- Exibição da seção
- Listagem de cursos
- Cards com conteúdo
- Filtros por tag/instituição
- Busca de cursos

### Contato (5 testes)
- Exibição da seção
- Informações de contato
- Links de email válidos
- Links de redes sociais
- Abertura em nova aba

## Page Object Model

Os testes utilizam o padrão Page Object Model (POM) para:
- Encapsular lógica de interação com páginas
- Reutilizar código entre testes
- Facilitar manutenção quando o HTML muda
- Melhorar legibilidade dos testes

### Exemplo de uso

```typescript
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test('exemplo de teste', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  await expect(homePage.navigationSection).toBeVisible();
});
```

## Boas Práticas

### Seletores
1. Prefira `data-testid` quando possível
2. Use IDs semânticos como fallback
3. Evite seletores CSS frágeis

### Testes
1. Um teste deve testar apenas uma coisa
2. Use `beforeEach` para setup comum
3. Testes devem ser independentes
4. Use Page Objects ao invés de seletores diretos

### Performance
1. Execute testes em paralelo (padrão)
2. Use `test.describe.configure({ mode: 'parallel' })` quando apropriado
3. Minimize timeouts fixos, use auto-wait do Playwright

## Solução de Problemas

### Testes falhando
1. Verifique se o servidor dev está rodando (`npm start`)
2. Limpe o cache: `rm -rf test-results playwright-report`
3. Execute com UI mode: `npm run test:e2e:ui`

### Dependências faltando (Linux)
Se vir erros sobre bibliotecas faltando:
```bash
sudo npx playwright install-deps
```

### Timeout
Se testes estiverem dando timeout:
1. Aumente o timeout em `playwright.config.ts`
2. Verifique se a aplicação está demorando para carregar
3. Use `--debug` para investigar

## CI/CD

### GitHub Actions

O projeto possui dois workflows automatizados para testes E2E:

#### 1. Workflow Dedicado E2E (`.github/workflows/playwright-e2e.yml`)

Executa em:
- Push para `main` e `develop`
- Pull requests para `main` e `develop`
- Manualmente via `workflow_dispatch`

**Recursos:**
- Testa 3 browsers em paralelo (Chromium, Firefox, Mobile Chrome)
- Upload automático de artefatos em caso de falha:
  - Traces (depuração interativa)
  - Screenshots
  - Vídeos
  - Relatórios HTML
- Comentários automáticos em PRs com resultados
- Retention: 30 dias para relatórios, 7 dias para traces/vídeos

#### 2. Workflow de Deploy Azure (`.github/workflows/azure-static-web-apps-*.yml`)

Executa testes E2E **antes do deploy** para garantir qualidade:
1. Testes unitários (Karma/Jasmine)
2. Testes E2E (Playwright) - **gate de qualidade**
3. Build de produção
4. Deploy para Azure Static Web Apps

**Se os testes E2E falharem, o deploy é cancelado.**

### Executando localmente (simulando CI)

```bash
# Configurar variável de ambiente CI
export CI=true

# Instalar browsers (apenas primeira vez)
npx playwright install --with-deps chromium firefox

# Executar testes como no CI
npm run test:e2e
```

### Configuração para outros ambientes CI

**GitLab CI/CD:**
```yaml
test:e2e:
  image: mcr.microsoft.com/playwright:v1.56.0-jammy
  script:
    - npm ci
    - npm run test:e2e
  artifacts:
    when: always
    paths:
      - playwright-report/
      - test-results/
    expire_in: 30 days
```

**Jenkins:**
```groovy
stage('E2E Tests') {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.56.0-jammy'
    }
  }
  steps {
    sh 'npm ci'
    sh 'npm run test:e2e'
  }
  post {
    always {
      publishHTML([
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        reportName: 'Playwright Report'
      ])
    }
  }
}
```

**CircleCI:**
```yaml
jobs:
  test-e2e:
    docker:
      - image: mcr.microsoft.com/playwright:v1.56.0-jammy
    steps:
      - checkout
      - run: npm ci
      - run: npm run test:e2e
      - store_artifacts:
          path: playwright-report
          destination: playwright-report
```

### Otimizações de Performance no CI

1. **Cache de dependências:**
   - `node_modules`: cache por hash do `package-lock.json`
   - Browsers Playwright: cache por versão do `@playwright/test`

2. **Execução paralela:**
   - Matrix strategy para browsers diferentes
   - Sharding para distribuir testes: `--shard=1/3 --shard=2/3 --shard=3/3`

3. **Apenas browsers necessários:**
   - CI usa Chromium + Firefox (rápido e confiável)
   - Localmente pode testar todos incluindo mobile

### Monitoramento e Alertas

**Visualizar resultados:**
- GitHub Actions: aba "Actions" > workflow run > artefatos
- Azure: logs do build job
- Playwright Report HTML: baixar artefato e abrir `index.html`

**Em caso de falha:**
1. Baixe os traces: `playwright show-trace trace.zip`
2. Analise screenshots e vídeos dos artefatos
3. Execute localmente: `npm run test:e2e:debug`

## Recursos

- [Documentação Playwright](https://playwright.dev)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)
