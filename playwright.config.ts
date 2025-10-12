import { defineConfig, devices } from '@playwright/test';

/**
 * Configuração do Playwright para testes E2E
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Diretório onde os testes E2E estão localizados
  testDir: './e2e',

  // Timeout máximo por teste (30 segundos)
  timeout: 30 * 1000,

  // Timeout para cada assertion (5 segundos)
  expect: {
    timeout: 5000,
  },

  // Configuração de execução
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Configuração de relatórios
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
    process.env.CI ? ['github'] : ['null'],
  ].filter((r) => r[0] !== 'null'),

  // Configurações compartilhadas para todos os projetos
  use: {
    // URL base da aplicação
    baseURL: 'http://localhost:4200',

    // Coleta de traces em caso de falha
    trace: 'on-first-retry',

    // Screenshot em falhas
    screenshot: 'only-on-failure',

    // Vídeo em falhas
    video: 'retain-on-failure',

    // Timeout para navegação
    navigationTimeout: 10 * 1000,

    // Timeout para ações
    actionTimeout: 5 * 1000,
  },

  // Projetos de teste (múltiplos browsers)
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
      },
    },

    // WebKit (Safari) - requer dependências adicionais no Linux
    // Descomente se estiver em macOS ou Windows, ou instale deps: sudo npx playwright install-deps
    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     viewport: { width: 1920, height: 1080 },
    //   },
    // },

    // Testes mobile
    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 5'],
      },
    },

    // Mobile Safari - requer dependências adicionais no Linux
    // Descomente se estiver em macOS ou Windows, ou instale deps: sudo npx playwright install-deps
    // {
    //   name: 'mobile-safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },
  ],

  // Configuração do servidor de desenvolvimento
  webServer: {
    command: 'npm start',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
