import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test.describe('Layout bento', () => {
  for (const width of [375, 768, 1280]) {
    test(`não deve gerar rolagem horizontal em EN-US a ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/');
      await page.click('[data-testid="language-switcher-button"]');
      await page.click('[data-testid="lang-en-us"]');
      await expect(page.locator('[data-testid="nav-about"]')).toContainText('About');
      await new HomePage(page).loadDeferredContent();

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  test('deve animar a entrada dos cards quando não há preferência por menos movimento', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/');
    await new HomePage(page).loadDeferredContent();

    const name = await page
      .locator('section#contact .tile')
      .first()
      .evaluate(el => getComputedStyle(el).animationName);
    expect(name).toBe('tile-reveal');
  });

  test('deve manter os cards visíveis e sem animação com prefers-reduced-motion', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await new HomePage(page).loadDeferredContent();

    const tile = page.locator('section#contact .tile').first();
    await tile.scrollIntoViewIfNeeded();
    const style = await tile.evaluate(el => {
      const computed = getComputedStyle(el);
      return { animationName: computed.animationName, opacity: computed.opacity };
    });
    expect(style).toEqual({ animationName: 'none', opacity: '1' });
  });

  test('deve iniciar no tema escuro mesmo com o sistema em tema claro', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await expect(page.locator('html')).toHaveAttribute('data-bs-theme', 'dark');
  });
});
