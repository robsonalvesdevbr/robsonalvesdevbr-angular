import { test, expect } from '@playwright/test';

test.describe('Theme Toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('deve aplicar um tema válido no carregamento', async ({ page }) => {
    const theme = await page.locator('html').getAttribute('data-bs-theme');
    expect(['light', 'dark']).toContain(theme);
  });

  test('deve alternar o tema ao clicar no botão', async ({ page }) => {
    const toggle = page.getByTestId('theme-toggle');
    await expect(toggle).toBeVisible();

    const html = page.locator('html');
    const initialTheme = await html.getAttribute('data-bs-theme');
    await toggle.click();

    // O atributo é escrito por um effect() zoneless, agendado assíncrono —
    // usa expect com auto-retry em vez de ler o atributo uma vez só.
    const expectedTheme = initialTheme === 'dark' ? 'light' : 'dark';
    await expect(html).toHaveAttribute('data-bs-theme', expectedTheme);
  });

  test('deve persistir o tema após reload', async ({ page }) => {
    const toggle = page.getByTestId('theme-toggle');
    const html = page.locator('html');
    const initialTheme = await html.getAttribute('data-bs-theme');
    const expectedTheme = initialTheme === 'dark' ? 'light' : 'dark';

    await toggle.click();
    await expect(html).toHaveAttribute('data-bs-theme', expectedTheme);

    const storedTheme = await page.evaluate(() => localStorage.getItem('app-theme'));
    expect(storedTheme).toBe(expectedTheme);

    await page.reload();
    await page.waitForLoadState('networkidle');

    await expect(html).toHaveAttribute('data-bs-theme', expectedTheme);
  });

  test('deve ter aria-label acessível no botão de tema', async ({ page }) => {
    const toggle = page.getByTestId('theme-toggle');
    const ariaLabel = await toggle.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
  });
});
