import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'
import { GoogleAnalyticsDirective } from '@path-app/directives/google-analytics.directive'
import { BasePageComponent } from '@path-components/base-page/base-page.component'
import { FilterPipe } from '@path-pipes/filter.pipe'
import { ImgcursoPipe } from '@path-pipes/imgcurso.pipe'
import { MessageDateConclusionPipe } from '@path-pipes/message-date-conclusion.pipe'
import { PrintTagsPipe } from '@path-pipes/print-tags.pipe'
import { SortbyPipe } from '@path-pipes/sortby.pipe'
import { NgxPaginationModule } from 'ngx-pagination'

@Component({
  selector: 'app-navigation',
  imports: [CommonModule, FilterPipe, ImgcursoPipe, MessageDateConclusionPipe, PrintTagsPipe, NgxPaginationModule, GoogleAnalyticsDirective, SortbyPipe, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class NavigationComponent extends BasePageComponent {}
