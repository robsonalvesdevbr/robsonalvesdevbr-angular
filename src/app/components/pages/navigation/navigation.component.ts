import { ChangeDetectionStrategy, Component, inject, ElementRef, ViewChild, OnDestroy, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { VirtualPageTrackingService } from '@path-services/virtual-page-tracking.service';
import { ElementCache, debounce, BatchProcessor, isReducedMotion } from '../../../utils/performance.utils';
import { LanguageSwitcherComponent } from '@path-components/language-switcher/language-switcher.component';
import { TranslatePipe } from '@path-pipes/translate.pipe';

@Component({
  selector: 'app-navigation',
  imports: [NgxPaginationModule, NgOptimizedImage, LanguageSwitcherComponent, TranslatePipe],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent extends BasePageComponent implements OnDestroy {
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;
  private readonly _gaService = inject(GoogleAnalyticsService);
  private readonly _virtualPageService = inject(VirtualPageTrackingService);

  // Menu state management
  isMenuOpen = signal(false);

  // Cache navbar heights for performance
  private readonly navbarHeights = {
    mobile: 110,
    shrink: 106,
    normal: 126
  };

  // Batch analytics calls for better performance
  private analyticsBatcher: BatchProcessor<() => void>;

  // Debounced scroll function
  private debouncedScrollToSection: (sectionId: string) => void;

  constructor() {
    super();
    this.analyticsBatcher = new BatchProcessor(
      (actions) => actions.forEach(action => action()),
      3, // batch size
      150 // delay in ms
    );

    this.debouncedScrollToSection = debounce((sectionId: string) => {
      this.performScroll(sectionId);
    }, 50);
  }

  /**
   * Toggle menu open/closed state
   */
  toggleMenu(): void {
    this.isMenuOpen.update(value => !value);
    this._gaService?.event('menu_toggle', 'navigation', this.isMenuOpen() ? 'opened' : 'closed');
  }

  /**
   * Close menu (used when clicking navigation links)
   */
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

    // Use modern scroll API with reduced motion check
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

  // Optimized navigation handlers using factory method
  private createNavigationHandler(section: string) {
    return (event?: Event) => {
      event?.preventDefault();

      // Batch analytics calls
      this.analyticsBatcher.add(() => {
        this._gaService?.event('menu_click', 'navigation', section);
        this._virtualPageService.sendVirtualPageView(section, 'click');
      });

      this.closeMenu();
      this.scrollToSectionWithOffset(section);
    };
  }

  // Use the factory method for all navigation handlers
  sobreAnalitics = this.createNavigationHandler('about');
  graduationAnalitics = this.createNavigationHandler('graduation');
  coursesAnalitics = this.createNavigationHandler('courses');
  formationcourseAnalitics = this.createNavigationHandler('formationcourse');
  booksAnalitics = this.createNavigationHandler('books');
  contactAnalitics = this.createNavigationHandler('contact');
  dashboardAnalitics = this.createNavigationHandler('dashboard');

  ngOnDestroy(): void {
    this.analyticsBatcher.destroy();
    ElementCache.clear();
  }
}
