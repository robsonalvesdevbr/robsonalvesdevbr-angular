import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ICourse } from '../../../interfaces/ICourse';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {
  @Input({ required: false }) bglight: boolean = false;
  @Input({ required: true }) courses: ICourse[] = [];


  institutions: Set<string> = new Set<string>();
  tags: Set<string> = new Set<string>();

  institutionsFilter: Set<string> = new Set<string>();
  selectInstitutionsFilter: string = "";

  tagsFilter: Set<string> = new Set<string>();
  selectTagFilter: string = "";

  config: PaginationInstance = {
    id: 'coursesPag',
    itemsPerPage: 5,
    currentPage: 1
  };

  ngOnInit(): void {
    this.courses.forEach(course => this.institutions.add(course.institution.trim()));
    this.courses.forEach(course => course.tags.forEach(tag => this.tags.add(tag.trim())));
  }

  getInstitutions = () => Array.from(this.institutions.values()).sort((a, b) => (a > b ? 1 : -1));
  getTags = () => Array.from(this.tags.values()).sort((a, b) => (a > b ? 1 : -1));

  absoluteIndex(indexOnPage: number): number {
    return this.config.itemsPerPage * (this.config.currentPage - 1) + indexOnPage + 1;
  }

  onPageChange(number: number) {
    this.config.currentPage = number;
  }

  onClickIntitutionEvent(e: MouseEvent) {
    var link = (e.target as HTMLInputElement);
    let id = link.id.replace('input_course_institution_', '');

    this.institutionsFilter.has(id) ? this.institutionsFilter.delete(id) : this.institutionsFilter.add(id);
    this.selectInstitutionsFilter = Array.from(this.institutionsFilter.values()).join(',');

    this.config.currentPage = 1;

    //document.getElementById('label_course_tag_development')?.classList.remove('active')

    //this.tagsFilter.forEach(x => document.getElementById(`label_course_tag_${x}`)?.click());
    //document.querySelector('#label_course_tag_development')?.classList.add('active');

    // this.tags.clear();
    // this.courses.forEach(course => {

    //   if(this.institutionsFilter.has(course.institution.toLowerCase()) || Array.from(this.institutionsFilter.values()).length == 0)
    //     course.tags.forEach(tag => this.tags.add(tag.trim()))

    // });
  }

  onClickTagEvent(e: MouseEvent) {
    var link = (e.target as HTMLInputElement);
    let id = link.id.replace('input_course_tag_', '');

    this.tagsFilter.has(id) ? this.tagsFilter.delete(id) : this.tagsFilter.add(id);
    this.selectTagFilter = Array.from(this.tagsFilter.values()).join(',');
  }
}
