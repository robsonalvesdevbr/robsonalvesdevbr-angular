import { Component, Input, ChangeDetectionStrategy, SimpleChanges, viewChild, ElementRef, ViewChild, OnInit, Output } from '@angular/core';
import { ICourse } from '../../../interfaces/ICourse';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {

  @Input({required: false}) bglight: boolean = false;
  @Input({ required: true }) courses: ICourse[] = [];


  institutions: string[] = [];
  tags: string[] = [];

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
    this.courses.forEach(course => this.institutions.push(course.institution.trim()));
    this.institutions = Array.from(new Set(this.institutions.map((item: string) => item))).sort((a, b) => (a > b ? 1 : -1));

    this.courses.forEach(course => course.tags.forEach(tag => this.tags.push(tag.trim())));
    this.tags = Array.from(new Set(this.tags.map((item: string) => item))).sort((a, b) => (a > b ? 1 : -1));
  }

  absoluteIndex(indexOnPage: number): number {
    return this.config.itemsPerPage * (this.config.currentPage - 1) + indexOnPage + 1;
  }

  onPageChange(number: number) {
    this.config.currentPage = number;
  }

  onClickIntitutionEvent(e: MouseEvent){
    var link = (e.target as HTMLInputElement);
      let id = link.id.replace('btncheck_institution_', '');
      console.log(link);

      this.institutionsFilter.has(id) ? this.institutionsFilter.delete(id) : this.institutionsFilter.add(id);
      this.selectInstitutionsFilter = Array.from(this.institutionsFilter.values()).join(',');

      //this.tags = [];
      //this.courses.forEach(course => {

      //  if(this.institutionsFilter.has(course.institution.toLowerCase()) || Array.from(this.institutionsFilter.values()).length == 0)
      //    course.tags.forEach(tag => this.tags.push(tag.trim()))

      //});
      //this.tags = Array.from(new Set(this.tags.map((item: string) => item))).sort((a, b) => (a > b ? 1 : -1));
  }

  onClickTagEvent(e: MouseEvent){
    var link = (e.target as HTMLInputElement);
      let id = link.id.replace('btncheck_tag_', '');
      console.log(link);

      this.tagsFilter.has(id) ? this.tagsFilter.delete(id) : this.tagsFilter.add(id);
      this.selectTagFilter = Array.from(this.tagsFilter.values()).join(',');
  }
}
