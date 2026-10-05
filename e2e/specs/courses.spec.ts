import { test, expect } from '@playwright/test';
import { CoursePage } from '../pages/course.page';

test.describe('Seção de Cursos', () => {
  let coursePage: CoursePage;

  test.beforeEach(async ({ page }) => {
    coursePage = new CoursePage(page);
    await coursePage.navigateToSection();
  });

  test('deve exibir a seção de cursos', async () => {
    const isVisible = await coursePage.isSectionVisible();
    expect(isVisible).toBeTruthy();
  });

  test('deve exibir pelo menos um curso', async () => {
    const courseCount = await coursePage.getCourseCount();
    expect(courseCount).toBeGreaterThan(0);
  });

  test('deve exibir cards de cursos com conteúdo', async () => {
    const courses = await coursePage.getVisibleCourses();
    expect(courses.length).toBeGreaterThan(0);

    // Verifica se os títulos não estão vazios
    for (const course of courses) {
      expect(course.length).toBeGreaterThan(0);
    }
  });

  test('deve permitir filtrar cursos por tag (se disponível)', async () => {
    const filterCount = await coursePage.filterButtons.count();

    if (filterCount > 0) {
      const initialCount = await coursePage.getCourseCount();

      // Tenta clicar no primeiro filtro
      const firstFilterText = await coursePage.filterButtons.first().textContent();
      if (firstFilterText) {
        await coursePage.filterByTag(firstFilterText.trim());
        await coursePage.page.waitForTimeout(1000);

        const filteredCount = await coursePage.getCourseCount();
        // Filtro pode reduzir ou manter a mesma quantidade
        expect(filteredCount).toBeLessThanOrEqual(initialCount);
      }
    }
  });

  test('deve permitir buscar cursos (se disponível)', async () => {
    const hasSearch = await coursePage.searchInput.isVisible();

    if (hasSearch) {
      const allCourses = await coursePage.getVisibleCourses();
      if (allCourses.length > 0) {
        // Busca pelo primeiro curso
        const firstCourse = allCourses[0];
        const searchTerm = firstCourse.split(' ')[0];

        await coursePage.searchCourses(searchTerm);
        await coursePage.page.waitForTimeout(1000);

        const filteredCourses = await coursePage.getVisibleCourses();
        expect(filteredCourses.length).toBeGreaterThan(0);
      }
    }
  });
});
