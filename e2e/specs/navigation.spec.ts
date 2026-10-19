import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test.describe('Navegação', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('deve exibir a barra de navegação', async () => {
    await expect(homePage.navigationSection).toBeVisible();
  });

  test('deve manter a navegação visível ao fazer scroll', async () => {
    await homePage.navigateToSection('contact');
    await expect(homePage.navigationSection).toBeVisible();
  });

  for (const viewport of [
    { name: 'desktop', width: 1280, height: 800 },
    { name: 'mobile', width: 375, height: 800 },
  ]) {
    test(`deve deixar o título da seção abaixo da navegação após clicar no link (${viewport.name})`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await homePage.loadDeferredContent();

      for (const [link, section] of [
        ['nav-about', 'about'],
        ['nav-skills', 'skills'],
        ['nav-courses', 'courses'],
        ['nav-contact', 'contact'],
      ]) {
        if (viewport.name === 'mobile') {
          await page.getByRole('button', { name: /navega/i }).click();
        }
        await page.getByTestId(link).click();
        // A rolagem é suave e começa após um debounce: espera a posição ficar estável.
        await page.waitForFunction(
          () =>
            new Promise<boolean>(resolve => {
              let last = window.scrollY;
              let stable = 0;
              const timer = setInterval(() => {
                if (window.scrollY === last) {
                  if (++stable >= 4) {
                    clearInterval(timer);
                    resolve(true);
                  }
                } else {
                  stable = 0;
                  last = window.scrollY;
                }
              }, 120);
            }),
          undefined,
          { timeout: 10_000 },
        );

        const navBox = await homePage.navigationSection.boundingBox();
        const sectionBox = await page.locator(`section#${section}`).boundingBox();
        // O topo da seção fica logo abaixo da pílula (offset de rolagem), nem escondido nem longe demais.
        const gap = sectionBox!.y - (navBox!.y + navBox!.height);
        expect(gap, `distância entre a pílula e #${section}`).toBeGreaterThanOrEqual(0);
        // #contact está no fim da página e pode não alcançar o offset; as demais têm de alcançar.
        if (section !== 'contact') {
          expect(gap, `distância entre a pílula e #${section}`).toBeLessThanOrEqual(48);
        }
      }
    });
  }

  test('deve permitir navegação para diferentes seções', async () => {
    const sections: Array<'about' | 'graduation' | 'course' | 'book' | 'contact'> = [
      'about',
      'graduation',
      'course',
      'book',
      'contact'
    ];

    for (const section of sections) {
      await homePage.navigateToSection(section);
      await homePage.page.waitForTimeout(500);
      const isVisible = await homePage.isSectionInViewport(section);
      expect(isVisible).toBeTruthy();
    }
  });
});
