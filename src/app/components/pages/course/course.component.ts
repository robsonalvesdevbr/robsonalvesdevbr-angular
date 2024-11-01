import { Component, ChangeDetectionStrategy, OnInit, input, signal, WritableSignal, inject } from '@angular/core'
import { ICourse } from '@path-interfaces/ICourse'
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination'
import { BasePageComponent } from '@path-components/base-page/base-page.component'
import { CommonModule } from '@angular/common'
import { GoogleAnalyticsDirective } from '@path-app/directives/google-analytics.directive'
import { FilterPipe } from '@path-pipes/filter.pipe'
import { ImgcursoPipe } from '@path-pipes/imgcurso.pipe'
import { MessageDateConclusionPipe } from '@path-pipes/message-date-conclusion.pipe'
import { PrintTagsPipe } from '@path-pipes/print-tags.pipe'
import { SortbyPipe } from '@path-pipes/sortby.pipe'
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'
import { DataService } from '@path-services/data-service'

@Component({
  selector: 'app-course',
  imports: [CommonModule, FilterPipe, ImgcursoPipe, MessageDateConclusionPipe, PrintTagsPipe, NgxPaginationModule, GoogleAnalyticsDirective, SortbyPipe, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CourseComponent extends BasePageComponent implements OnInit {
  private readonly dataService = inject(DataService)
  courses = this.dataService.getCourses()

  courseList: WritableSignal<Set<string>> = signal<Set<string>>(new Set<string>())
  tags: WritableSignal<Set<string>> = signal<Set<string>>(new Set<string>())

  coursesFilter: WritableSignal<Set<string>> = signal<Set<string>>(new Set<string>())
  selectInstitutionsFilter: WritableSignal<string> = signal<string>('')

  tagsFilter: WritableSignal<Set<string>> = signal<Set<string>>(new Set<string>())
  selectTagFilter: WritableSignal<string> = signal<string>('')

  config: WritableSignal<PaginationInstance> = signal<PaginationInstance>({
    id: 'coursesPag',
    itemsPerPage: 5,
    currentPage: 1,
  })

  ngOnInit(): void {
    this.courses.forEach((course) => this.courseList().add(course.institution.trim()))
    this.courses.forEach((course) => course.tags.forEach((tag) => this.tags().add(tag.trim())))
  }

  getCourseList = () => Array.from(this.courseList().values()).sort((a, b) => (a > b ? 1 : -1))

  getTags = () => Array.from(this.tags().values()).sort((a, b) => (a > b ? 1 : -1))

  absoluteIndex = (indexOnPage: number): number => this.config().itemsPerPage * (this.config().currentPage - 1) + indexOnPage + 1

  onPageChange = (number: number) => (this.config().currentPage = number)

  clearFilters() {
    this.coursesFilter().forEach((x) => {
      document.getElementById(`label_course_institution_${x}`)?.click()
    })

    this.tagsFilter().forEach((x) => {
      document.getElementById(`label_course_tag_${x}`)?.click()
    })

    this.coursesFilter().clear()
    this.selectInstitutionsFilter.set('')
    this.tagsFilter().clear()
    this.selectTagFilter.set('')
  }

  onClickIntitutionEvent(e: MouseEvent) {
    let link = e.target as HTMLInputElement
    let id = link.id.replace('input_course_institution_', '')

    this.coursesFilter().has(id) ? this.coursesFilter().delete(id) : this.coursesFilter().add(id)
    this.selectInstitutionsFilter.set(Array.from(this.coursesFilter().values()).join(','))

    this.config().currentPage = 1
  }

  onClickTagEvent(e: MouseEvent) {
    let link = e.target as HTMLInputElement
    let id = link.id.replace('input_course_tag_', '')

    this.tagsFilter().has(id) ? this.tagsFilter().delete(id) : this.tagsFilter().add(id)
    this.selectTagFilter.set(Array.from(this.tagsFilter().values()).join(','))
  }
}
