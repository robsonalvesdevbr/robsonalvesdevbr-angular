import { test, expect } from '@playwright/test';

test.describe('Language Switching', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.goto('/');
  });

  test('should display language switcher in navigation', async ({ page }) => {
    const switcher = page.locator('[data-testid="language-switcher"]');
    await expect(switcher).toBeVisible();
  });

  test('should default to Portuguese (PT-BR)', async ({ page }) => {
    // Check navigation links are in Portuguese
    const aboutLink = page.locator('[data-testid="nav-about"]');
    await expect(aboutLink).toContainText('Sobre');

    const dashboardLink = page.locator('[data-testid="nav-dashboard"]');
    await expect(dashboardLink).toContainText('Dashboard');

    // Check language flag
    const flag = page.locator('[data-testid="language-flag"]');
    await expect(flag).toContainText('🇧🇷');
  });

  test('should switch from PT-BR to EN-US when clicking language switcher', async ({ page }) => {
    // Verify initial language is PT-BR
    let aboutLink = page.locator('[data-testid="nav-about"]');
    await expect(aboutLink).toContainText('Sobre');

    // Click language switcher
    await page.click('[data-testid="language-switcher-button"]');

    // Wait for language to change
    await page.waitForTimeout(100);

    // Verify language changed to EN-US
    aboutLink = page.locator('[data-testid="nav-about"]');
    await expect(aboutLink).toContainText('About');

    const dashboardLink = page.locator('[data-testid="nav-dashboard"]');
    await expect(dashboardLink).toContainText('Dashboard');

    const graduationLink = page.locator('[data-testid="nav-graduation"]');
    await expect(graduationLink).toContainText('(Post)Graduation');

    // Check flag changed to US
    const flag = page.locator('[data-testid="language-flag"]');
    await expect(flag).toContainText('🇺🇸');
  });

  test('should switch back from EN-US to PT-BR', async ({ page }) => {
    // Switch to English
    await page.click('[data-testid="language-switcher-button"]');
    await page.waitForTimeout(100);

    // Verify in English
    let aboutLink = page.locator('[data-testid="nav-about"]');
    await expect(aboutLink).toContainText('About');

    // Switch back to Portuguese
    await page.click('[data-testid="language-switcher-button"]');
    await page.waitForTimeout(100);

    // Verify back in Portuguese
    aboutLink = page.locator('[data-testid="nav-about"]');
    await expect(aboutLink).toContainText('Sobre');

    const flag = page.locator('[data-testid="language-flag"]');
    await expect(flag).toContainText('🇧🇷');
  });

  test('should persist language choice on reload', async ({ page }) => {
    // Switch to English
    await page.click('[data-testid="language-switcher-button"]');
    await page.waitForTimeout(100);

    // Verify in English
    let aboutLink = page.locator('[data-testid="nav-about"]');
    await expect(aboutLink).toContainText('About');

    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Verify language persists
    aboutLink = page.locator('[data-testid="nav-about"]');
    await expect(aboutLink).toContainText('About');

    const flag = page.locator('[data-testid="language-flag"]');
    await expect(flag).toContainText('🇺🇸');
  });

  test('should update all translated strings across sections', async ({ page }) => {
    // Elements to check
    const elementsToCheck = [
      { selector: '[data-testid="nav-about"]', ptText: 'Sobre', enText: 'About' },
      { selector: '[data-testid="nav-courses"]', ptText: 'Cursos', enText: 'Courses' },
      { selector: '[data-testid="nav-books"]', ptText: 'Leituras', enText: 'Readings' },
      { selector: '[data-testid="nav-contact"]', ptText: 'Contato', enText: 'Contact' }
    ];

    // Verify PT-BR
    for (const element of elementsToCheck) {
      await expect(page.locator(element.selector)).toContainText(element.ptText);
    }

    // Switch to EN-US
    await page.click('[data-testid="language-switcher-button"]');
    await page.waitForTimeout(100);

    // Verify EN-US
    for (const element of elementsToCheck) {
      await expect(page.locator(element.selector)).toContainText(element.enText);
    }
  });

  test('should translate dashboard section', async ({ page }) => {
    // Navigate to dashboard section
    await page.click('[data-testid="nav-dashboard"]');
    await page.waitForTimeout(500);

    // Check dashboard title in Portuguese
    const dashboardTitle = page.locator('[data-testid="dashboard-title"]');
    await expect(dashboardTitle).toContainText('Dashboard Pessoal');

    // Switch to English
    await page.click('[data-testid="language-switcher-button"]');
    await page.waitForTimeout(100);

    // Check dashboard title in English
    await expect(dashboardTitle).toContainText('Personal Dashboard');

    const dashboardSubtitle = page.locator('[data-testid="dashboard-subtitle"]');
    await expect(dashboardSubtitle).toContainText('Statistics and metrics from my learning journey');
  });

  test('should translate about section', async ({ page }) => {
    // Navigate to about section
    await page.click('[data-testid="nav-about"]');
    await page.waitForTimeout(500);

    // Check about title in Portuguese
    const aboutTitle = page.locator('[data-testid="about-title"]');
    await expect(aboutTitle).toContainText('Sobre');

    // Switch to English
    await page.click('[data-testid="language-switcher-button"]');
    await page.waitForTimeout(100);

    // Check about title in English
    await expect(aboutTitle).toContainText('About');

    const aboutSubtitle = page.locator('[data-testid="about-subtitle"]');
    await expect(aboutSubtitle).toContainText('Learn about my 23+ years professional journey');
  });

  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Open mobile menu
    await page.click('button.navbar-toggler');
    await page.waitForTimeout(300);

    // Check language switcher is visible
    const switcher = page.locator('[data-testid="language-switcher"]');
    await expect(switcher).toBeVisible();

    // Click language switcher
    await page.click('[data-testid="language-switcher-button"]');
    await page.waitForTimeout(100);

    // Verify language changed
    const aboutLink = page.locator('[data-testid="nav-about"]');
    await expect(aboutLink).toContainText('About');
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    // Check aria-label on button
    const button = page.locator('[data-testid="language-switcher-button"]');
    const ariaLabel = await button.getAttribute('aria-label');
    expect(ariaLabel).toContain('idioma');

    // Switch language
    await page.click('[data-testid="language-switcher-button"]');
    await page.waitForTimeout(100);

    // Check aria-label changed
    const newAriaLabel = await button.getAttribute('aria-label');
    expect(newAriaLabel).toContain('language');
  });

  test('should update document lang attribute', async ({ page }) => {
    // Check initial lang attribute
    let htmlLang = await page.evaluate(() => document.documentElement.lang);
    expect(htmlLang).toBe('pt-BR');

    // Switch language
    await page.click('[data-testid="language-switcher-button"]');
    await page.waitForTimeout(100);

    // Check lang attribute changed
    htmlLang = await page.evaluate(() => document.documentElement.lang);
    expect(htmlLang).toBe('en-US');
  });
});
