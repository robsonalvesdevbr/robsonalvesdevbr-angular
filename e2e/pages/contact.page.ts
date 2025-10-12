import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page Object para a seção de Contato
 */
export class ContactPage extends BasePage {
  readonly contactSection: Locator;
  readonly emailLinks: Locator;
  readonly socialLinks: Locator;
  readonly linkedinLink: Locator;
  readonly githubLink: Locator;

  constructor(page: Page) {
    super(page);

    this.contactSection = page.locator('[data-testid="contact-section"]');
    this.emailLinks = this.contactSection.locator('a[href^="mailto:"]');
    this.socialLinks = this.contactSection.locator('a[href*="linkedin"], a[href*="github"], a[href*="instagram"]');
    this.linkedinLink = this.contactSection.locator('a[href*="linkedin"]').first();
    this.githubLink = this.contactSection.locator('a[href*="github"]').first();
  }

  /**
   * Navega até a seção de contato
   */
  async navigateToSection(): Promise<void> {
    await this.goto('/');
    await this.contactSection.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500);
  }

  /**
   * Verifica se a seção de contato está visível
   */
  async isSectionVisible(): Promise<boolean> {
    return await this.contactSection.isVisible();
  }

  /**
   * Verifica se os links de email estão presentes
   */
  async hasEmailLinks(): Promise<boolean> {
    return (await this.emailLinks.count()) > 0;
  }

  /**
   * Verifica se os links sociais estão presentes
   */
  async hasSocialLinks(): Promise<boolean> {
    return (await this.socialLinks.count()) > 0;
  }

  /**
   * Obtém o href do link do LinkedIn
   */
  async getLinkedInUrl(): Promise<string | null> {
    if (await this.linkedinLink.isVisible()) {
      return await this.linkedinLink.getAttribute('href');
    }
    return null;
  }

  /**
   * Obtém o href do link do GitHub
   */
  async getGitHubUrl(): Promise<string | null> {
    if (await this.githubLink.isVisible()) {
      return await this.githubLink.getAttribute('href');
    }
    return null;
  }

  /**
   * Obtém todos os emails de contato
   */
  async getContactEmails(): Promise<string[]> {
    const emails: string[] = [];
    const count = await this.emailLinks.count();

    for (let i = 0; i < count; i++) {
      const href = await this.emailLinks.nth(i).getAttribute('href');
      if (href) {
        // Remove "mailto:" e tudo após "?" (query params como subject)
        const email = href.replace('mailto:', '').split('?')[0];
        emails.push(email);
      }
    }

    return emails;
  }
}
