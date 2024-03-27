import { Component, Input } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { IFormationCourse } from '../../../interfaces/IFormationCourse';
import { BasePageComponent } from '../../base-page/base-page.component';

@Component({
  selector: 'app-formationoourse',
  templateUrl: './formationoourse.component.html',
  styleUrl: './formationoourse.component.scss'
})
export class FormationoourseComponent extends BasePageComponent  {
  @Input({ required: true }) formationCourses: IFormationCourse[] = [];

  config: PaginationInstance = {
    id: 'formationCoursesPag',
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
