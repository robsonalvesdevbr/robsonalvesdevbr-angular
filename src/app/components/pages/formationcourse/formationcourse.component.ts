import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { ImgcursoPipe } from '@path-pipes/imgcurso.pipe';
import { PrintTagsPipe } from '@path-pipes/print-tags.pipe';
import { SortbyPipe } from '@path-pipes/sortby.pipe';
import { DataService } from '@path-services/data-service';
import { PaginationService } from '@path-services/pagination.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-formationcourse',
  imports: [
    CommonModule,
    ImgcursoPipe,
    PrintTagsPipe,
    NgxPaginationModule,
    SortbyPipe,
    NgOptimizedImage,
  ],
  templateUrl: './formationcourse.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormationCourseComponent extends BasePageComponent {
  private readonly dataService = inject(DataService);
  private readonly paginationService = inject(PaginationService);
  
  formationCourses = signal(this.dataService.getFormationCourses());
  config = this.paginationService.createPaginationConfig('formationCoursesPag', 5);

  absoluteIndex(indexOnPage: number): number {
    return (
      this.config().itemsPerPage * (this.config().currentPage - 1) +
      indexOnPage +
      1
    );
  }

  onPageChange(number: number) {
    this.config().currentPage = number;
  }

  trackByFormationCourse(index: number, item: any): string {
    return item.name + item.institution;
  }
}
