import { DOCUMENT } from '@angular/common';
import { afterNextRender, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoadingComponent } from '@path-components/utils/loading/loading.component';
import { PlaceholderComponent } from '@path-components/utils/placeholder/placeholder.component';
import { AboutComponent } from '@path-components/pages/about/about.component';
import { BookComponent } from '@path-components/pages/book/book.component';
import { ContactComponent } from '@path-components/pages/contact/contact.component';
import { CourseComponent } from '@path-components/pages/course/course.component';
import { FooterComponent } from '@path-components/pages/footer/footer.component';
import { FormationCourseComponent } from '@path-components/pages/formationcourse/formationcourse.component';
import { GraduationComponent } from '@path-components/pages/graduation/graduation.component';
import { MasterheadComponent } from '@path-components/pages/masterhead/masterhead.component';
import { SkillsComponent } from '@path-components/pages/skills/skills.component';
import { NavigationComponent } from '@path-components/pages/navigation/navigation.component';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavigationComponent,
    MasterheadComponent,
    AboutComponent,
    SkillsComponent,
    GraduationComponent,
    CourseComponent,
    FormationCourseComponent,
    BookComponent,
    ContactComponent,
    FooterComponent,
    PlaceholderComponent,
    LoadingComponent,
  ],
  template: `
    <!-- Navigation and Header load immediately (critical) -->
    <app-navigation />
    <app-masterhead [bglight]="true" />

    <!-- Main content with viewport-based lazy loading -->
    @defer (on viewport; prefetch on idle; when hasInitialFragment) {
      <app-about />
      <app-skills [bglight]="true" />
      <app-graduation />
      <app-course [bglight]="true" />
      <app-formationcourse />
      <app-book [bglight]="true" />
      <app-contact />
      <app-footer />
    } @loading (minimum 100ms; after 500ms) {
      <app-loading />
    } @placeholder (minimum 300ms) {
      <app-placeholder />
    } @error {
      <div class="error-fallback alert alert-warning text-center">
        <i class="bi bi-exclamation-triangle"></i>
        Erro ao carregar conteúdo. Tente recarregar a página.
      </div>
    }
  `,
})
export class HomeComponent {
  private readonly document = inject(DOCUMENT);

  // Com um fragmento na URL, o conteúdo diferido é carregado de imediato para
  // que a seção alvo exista no DOM sem depender de rolagem do usuário.
  readonly hasInitialFragment = this.initialFragment().length > 0;

  constructor() {
    afterNextRender(() => this.scrollToInitialFragment());
  }

  private initialFragment(): string {
    return decodeURIComponent(this.document.location?.hash.slice(1) ?? '');
  }

  // O anchorScrolling do Router roda logo após a navegação, quando o alvo ainda
  // está dentro do @defer; por isso a rolagem é feita assim que a seção surge e
  // corrigida enquanto o layout acima dela muda (imagens, fontes), até o usuário
  // interagir ou o layout estabilizar.
  private scrollToInitialFragment(): void {
    const fragment = this.initialFragment();
    if (!fragment) return;

    const scrollToTarget = (): boolean => {
      const target = this.document.getElementById(fragment);
      target?.scrollIntoView({ block: 'start', behavior: 'instant' });
      return target !== null;
    };

    const keepAligned = (): void => {
      const cleanup: (() => void)[] = [];
      const stop = (): void => cleanup.forEach(fn => fn());

      const resizeObserver = new ResizeObserver(() => scrollToTarget());
      resizeObserver.observe(this.document.body);
      cleanup.push(() => resizeObserver.disconnect());

      const timer = setTimeout(stop, 3_000);
      cleanup.push(() => clearTimeout(timer));

      for (const type of ['wheel', 'touchstart', 'keydown', 'mousedown']) {
        this.document.addEventListener(type, stop, { once: true, passive: true });
        cleanup.push(() => this.document.removeEventListener(type, stop));
      }
    };

    if (scrollToTarget()) {
      keepAligned();
      return;
    }

    const observer = new MutationObserver(() => {
      if (!scrollToTarget()) return;
      observer.disconnect();
      keepAligned();
    });
    observer.observe(this.document.body, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 10_000);
  }
}
