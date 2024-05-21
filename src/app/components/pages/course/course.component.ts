import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core'
import { ICourse } from '@path-interfaces/ICourse'
import { PaginationInstance } from 'ngx-pagination'
import { BasePageComponent } from '@path-components/base-page/base-page.component'

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent extends BasePageComponent implements OnInit {
  @Input({ required: true }) courses: ICourse[] = []

  institutions: Set<string> = new Set<string>()
  tags: Set<string> = new Set<string>()

  institutionsFilter: Set<string> = new Set<string>()
  selectInstitutionsFilter: string = ''

  tagsFilter: Set<string> = new Set<string>()
  selectTagFilter: string = ''

  config: PaginationInstance = {
    id: 'coursesPag',
    itemsPerPage: 5,
    currentPage: 1,
  }

  override ngOnInit(): void {
    this.courses.forEach((course) => this.institutions.add(course.institution.trim()))
    this.courses.forEach((course) => course.tags.forEach((tag) => this.tags.add(tag.trim())))
    super.ngOnInit();
  }

  getInstitutions = () => Array.from(this.institutions.values()).sort((a, b) => (a > b ? 1 : -1))

  getTags = () => Array.from(this.tags.values()).sort((a, b) => (a > b ? 1 : -1))

  absoluteIndex = (indexOnPage: number): number => this.config.itemsPerPage * (this.config.currentPage - 1) + indexOnPage + 1

  onPageChange = (number: number) => (this.config.currentPage = number)

  clearFilters() {
    this.institutionsFilter.forEach((x) => {
      document.getElementById(`label_course_institution_${x}`)?.click()
    })

    this.tagsFilter.forEach((x) => {
      document.getElementById(`label_course_tag_${x}`)?.click()
    })

    this.institutionsFilter.clear()
    this.selectInstitutionsFilter = ''
    this.tagsFilter.clear()
    this.selectTagFilter = ''
  }

  onClickIntitutionEvent(e: MouseEvent) {
    var link = e.target as HTMLInputElement
    let id = link.id.replace('input_course_institution_', '')

    this.institutionsFilter.has(id) ? this.institutionsFilter.delete(id) : this.institutionsFilter.add(id)
    this.selectInstitutionsFilter = Array.from(this.institutionsFilter.values()).join(',')

    this.config.currentPage = 1
  }

  onClickTagEvent(e: MouseEvent) {
    var link = e.target as HTMLInputElement
    let id = link.id.replace('input_course_tag_', '')

    this.tagsFilter.has(id) ? this.tagsFilter.delete(id) : this.tagsFilter.add(id)
    this.selectTagFilter = Array.from(this.tagsFilter.values()).join(',')
  }
}
