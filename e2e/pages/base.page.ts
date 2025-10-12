import { Page } from '@playwright/test';

/**
 * Classe base para todos os Page Objects
 * Fornece funcionalidades comuns de navegação e interação
 */
export class BasePage {
  constructor(protected page: Page) {}

  /**
   * Navega para uma URL específica
   */
  async goto(path: string = '/'): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Aguarda a página estar totalmente carregada
   */
  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Obtém o título da página
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Verifica se elemento está visível
   */
  async isVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }

  /**
   * Faz scroll até um elemento
   */
  async scrollToElement(selector: string): Promise<void> {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Aguarda que um elemento esteja visível
   */
  async waitForSelector(selector: string, timeout: number = 5000): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }

  /**
   * Captura screenshot
   */
  async screenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `test-results/${name}.png`, fullPage: true });
  }
}
