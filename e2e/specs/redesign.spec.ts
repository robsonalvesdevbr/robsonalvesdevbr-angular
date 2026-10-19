import { test, expect, Locator } from '@playwright/test';
import { HomePage } from '../pages/home.page';

const imageLoaded = (img: Locator) => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0);

test.describe('Redesign bento', () => {
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.navigate();
  });

  test('hero deve exibir nome, retrato carregado e as quatro métricas', async ({ page }) => {
    await expect(page.locator('h1.masthead-heading')).toHaveText('Robson Alves');
    await expect.poll(() => imageLoaded(page.locator('img.masthead-photo'))).toBe(true);

    const stats = page.getByTestId('masthead-stat');
    await expect(stats).toHaveCount(4);
    for (const stat of await stats.all()) {
      await expect(stat.locator('.stat-value')).toHaveText(/^\d+\+?$/);
    }
  });

  test('skills devem ser exibidas como cards com pílulas', async ({ page }) => {
    await home.loadDeferredContent();
    const section = page.getByTestId('skills-section');
    await expect(section.locator('.tile').first()).toBeAttached();
    expect(await section.locator('.pill').count()).toBeGreaterThan(5);
  });

  test('(pós)graduação deve exibir cards com logo da instituição', async ({ page }) => {
    await home.loadDeferredContent();
    const cards = page.getByTestId('graduation-card');
    expect(await cards.count()).toBeGreaterThan(0);
    for (const card of await cards.all()) {
      await expect(card.locator('img.item-logo')).toHaveAttribute('src', /.+/);
    }
  });

  test('trilhas devem paginar e atualizar a numeração dos cards', async ({ page }) => {
    await home.loadDeferredContent();
    const cards = page.getByTestId('formation-card');
    await expect(cards).toHaveCount(8);
    await expect(cards.first().locator('.item-index')).toHaveText(/\b1\s*$/);

    const next = page.locator('#trilhas .pagination-next a');
    await next.scrollIntoViewIfNeeded();
    await next.click();
    await expect(cards.first().locator('.item-index')).toHaveText(/\b9\s*$/);
  });

  test('chip de instituição deve filtrar cursos e mostrar o filtro ativo', async ({ page }) => {
    await home.loadDeferredContent();
    const cards = page.getByTestId('course-card');
    const quantity = page.locator('#courses .section-subheading .pill');
    const before = await quantity.innerText();

    const chip = page.locator('label[id^="label_course_institution_"]', { hasText: 'Alura' });
    await chip.scrollIntoViewIfNeeded();
    await chip.click();

    await expect(chip).toHaveClass(/active/);
    await expect(page.locator('#courses .catalog-active .pill', { hasText: 'Alura' })).toBeVisible();
    await expect(page.locator('#courses .item-meta', { hasText: 'Alura' }).first()).toBeVisible();
    expect(await cards.count()).toBeGreaterThan(0);
    await expect(quantity).not.toHaveText(before);
  });

  for (const [name, listId, width] of [
    ['tags de cursos', 'course-tag-chips', 1280],
    ['tags de livros', 'book-tag-chips', 1280],
    ['instituições de cursos', 'course-institution-chips', 375],
    ['editoras de livros', 'book-institution-chips', 768],
  ] as const) {
    test(`filtro de ${name} deve mostrar uma linha e expandir pela seta`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.reload();
      await home.loadDeferredContent();
      const chips = page.locator(`#${listId}`);
      const toggle = page.locator(`button[aria-controls="${listId}"]`);
      await toggle.scrollIntoViewIfNeeded();

      const heightOf = () => chips.evaluate(el => el.getBoundingClientRect().height);
      expect(await heightOf(), 'recolhido: só a primeira linha').toBeLessThan(40);
      await expect(toggle).toHaveAttribute('aria-expanded', 'false');

      await toggle.click();
      await expect(toggle).toHaveAttribute('aria-expanded', 'true');
      await expect.poll(heightOf).toBeGreaterThan(60);

      await toggle.click();
      await expect.poll(heightOf).toBeLessThan(40);
    });
  }

  test('a seta do filtro de instituições some quando os chips cabem em uma linha', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1920, height: 900 });
    await page.reload();
    await home.loadDeferredContent();
    await page.locator('#course-institution-chips').scrollIntoViewIfNeeded();

    await expect(page.locator('button[aria-controls="course-institution-chips"]')).toHaveCount(0);
    await expect(page.locator('button[aria-controls="course-tag-chips"]')).toHaveCount(1);
  });

  for (const [name, listId] of [
    ['cursos', 'course-tag-chips'],
    ['livros', 'book-tag-chips'],
  ]) {
    test(`foco por teclado em tag oculta de ${name} deve abrir a lista`, async ({ page }) => {
      await home.loadDeferredContent();
      const chips = page.locator(`#${listId}`);
      await chips.scrollIntoViewIfNeeded();

      await chips.locator('input').last().focus();
      await expect
        .poll(() => chips.evaluate(el => el.getBoundingClientRect().height))
        .toBeGreaterThan(80);
    });
  }

  test('favorito deve ser um selo no canto do logo do card', async ({ page }) => {
    await home.loadDeferredContent();
    const card = page.getByTestId('course-card').first();
    await card.scrollIntoViewIfNeeded();

    const logo = await card.locator('img.item-logo').boundingBox();
    const badge = await card.locator('.item-favorite').boundingBox();
    expect(badge, 'selo de favorito presente no primeiro card').not.toBeNull();
    // canto inferior direito do logo: o selo encosta no logo e fica à direita/abaixo do centro
    expect(badge!.x).toBeLessThan(logo!.x + logo!.width);
    expect(badge!.x + badge!.width).toBeGreaterThan(logo!.x + logo!.width - 4);
    expect(badge!.y + badge!.height).toBeGreaterThan(logo!.y + logo!.height - 4);
    await expect(card.locator('.item-title i.icon-favorite')).toHaveCount(0);
  });

  test('contato deve exibir foto carregada, e-mail e currículo', async ({ page }) => {
    await home.loadDeferredContent();
    const section = page.getByTestId('contact-section');
    await section.scrollIntoViewIfNeeded();

    await expect.poll(() => imageLoaded(section.locator('img.contact-photo'))).toBe(true);
    await expect(page.getByTestId('contact-email')).toHaveAttribute('href', /^mailto:.+@.+/);
    await expect(page.getByTestId('contact-resume')).toHaveAttribute('href', /Curriculo.*\.pdf$/);
  });

  test('rodapé deve abrir links externos com rel="noopener"', async ({ page }) => {
    await home.loadDeferredContent();
    const links = page.locator('footer.site-footer a[target="_blank"]');
    await expect(links).toHaveCount(2);
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute('rel', 'noopener');
    }
  });

  test('o primeiro Tab deve focar o skip-link', async ({ page }) => {
    await page.keyboard.press('Tab');
    await expect(page.getByTestId('skip-link')).toBeFocused();
  });

  test('ativar o skip-link deve levar o foco ao conteúdo principal antes de qualquer rolagem', async ({
    page,
  }) => {
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page.locator('#main-content')).toBeFocused();
  });

  test('tema deve mudar a cor de fundo do documento ao alternar', async ({ page }) => {
    const background = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    const dark = await background();

    await page.getByTestId('theme-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-bs-theme', 'light');
    await expect.poll(background).not.toBe(dark);
  });

  test('menu mobile deve abrir e fechar ao escolher uma seção', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.reload();
    await home.loadDeferredContent();

    const toggler = page.locator('.navbar-toggler');
    await toggler.click();
    await expect(toggler).toHaveAttribute('aria-expanded', 'true');

    await page.getByTestId('nav-skills').click();
    await expect(toggler).toHaveAttribute('aria-expanded', 'false');
  });
});
