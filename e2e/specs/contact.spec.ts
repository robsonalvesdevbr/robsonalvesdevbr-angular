import { test, expect } from '@playwright/test';
import { ContactPage } from '../pages/contact.page';

test.describe('Seção de Contato', () => {
  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
    await contactPage.navigateToSection();
  });

  test('deve exibir a seção de contato', async () => {
    const isVisible = await contactPage.isSectionVisible();
    expect(isVisible).toBeTruthy();
  });

  test('deve exibir informações de contato', async () => {
    const hasEmail = await contactPage.hasEmailLinks();
    const hasSocial = await contactPage.hasSocialLinks();

    // Deve ter pelo menos um meio de contato
    expect(hasEmail || hasSocial).toBeTruthy();
  });

  test('deve ter links de email válidos', async () => {
    const hasEmail = await contactPage.hasEmailLinks();

    if (hasEmail) {
      const emails = await contactPage.getContactEmails();
      expect(emails.length).toBeGreaterThan(0);

      // Verifica formato básico de email
      for (const email of emails) {
        expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      }
    }
  });

  test('deve ter links de redes sociais (se disponíveis)', async () => {
    const hasSocial = await contactPage.hasSocialLinks();

    if (hasSocial) {
      const linkedinUrl = await contactPage.getLinkedInUrl();
      const githubUrl = await contactPage.getGitHubUrl();

      // Pelo menos um link social deve existir
      expect(linkedinUrl !== null || githubUrl !== null).toBeTruthy();

      // Valida URLs se existirem
      if (linkedinUrl) {
        expect(linkedinUrl).toContain('linkedin.com');
      }

      if (githubUrl) {
        expect(githubUrl).toContain('github.com');
      }
    }
  });

  test('links sociais devem abrir em nova aba', async () => {
    const socialLinks = await contactPage.socialLinks.all();

    for (const link of socialLinks) {
      const target = await link.getAttribute('target');
      const rel = await link.getAttribute('rel');

      // Links externos devem ter target="_blank" e rel="noopener noreferrer"
      expect(target).toBe('_blank');
      expect(rel).toContain('noopener');
    }
  });
});
