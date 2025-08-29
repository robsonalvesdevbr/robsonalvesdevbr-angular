import { ChangeDetectionStrategy, Component, inject, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'app-navigation',
  imports: [NgxPaginationModule],
  templateUrl: './navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent extends BasePageComponent implements AfterViewInit {
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;
  private readonly _gaService = inject(GoogleAnalyticsService);

  ngAfterViewInit() {}

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

  sobreAnalitics() {
    this._gaService?.event('click', 'app_navigation', 'app-navigation');
    this.closeNavbar();
  }

  graduationAnalitics() {
    this._gaService?.event('click', 'app_navigation', 'graduation');
    this.closeNavbar();
  }

  coursesAnalitics() {
    this._gaService?.event('click', 'app_navigation', 'courses');
    this.closeNavbar();
  }

  formationcourseAnalitics() {
    this._gaService?.event('click', 'app_navigation', 'formationcourse');
    this.closeNavbar();
  }

  booksAnalitics() {
    this._gaService?.event('click', 'app_navigation', 'books');
    this.closeNavbar();
  }

  contactAnalitics() {
    this._gaService?.event('click', 'app_navigation', 'contact');
    this.closeNavbar();
  }

  dashboardAnalitics() {
    this._gaService?.event('click', 'app_navigation', 'dashboard');
    this.closeNavbar();
  }
}
