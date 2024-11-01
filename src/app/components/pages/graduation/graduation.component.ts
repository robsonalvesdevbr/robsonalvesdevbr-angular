import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core'
import { IGraduation } from '@path-interfaces/IGraduation'
import { BasePageComponent } from '@path-components/base-page/base-page.component'
import { CommonModule } from '@angular/common'
import { GoogleAnalyticsDirective } from '@path-app/directives/google-analytics.directive'
import { FilterPipe } from '@path-pipes/filter.pipe'
import { ImgcursoPipe } from '@path-pipes/imgcurso.pipe'
import { MessageDateConclusionPipe } from '@path-pipes/message-date-conclusion.pipe'
import { PrintTagsPipe } from '@path-pipes/print-tags.pipe'
import { SortbyPipe } from '@path-pipes/sortby.pipe'
import { NgxPaginationModule } from 'ngx-pagination'
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'
import { DataService } from '@path-services/data-service'

@Component({
  selector: 'app-graduation',
  imports: [CommonModule, FilterPipe, ImgcursoPipe, MessageDateConclusionPipe, PrintTagsPipe, NgxPaginationModule, GoogleAnalyticsDirective, SortbyPipe, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './graduation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class GraduationComponent extends BasePageComponent {
  private readonly dataService = inject(DataService)
  graduations = this.dataService.getGraduations()
}
