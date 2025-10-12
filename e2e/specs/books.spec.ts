import { test, expect } from '@playwright/test';
import { BookPage } from '../pages/book.page';

test.describe('Seção de Livros', () => {
  let bookPage: BookPage;

  test.beforeEach(async ({ page }) => {
    bookPage = new BookPage(page);
    await bookPage.navigateToSection();
  });

  test('deve exibir a seção de livros', async () => {
    const isVisible = await bookPage.isSectionVisible();
    expect(isVisible).toBeTruthy();
  });

  test('deve exibir pelo menos um livro', async () => {
    const bookCount = await bookPage.getBookCount();
    expect(bookCount).toBeGreaterThan(0);
  });

  test('deve exibir cards de livros com conteúdo', async () => {
    const titles = await bookPage.getVisibleBookTitles();
    expect(titles.length).toBeGreaterThan(0);

    // Verifica se os títulos não estão vazios
    for (const title of titles) {
      expect(title.length).toBeGreaterThan(0);
    }
  });

  test('deve permitir filtrar livros por editora (se disponível)', async () => {
    const hasFilter = await bookPage.publisherFilter.isVisible();

    if (hasFilter) {
      const initialCount = await bookPage.getBookCount();

      // Tenta aplicar primeiro filtro disponível
      const options = await bookPage.publisherFilter.locator('option').allTextContents();
      if (options.length > 1) {
        await bookPage.filterByPublisher(options[1]);
        await bookPage.page.waitForTimeout(1000);

        const filteredCount = await bookPage.getBookCount();
        // Filtro pode reduzir ou manter a mesma quantidade
        expect(filteredCount).toBeLessThanOrEqual(initialCount);
      }
    }
  });

  test('deve permitir buscar livros (se disponível)', async () => {
    const hasSearch = await bookPage.searchInput.isVisible();

    if (hasSearch) {
      const allTitles = await bookPage.getVisibleBookTitles();
      if (allTitles.length > 0) {
        // Busca pelo primeiro livro
        const firstTitle = allTitles[0];
        const searchTerm = firstTitle.split(' ')[0];

        await bookPage.searchBooks(searchTerm);
        await bookPage.page.waitForTimeout(1000);

        const filteredTitles = await bookPage.getVisibleBookTitles();
        expect(filteredTitles.length).toBeGreaterThan(0);
      }
    }
  });
});
