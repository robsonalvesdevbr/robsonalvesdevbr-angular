import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page Object para a seção de Livros
 */
export class BookPage extends BasePage {
  readonly bookSection: Locator;
  readonly bookCards: Locator;
  readonly publisherFilter: Locator;
  readonly institutionFilter: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    super(page);

    this.bookSection = page.locator('[data-testid="books-section"]');
    this.bookCards = this.bookSection.locator('[data-testid="book-card"]');

    // Filtros - usando labels e inputs checkbox
    this.publisherFilter = this.bookSection.locator('label[id^="label_book_institution_"]').first();
    this.institutionFilter = this.publisherFilter; // Same as publisher
    this.searchInput = this.bookSection.locator('input[type="search"]').first();
  }

  /**
   * Navega até a seção de livros
   */
  async navigateToSection(): Promise<void> {
    await this.goto('/');
    await this.bookSection.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500);
  }

  /**
   * Obtém o número de livros exibidos
   */
  async getBookCount(): Promise<number> {
    await this.bookCards.first().waitFor({ state: 'visible', timeout: 5000 });
    return await this.bookCards.count();
  }

  /**
   * Filtra livros por editora
   */
  async filterByPublisher(publisher: string): Promise<void> {
    if (await this.publisherFilter.isVisible()) {
      await this.publisherFilter.selectOption(publisher);
      await this.page.waitForTimeout(500);
    }
  }

  /**
   * Filtra livros por instituição
   */
  async filterByInstitution(institution: string): Promise<void> {
    if (await this.institutionFilter.isVisible()) {
      await this.institutionFilter.selectOption(institution);
      await this.page.waitForTimeout(500);
    }
  }

  /**
   * Realiza busca de livros
   */
  async searchBooks(query: string): Promise<void> {
    if (await this.searchInput.isVisible()) {
      await this.searchInput.fill(query);
      await this.page.waitForTimeout(500);
    }
  }

  /**
   * Verifica se a seção de livros está visível
   */
  async isSectionVisible(): Promise<boolean> {
    return await this.bookSection.isVisible();
  }

  /**
   * Obtém títulos de todos os livros visíveis
   */
  async getVisibleBookTitles(): Promise<string[]> {
    const titles: string[] = [];
    const count = await this.bookCards.count();

    for (let i = 0; i < count; i++) {
      const card = this.bookCards.nth(i);
      const title = await card.locator('p.fw-bold').first().textContent();
      if (title) {
        // Remove estrelas e textos adicionais, pega só o título
        const cleanTitle = title.split('(')[0].trim();
        titles.push(cleanTitle);
      }
    }

    return titles;
  }
}
