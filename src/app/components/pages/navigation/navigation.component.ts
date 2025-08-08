import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AnalyticsService } from '@path-app/services/analytics.service';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-navigation',
  imports: [NgxPaginationModule],
  templateUrl: './navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent extends BasePageComponent {
  private readonly _gaService = inject(AnalyticsService);

  sobreAnalitics() {
    this._gaService.event('click', {
      category: 'link',
      label: 'app-navigation',
      page_title: 'Sobre',
    });
  }

  graduationAnalitics() {
    this._gaService.event('click', {
      category: 'app_navigation',
      label: 'graduation',
      page_title: '(Pós)Graduação',
    });
  }

  coursesAnalitics() {
    this._gaService.event('click', {
      category: 'app_navigation',
      label: 'courses',
      page_title: 'Cursos',
    });
  }

  formationcourseAnalitics() {
    this._gaService.event('click', {
      category: 'app_navigation',
      label: 'formationcourse',
      page_title: 'Formação',
    });
  }

  booksAnalitics() {
    this._gaService.event('click', {
      category: 'app_navigation',
      label: 'books',
      page_title: 'Leituras',
    });
  }

  contactAnalitics() {
    this._gaService.event('click', {
      category: 'app_navigation',
      label: 'contact',
      page_title: 'Contato',
    });
  }
}
