import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page Object para a página Home (SPA com todas as seções)
 */
export class HomePage extends BasePage {
  // Sections
  readonly navigationSection: Locator;
  readonly masterheadSection: Locator;
  readonly aboutSection: Locator;
  readonly dashboardSection: Locator;
  readonly graduationSection: Locator;
  readonly courseSection: Locator;
  readonly formationCourseSection: Locator;
  readonly bookSection: Locator;
  readonly contactSection: Locator;
  readonly footerSection: Locator;

  // Navigation links
  readonly navAboutLink: Locator;
  readonly navDashboardLink: Locator;
  readonly navGraduationLink: Locator;
  readonly navCourseLink: Locator;
  readonly navFormationLink: Locator;
  readonly navBookLink: Locator;
  readonly navContactLink: Locator;

  constructor(page: Page) {
    super(page);

    // Inicializa os locators das seções usando IDs e data-testid
    this.navigationSection = page.locator('[data-testid="main-navigation"]');
    this.masterheadSection = page.locator('#page-top');
    this.aboutSection = page.locator('#about');
    this.dashboardSection = page.locator('#dashboard');
    this.graduationSection = page.locator('#graduation');
    this.courseSection = page.locator('[data-testid="courses-section"]');
    this.formationCourseSection = page.locator('#formationcourse');
    this.bookSection = page.locator('[data-testid="books-section"]');
    this.contactSection = page.locator('[data-testid="contact-section"]');
    this.footerSection = page.locator('footer, [id*="footer"]');

    // Links de navegação (usando href como fallback caso não tenha data-testid)
    this.navAboutLink = page.locator('a[href*="about"], a[href*="#about"]').first();
    this.navDashboardLink = page.locator('a[href*="dashboard"], a[href*="#dashboard"]').first();
    this.navGraduationLink = page.locator('a[href*="graduation"], a[href*="#graduation"]').first();
    this.navCourseLink = page.locator('a[href*="course"], a[href*="#course"]').first();
    this.navFormationLink = page.locator('a[href*="formation"], a[href*="#formationcourse"]').first();
    this.navBookLink = page.locator('a[href*="book"], a[href*="#book"]').first();
    this.navContactLink = page.locator('a[href*="contact"], a[href*="#contact"]').first();
  }

  /**
   * Navega para a página home
   */
  async navigate(): Promise<void> {
    await this.goto('/');
    await this.waitForLoad();
  }

  /**
   * Verifica se todas as seções principais estão visíveis
   */
  async areMainSectionsVisible(): Promise<boolean> {
    return (
      (await this.navigationSection.isVisible()) &&
      (await this.masterheadSection.isVisible())
    );
  }

  /**
   * Aguarda seções com lazy loading estarem visíveis
   */
  async waitForLazyLoadedSections(timeout: number = 10000): Promise<void> {
    await this.page.waitForSelector('app-about', { state: 'visible', timeout });
    await this.page.waitForSelector('app-footer', { state: 'visible', timeout });
  }

  /**
   * Navega para uma seção específica através do scroll
   */
  async navigateToSection(section: 'about' | 'dashboard' | 'graduation' | 'course' | 'formation' | 'book' | 'contact'): Promise<void> {
    const sectionLocator = this.getSectionLocator(section);
    await sectionLocator.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500); // Aguarda animação de scroll
  }

  /**
   * Clica em um link de navegação
   */
  async clickNavLink(section: 'about' | 'dashboard' | 'graduation' | 'course' | 'formation' | 'book' | 'contact'): Promise<void> {
    const link = this.getNavLink(section);
    await link.click();
    await this.page.waitForTimeout(500); // Aguarda scroll suave
  }

  /**
   * Obtém o locator de uma seção
   */
  private getSectionLocator(section: string): Locator {
    const sections: Record<string, Locator> = {
      about: this.aboutSection,
      dashboard: this.dashboardSection,
      graduation: this.graduationSection,
      course: this.courseSection,
      formation: this.formationCourseSection,
      book: this.bookSection,
      contact: this.contactSection,
    };
    return sections[section];
  }

  /**
   * Obtém o locator de um link de navegação
   */
  private getNavLink(section: string): Locator {
    const links: Record<string, Locator> = {
      about: this.navAboutLink,
      dashboard: this.navDashboardLink,
      graduation: this.navGraduationLink,
      course: this.navCourseLink,
      formation: this.navFormationLink,
      book: this.navBookLink,
      contact: this.navContactLink,
    };
    return links[section];
  }

  /**
   * Verifica se uma seção específica está visível na viewport
   */
  async isSectionInViewport(section: 'about' | 'dashboard' | 'graduation' | 'course' | 'formation' | 'book' | 'contact'): Promise<boolean> {
    const sectionLocator = this.getSectionLocator(section);
    return await sectionLocator.isVisible();
  }
}
