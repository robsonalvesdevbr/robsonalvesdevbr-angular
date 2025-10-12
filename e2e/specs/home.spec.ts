import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test.describe('Home Page', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('deve carregar a página home com sucesso', async () => {
    await expect(homePage.page).toHaveTitle(/Robson/i);
  });

  test('deve exibir as seções principais (Navigation e Masterhead)', async () => {
    const mainSectionsVisible = await homePage.areMainSectionsVisible();
    expect(mainSectionsVisible).toBeTruthy();
  });

  test('deve carregar seções com lazy loading', async ({ page }) => {
    await homePage.waitForLazyLoadedSections();

    await expect(homePage.aboutSection).toBeVisible();
    await expect(homePage.dashboardSection).toBeVisible();
    await expect(homePage.graduationSection).toBeVisible();
    await expect(homePage.courseSection).toBeVisible();
    await expect(homePage.formationCourseSection).toBeVisible();
    await expect(homePage.bookSection).toBeVisible();
    await expect(homePage.contactSection).toBeVisible();
    await expect(homePage.footerSection).toBeVisible();
  });

  test('deve navegar para a seção About através de scroll', async () => {
    await homePage.navigateToSection('about');
    const isVisible = await homePage.isSectionInViewport('about');
    expect(isVisible).toBeTruthy();
  });

  test('deve navegar para a seção Contact através de scroll', async () => {
    await homePage.navigateToSection('contact');
    const isVisible = await homePage.isSectionInViewport('contact');
    expect(isVisible).toBeTruthy();
  });

  test('deve exibir todas as seções na ordem correta', async () => {
    await homePage.waitForLazyLoadedSections();

    // Verifica se todas as seções existem no DOM
    const sections = [
      homePage.navigationSection,
      homePage.masterheadSection,
      homePage.aboutSection,
      homePage.dashboardSection,
      homePage.graduationSection,
      homePage.courseSection,
      homePage.formationCourseSection,
      homePage.bookSection,
      homePage.contactSection,
      homePage.footerSection,
    ];

    for (const section of sections) {
      await expect(section).toBeAttached();
    }
  });
});
