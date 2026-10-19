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

      // `.page-section` usa contain: paint, que recorta o excesso sem gerar rolagem horizontal;
      // por isso o teste também mede cada elemento (e a navegação, que é fixed).
      const offenders = await page.evaluate(() => {
        const limit = window.innerWidth;
        const bad: string[] = [];
        for (const el of document.querySelectorAll<HTMLElement>(
          '#mainNav, #mainNav *, section *, footer *',
        )) {
          if (el.closest('.visually-hidden') || el.classList.contains('btn-check')) continue;
          const rect = el.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) continue;
          if (rect.right > limit + 1 || rect.left < -1) {
            bad.push(`${el.tagName.toLowerCase()}.${el.className}`.slice(0, 70));
          }
        }
        return bad.slice(0, 10);
      });
      expect(offenders).toEqual([]);
    });
  }

  for (const width of [320, 360, 992, 1024, 1100, 1199]) {
    test(`a navegação deve caber numa linha dentro da pílula em EN-US a ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/');
      await page.click('[data-testid="language-switcher-button"]');
      await page.click('[data-testid="lang-en-us"]');
      await expect(page.locator('[data-testid="nav-about"]')).toContainText('About');

      const pill = await page.locator('#mainNav > .container').boundingBox();
      expect(pill!.height, 'a pílula não pode quebrar em duas linhas').toBeLessThanOrEqual(72);

      if (width >= 992) {
        const last = await page.getByTestId('nav-contact').boundingBox();
        expect(last!.x + last!.width, 'último link dentro da pílula').toBeLessThanOrEqual(
          pill!.x + pill!.width,
        );
      }
    });
  }

  test('deve animar a entrada dos cards quando não há preferência por menos movimento', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/');
    const supported = await page.evaluate(() => CSS.supports('animation-timeline: view()'));
    test.skip(!supported, 'navegador sem suporte a scroll-driven animations');
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
