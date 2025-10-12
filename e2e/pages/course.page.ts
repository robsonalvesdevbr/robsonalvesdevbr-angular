import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page Object para a seção de Cursos
 */
export class CoursePage extends BasePage {
  readonly courseSection: Locator;
  readonly courseCards: Locator;
  readonly filterButtons: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    super(page);

    this.courseSection = page.locator('[data-testid="courses-section"]');
    this.courseCards = this.courseSection.locator('[data-testid="course-card"]');
    this.filterButtons = this.courseSection.locator('label[id^="label_course_"]');
    this.searchInput = this.courseSection.locator('input[type="search"]').first();
  }

  /**
   * Navega até a seção de cursos
   */
  async navigateToSection(): Promise<void> {
    await this.goto('/');
    await this.courseSection.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500);
  }

  /**
   * Obtém o número de cursos exibidos
   */
  async getCourseCount(): Promise<number> {
    await this.courseCards.first().waitFor({ state: 'visible', timeout: 5000 });
    return await this.courseCards.count();
  }

  /**
   * Aplica filtro por categoria/tag
   */
  async filterByTag(tag: string): Promise<void> {
    const filterButton = this.filterButtons.filter({ hasText: tag }).first();
    if (await filterButton.isVisible()) {
      await filterButton.click();
      await this.page.waitForTimeout(500);
    }
  }

  /**
   * Realiza busca de cursos
   */
  async searchCourses(query: string): Promise<void> {
    if (await this.searchInput.isVisible()) {
      await this.searchInput.fill(query);
      await this.page.waitForTimeout(500);
    }
  }

  /**
   * Verifica se a seção de cursos está visível
   */
  async isSectionVisible(): Promise<boolean> {
    return await this.courseSection.isVisible();
  }

  /**
   * Obtém todos os cursos visíveis
   */
  async getVisibleCourses(): Promise<string[]> {
    const titles: string[] = [];
    const count = await this.courseCards.count();

    for (let i = 0; i < count; i++) {
      const card = this.courseCards.nth(i);
      const title = await card.locator('p.fw-bold').first().textContent();
      if (title) {
        // Remove estrelas e espaços extras
        const cleanTitle = title.replace(/★/g, '').trim();
        titles.push(cleanTitle);
      }
    }

    return titles;
  }
}
