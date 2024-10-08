import { ChangeDetectionStrategy, Component, WritableSignal, input, signal } from '@angular/core'
import { PaginationInstance } from 'ngx-pagination'
import { IFormationCourse } from '@path-interfaces/IFormationCourse'
import { BasePageComponent } from '@path-components/base-page/base-page.component'

@Component({
  selector: 'app-formationoourse',
  templateUrl: './formationoourse.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormationoourseComponent extends BasePageComponent {
  formationCourses = input.required<IFormationCourse[]>({ alias: 'formationCourses' })

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
