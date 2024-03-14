import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ICourse } from '../../../interfaces/ICourse';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent {
  @Input({ required: true }) courses: ICourse[] = [];

  config: PaginationInstance = {
    id: 'coursesPag',
    itemsPerPage: 5,
    currentPage: 1
  };

  absoluteIndex(indexOnPage: number): number {
    return this.config.itemsPerPage * (this.config.currentPage - 1) + indexOnPage + 1;
  }

  onPageChange(number: number) {
    this.config.currentPage = number;
  }
}
