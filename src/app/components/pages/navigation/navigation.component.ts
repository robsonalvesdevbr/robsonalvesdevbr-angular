import { ChangeDetectionStrategy, Component, inject, ElementRef, ViewChild } from '@angular/core';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { VirtualPageTrackingService } from '@path-services/virtual-page-tracking.service';

@Component({
  selector: 'app-navigation',
  imports: [NgxPaginationModule],
  templateUrl: './navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent extends BasePageComponent {
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;
  private readonly _gaService = inject(GoogleAnalyticsService);
  private readonly _virtualPageService = inject(VirtualPageTrackingService);

  private closeNavbar() {
    const navbarCollapse = this.navbarCollapse?.nativeElement;
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      // Use Bootstrap's Collapse API for smooth animation
      const bsCollapse = new (window as any).bootstrap.Collapse(navbarCollapse, {
        toggle: false
      });
      bsCollapse.hide();
    }
  }

  private scrollToSectionWithOffset(sectionId: string) {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbar = document.getElementById('mainNav');
        const navbarHeight = navbar ? navbar.offsetHeight : 76;
        const additionalOffset = 20;
        const totalOffset = navbarHeight + additionalOffset;

        const y = element.getBoundingClientRect().top + window.pageYOffset - totalOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  }

  sobreAnalitics(event?: Event) {
    event?.preventDefault();
    this._gaService?.event('menu_click', 'navigation', 'about');
    this._virtualPageService.sendVirtualPageView('about', 'click');
    this.closeNavbar();
    this.scrollToSectionWithOffset('about');
  }

  graduationAnalitics(event?: Event) {
    event?.preventDefault();
    this._gaService?.event('menu_click', 'navigation', 'graduation');
    this._virtualPageService.sendVirtualPageView('graduation', 'click');
    this.closeNavbar();
    this.scrollToSectionWithOffset('graduation');
  }

  coursesAnalitics(event?: Event) {
    event?.preventDefault();
    this._gaService?.event('menu_click', 'navigation', 'courses');
    this._virtualPageService.sendVirtualPageView('courses', 'click');
    this.closeNavbar();
    this.scrollToSectionWithOffset('courses');
  }

  formationcourseAnalitics(event?: Event) {
    event?.preventDefault();
    this._gaService?.event('menu_click', 'navigation', 'formationcourse');
    this._virtualPageService.sendVirtualPageView('formationcourse', 'click');
    this.closeNavbar();
    this.scrollToSectionWithOffset('formationcourse');
  }

  booksAnalitics(event?: Event) {
    event?.preventDefault();
    this._gaService?.event('menu_click', 'navigation', 'books');
    this._virtualPageService.sendVirtualPageView('books', 'click');
    this.closeNavbar();
    this.scrollToSectionWithOffset('books');
  }

  contactAnalitics(event?: Event) {
    event?.preventDefault();
    this._gaService?.event('menu_click', 'navigation', 'contact');
    this._virtualPageService.sendVirtualPageView('contact', 'click');
    this.closeNavbar();
    this.scrollToSectionWithOffset('contact');
  }

  dashboardAnalitics(event?: Event) {
    event?.preventDefault();
    this._gaService?.event('menu_click', 'navigation', 'dashboard');
    this._virtualPageService.sendVirtualPageView('dashboard', 'click');
    this.closeNavbar();
    this.scrollToSectionWithOffset('dashboard');
  }
}
