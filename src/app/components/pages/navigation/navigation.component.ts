import { ChangeDetectionStrategy, Component, inject, OnDestroy, signal, afterNextRender } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AnalyticsService } from '@path-services/analytics.service';
import { ElementCache, debounce, BatchProcessor, isReducedMotion } from '@path-utils/performance.utils';
import { LanguageSwitcherComponent } from '@path-components/language-switcher/language-switcher.component';
import { ThemeToggleComponent } from '@path-components/theme-toggle/theme-toggle.component';
import { TranslatePipe } from '@path-pipes/translate.pipe';

@Component({
  selector: 'app-navigation',
  imports: [NgxPaginationModule, NgOptimizedImage, LanguageSwitcherComponent, ThemeToggleComponent, TranslatePipe],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent extends BasePageComponent implements OnDestroy {
  private readonly analyticsService = inject(AnalyticsService);

  isMenuOpen = signal(false);
  activeSection = signal<string>('');
  private _scrollObserver: IntersectionObserver | null = null;

  private readonly navbarHeights = {
    mobile: 110,
    shrink: 106,
    normal: 126
  };

  private analyticsBatcher: BatchProcessor<() => void>;
  private debouncedScrollToSection: (sectionId: string) => void;

  constructor() {
    super();
    this.analyticsBatcher = new BatchProcessor(
      (actions) => actions.forEach(action => action()),
      3,
      150
    );

    this.debouncedScrollToSection = debounce((sectionId: string) => {
      this.performScroll(sectionId);
    }, 50);

    afterNextRender(() => {
      this.setupScrollSpy();
    });
  }

  private setupScrollSpy(): void {
    const sectionIds = ['about', 'graduation', 'courses', 'trilhas', 'books', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    this._scrollObserver = observer;
  }

  toggleMenu(): void {
    this.isMenuOpen.update(value => !value);
    this.analyticsService.trackMenuToggle(this.isMenuOpen() ? 'opened' : 'closed');
  }

  closeMenu(): void {
    if (this.isMenuOpen()) {
      this.isMenuOpen.set(false);
    }
  }

  private scrollToSectionWithOffset(sectionId: string) {
    this.debouncedScrollToSection(sectionId);
  }

  private performScroll(sectionId: string): void {
    const element = ElementCache.get(sectionId);
    const navbar = ElementCache.get('mainNav');

    if (!element || !navbar) return;

    const offset = this.calculateOptimalOffset(navbar);
    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    const finalPosition = Math.max(0, elementTop - offset);

    const prefersReducedMotion = isReducedMotion();

    window.scrollTo({
      top: finalPosition,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  }

  private calculateOptimalOffset(navbar: HTMLElement): number {
    const isNavbarShrink = navbar.classList.contains('navbar-shrink');
    const isMobile = window.innerWidth < 992;

    if (isMobile) return this.navbarHeights.mobile;
    if (isNavbarShrink) return this.navbarHeights.shrink;
    return this.navbarHeights.normal;
  }

  private createNavigationHandler(section: string) {
    return (event?: Event) => {
      event?.preventDefault();

      this.analyticsBatcher.add(() => {
        this.analyticsService.trackMenuClick(section);
      });

      this.closeMenu();
      this.scrollToSectionWithOffset(section);
    };
  }

  sobreAnalitics = this.createNavigationHandler('about');
  graduationAnalitics = this.createNavigationHandler('graduation');
  coursesAnalitics = this.createNavigationHandler('courses');
  trilhasAnalitics = this.createNavigationHandler('trilhas');
  booksAnalitics = this.createNavigationHandler('books');
  contactAnalitics = this.createNavigationHandler('contact');

  ngOnDestroy(): void {
    this.analyticsBatcher.destroy();
    this._scrollObserver?.disconnect();
    this._scrollObserver = null;
    ElementCache.clear();
  }
}
