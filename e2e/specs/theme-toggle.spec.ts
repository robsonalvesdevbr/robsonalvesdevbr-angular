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

    const initialTheme = await page.locator('html').getAttribute('data-bs-theme');
    await toggle.click();

    const newTheme = await page.locator('html').getAttribute('data-bs-theme');
    expect(newTheme).not.toBe(initialTheme);
    expect(['light', 'dark']).toContain(newTheme);
  });

  test('deve persistir o tema após reload', async ({ page }) => {
    const toggle = page.getByTestId('theme-toggle');
    await toggle.click();

    const themeAfterToggle = await page.locator('html').getAttribute('data-bs-theme');
    const storedTheme = await page.evaluate(() => localStorage.getItem('app-theme'));
    expect(storedTheme).toBe(themeAfterToggle);

    await page.reload();
    await page.waitForLoadState('networkidle');

    const themeAfterReload = await page.locator('html').getAttribute('data-bs-theme');
    expect(themeAfterReload).toBe(themeAfterToggle);
  });

  test('deve ter aria-label acessível no botão de tema', async ({ page }) => {
    const toggle = page.getByTestId('theme-toggle');
    const ariaLabel = await toggle.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
  });
});
