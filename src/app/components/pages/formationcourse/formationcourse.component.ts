import { ChangeDetectionStrategy, Component, WritableSignal, input, signal } from '@angular/core'
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination'
import { IFormationCourse } from '@path-interfaces/IFormationCourse'
import { BasePageComponent } from '@path-components/base-page/base-page.component'
import { CommonModule } from '@angular/common'
import { GoogleAnalyticsDirective } from '@path-app/directives/google-analytics.directive'
import { FilterPipe } from '@path-pipes/filter.pipe'
import { ImgcursoPipe } from '@path-pipes/imgcurso.pipe'
import { MessageDateConclusionPipe } from '@path-pipes/message-date-conclusion.pipe'
import { PrintTagsPipe } from '@path-pipes/print-tags.pipe'
import { SortbyPipe } from '@path-pipes/sortby.pipe'
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'

@Component({
  selector: 'app-formationoourse',
  imports: [CommonModule, FilterPipe, ImgcursoPipe, MessageDateConclusionPipe, PrintTagsPipe, NgxPaginationModule, GoogleAnalyticsDirective, SortbyPipe, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './formationcourse.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FormationCourseComponent extends BasePageComponent {
  formationCourses = input.required<IFormationCourse[]>({
    alias: 'formationCourses',
  })

  config: WritableSignal<PaginationInstance> = signal<PaginationInstance>({
    id: 'formationCoursesPag',
    itemsPerPage: 5,
    currentPage: 1,
  })

  absoluteIndex(indexOnPage: number): number {
    return this.config().itemsPerPage * (this.config().currentPage - 1) + indexOnPage + 1
  }

  onPageChange(number: number) {
    this.config().currentPage = number
  }
}
