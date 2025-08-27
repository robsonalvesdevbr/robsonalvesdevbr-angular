import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'app-navigation',
  imports: [NgxPaginationModule],
  templateUrl: './navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent extends BasePageComponent {
  private readonly _gaService = inject(GoogleAnalyticsService);

  sobreAnalitics() {
    this._gaService?.event('click', 'app_navigation', 'app-navigation');
  }

  graduationAnalitics() {
    this._gaService?.event('click', 'app_navigation', 'graduation');
  }

  coursesAnalitics() {
    this._gaService?.event('click', 'app_navigation', 'courses');
  }

  formationcourseAnalitics() {
    this._gaService?.event('click', 'app_navigation', 'formationcourse');
  }

  booksAnalitics() {
    this._gaService?.event('click', 'app_navigation', 'books');
  }

  contactAnalitics() {
    this._gaService?.event('click', 'app_navigation', 'contact');
  }
}
