import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { GoogleAnalyticsDirective } from '@path-app/directives/google-analytics.directive'
import { BasePageComponent } from '@path-components/base-page/base-page.component'
import { NgxPaginationModule } from 'ngx-pagination'

@Component({
    selector: 'app-masterhead',
    imports: [CommonModule, NgxPaginationModule, GoogleAnalyticsDirective],
    templateUrl: './masterhead.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MasterheadComponent extends BasePageComponent {}
