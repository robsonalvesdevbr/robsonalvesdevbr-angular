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
