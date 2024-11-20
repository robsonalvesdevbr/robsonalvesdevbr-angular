import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { GoogleAnalyticsDirective } from '@path-app/directives/google-analytics.directive'
import { BasePageComponent } from '@path-components/base-page/base-page.component'
import { IAnalyticsOption } from '@path-interfaces/IAnalyticsOption'
import { NgxPaginationModule } from 'ngx-pagination'

@Component({
    selector: 'app-navigation',
    imports: [CommonModule, NgxPaginationModule, GoogleAnalyticsDirective],
    templateUrl: './navigation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent extends BasePageComponent {
    sobreAnalitics: IAnalyticsOption = {
        eventName: 'click',
        category: 'link',
        label: 'app-navigation',
        logType: 'page_view',
        title: 'Sobre'
    };

    graduationAnalitics: IAnalyticsOption = {
        eventName: 'click',
        category: 'app_navigation',
        label: 'graduation',
        logType: 'page_view',
        title: '(Pós)Graduação'
    };

    coursesAnalitics: IAnalyticsOption = {
        eventName: 'click',
        category: 'app_navigation',
        label: 'courses',
        logType: 'page_view',
        title: 'Cursos'
    };

    formationcourseAnalitics: IAnalyticsOption = {
        eventName: 'click',
        category: 'app_navigation',
        label: 'formationcourse',
        logType: 'page_view',
        title: 'Formação'
    };

    booksAnalitics: IAnalyticsOption = {
        eventName: 'click',
        category: 'app_navigation',
        label: 'books',
        logType: 'page_view',
        title: 'Leituras'
    };

    contactAnalitics: IAnalyticsOption = {
        eventName: 'click',
        category: 'app_navigation',
        label: 'contact',
        logType: 'page_view',
        title: 'Contato'
    };
}
