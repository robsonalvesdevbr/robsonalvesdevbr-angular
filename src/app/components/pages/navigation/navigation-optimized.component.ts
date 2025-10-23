import { ChangeDetectionStrategy, Component, inject, ElementRef, ViewChild, OnDestroy, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { VirtualPageTrackingService } from '@path-services/virtual-page-tracking.service';
import { LanguageSwitcherComponent } from '@path-components/language-switcher/language-switcher.component';
import { TranslatePipe } from '@path-pipes/translate.pipe';

@Component({
  selector: 'app-navigation-optimized',
  imports: [NgxPaginationModule, NgOptimizedImage, LanguageSwitcherComponent, TranslatePipe],
  templateUrl: './navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptimizedNavigationComponent extends BasePageComponent implements OnDestroy {
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;

  private readonly _gaService = inject(GoogleAnalyticsService);
  private readonly _virtualPageService = inject(VirtualPageTrackingService);

  // Cache DOM elements and calculations
  private cachedElements = new Map<string, HTMLElement>();
  private navbarHeights = {
    mobile: 110,
    shrink: 106,
    normal: 126
  };
  private scrollTimeout: number | null = null;

  // Estado do menu (compatível com template compartilhado)
  isMenuOpen = signal(false);

  // Alterna o menu (compatível com template compartilhado)
  toggleMenu(): void {
    this.isMenuOpen.update(v => !v);
    try {
      this._gaService?.event('menu_toggle', 'navigation_optimized', this.isMenuOpen() ? 'opened' : 'closed');
    } catch {
      // noop
    }
  }

  // Cache DOM queries
  private getElement(id: string): HTMLElement | null {
    if (!this.cachedElements.has(id)) {
      const element = document.getElementById(id);
      if (element) {
        this.cachedElements.set(id, element);
      }
      return element;
    }
    return this.cachedElements.get(id) || null;
  }

  private closeNavbar(): void {
    const navbarCollapse = this.navbarCollapse?.nativeElement;
    if (!navbarCollapse?.classList.contains('show')) return;

    // Use modern Bootstrap API with error handling
    try {
      const Bootstrap = (window as Window & { bootstrap?: { Collapse: { getInstance: (el: Element) => { hide: () => void } | null; getOrCreateInstance: (el: Element, options?: { toggle?: boolean }) => { hide: () => void } } } }).bootstrap;
      if (Bootstrap?.Collapse) {
        const collapse = Bootstrap.Collapse.getInstance(navbarCollapse) ||
                         Bootstrap.Collapse.getOrCreateInstance(navbarCollapse, { toggle: false });
        collapse.hide();
      }
    } catch {
      // Fallback to class manipulation
      navbarCollapse.classList.remove('show');
    }
  }

  // Método público usado pelo template compartilhado para fechar o menu
  public closeMenu(): void {
    try {
      this.closeNavbar();
    } catch {
      const navbarCollapse = this.navbarCollapse?.nativeElement;
      if (navbarCollapse?.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    }
  }

  private optimizedScrollToSection(sectionId: string): void {
    // Debounce scroll requests
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    this.scrollTimeout = window.setTimeout(() => {
      this.performScroll(sectionId);
    }, 50);
  }

  private performScroll(sectionId: string): void {
    const element = this.getElement(sectionId);
    const navbar = this.getElement('mainNav');

    if (!element || !navbar) return;

    // Use modern Intersection Observer for more accurate positioning
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        observer.disconnect();
        return;
      }

      const offset = this.calculateOptimalOffset(navbar);
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      const finalPosition = Math.max(0, elementTop - offset);

      // Use modern scroll API with reduced motion check
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      window.scrollTo({
        top: finalPosition,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });

      observer.disconnect();
    });

    observer.observe(element);
  }

  private calculateOptimalOffset(navbar: HTMLElement): number {
    const isNavbarShrink = navbar.classList.contains('navbar-shrink');
    const isMobile = window.innerWidth < 992;

    if (isMobile) return this.navbarHeights.mobile;
    if (isNavbarShrink) return this.navbarHeights.shrink;
    return this.navbarHeights.normal;
  }

  // Optimized analytics methods with batching
  private pendingAnalytics: Array<() => void> = [];
  private analyticsTimeout: number | null = null;

  private batchAnalytics(action: () => void): void {
    this.pendingAnalytics.push(action);

    if (this.analyticsTimeout) {
      clearTimeout(this.analyticsTimeout);
    }

    this.analyticsTimeout = window.setTimeout(() => {
      this.pendingAnalytics.forEach(fn => fn());
      this.pendingAnalytics = [];
      this.analyticsTimeout = null;
    }, 100);
  }

  private createNavigationHandler(section: string) {
    return (event?: Event) => {
      event?.preventDefault();

      // Batch analytics calls
      this.batchAnalytics(() => {
        this._gaService?.event('menu_click', 'navigation', section);
        this._virtualPageService.sendVirtualPageView(section, 'click');
      });

      this.closeNavbar();
      this.optimizedScrollToSection(section);
    };
  }

  // Use the factory method for all navigation handlers
  readonly sobreAnalitics = this.createNavigationHandler('about');
  readonly graduationAnalitics = this.createNavigationHandler('graduation');
  readonly coursesAnalitics = this.createNavigationHandler('courses');
  readonly formationcourseAnalitics = this.createNavigationHandler('formationcourse');
  readonly booksAnalitics = this.createNavigationHandler('books');
  readonly contactAnalitics = this.createNavigationHandler('contact');
  readonly dashboardAnalitics = this.createNavigationHandler('dashboard');

  ngOnDestroy(): void {
    // Clean up timeouts and cached elements
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    if (this.analyticsTimeout) {
      clearTimeout(this.analyticsTimeout);
      // Flush remaining analytics
      this.pendingAnalytics.forEach(fn => fn());
    }

    this.cachedElements.clear();
  }
}
