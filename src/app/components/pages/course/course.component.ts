import { Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, viewChild, ElementRef, ViewChild } from '@angular/core';
import { ICourse } from '../../../interfaces/ICourse';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnChanges {
  @Input({required: false}) bglight: boolean = false;
  @Input({ required: true }) courses: ICourse[] = [];

  institutions: string[] = [];
  tags: string[] = [];

  config: PaginationInstance = {
    id: 'coursesPag',
    itemsPerPage: 5,
    currentPage: 1
  };

  ngOnChanges(changes: SimpleChanges): void {
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

  onClickEvent(e: MouseEvent){
    var link = (e.target as HTMLLinkElement);
    console.log(link.id);
  }
}
