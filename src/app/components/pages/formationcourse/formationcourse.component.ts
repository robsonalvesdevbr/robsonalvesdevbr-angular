import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { AnalyticsService } from '@path-app/services/analytics.service';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { ImgcursoPipe } from '@path-pipes/imgcurso.pipe';
import { PrintTagsPipe } from '@path-pipes/print-tags.pipe';
import { SortbyPipe } from '@path-pipes/sortby.pipe';
import { DataService } from '@path-services/data-service';
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-formationoourse',
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
export class FormationCourseComponent
  extends BasePageComponent
  implements OnInit
{
  private readonly dataService = inject(DataService);
  private readonly _gaService = inject(AnalyticsService);
  formationCourses = signal(this.dataService.getFormationCourses());

  config: WritableSignal<PaginationInstance> = signal<PaginationInstance>({
    id: 'formationCoursesPag',
    itemsPerPage: 5,
    currentPage: 1,
  });

  ngOnInit(): void {
    this._gaService.event('page_view', {
      page_title: 'Formation Course',
      page_path: '/#formationcourse',
    });
  }

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
}
