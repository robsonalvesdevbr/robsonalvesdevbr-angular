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
      // O conteúdo é carregado por @defer (on viewport): rola um pouco para disparar o carregamento.
      await page.mouse.wheel(0, 600);
      await page.locator('section#contact').waitFor({ state: 'attached' });

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
        await page.waitForFunction(
          () =>
            new Promise<boolean>(resolve => {
              const y = window.scrollY;
              setTimeout(() => resolve(window.scrollY === y), 250);
            }),
        );

        const navBox = await homePage.navigationSection.boundingBox();
        const headingBox = await page.locator(`section#${section} h2`).first().boundingBox();
        expect(headingBox!.y, `título de #${section}`).toBeGreaterThanOrEqual(
          navBox!.y + navBox!.height,
        );
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
