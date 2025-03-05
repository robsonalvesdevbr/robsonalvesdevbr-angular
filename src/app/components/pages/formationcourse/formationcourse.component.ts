import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ImgcursoPipe } from '@path-pipes/imgcurso.pipe';
import { PrintTagsPipe } from '@path-pipes/print-tags.pipe';
import { SortbyPipe } from '@path-pipes/sortby.pipe';
import { DataService } from '@path-services/data-service';
import {
  GoogleAnalyticsService,
  NgxGoogleAnalyticsModule,
} from '@hakimio/ngx-google-analytics';

@Component({
  selector: 'app-formationoourse',
  imports: [
    CommonModule,
    ImgcursoPipe,
    PrintTagsPipe,
    NgxPaginationModule,
    SortbyPipe,
    NgOptimizedImage,
    NgxGoogleAnalyticsModule,
  ],
  templateUrl: './formationcourse.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormationCourseComponent
  extends BasePageComponent
  implements OnInit
{
  private readonly dataService = inject(DataService);
  private readonly _gaService = inject(GoogleAnalyticsService);
  formationCourses = signal(this.dataService.getFormationCourses());

  config: WritableSignal<PaginationInstance> = signal<PaginationInstance>({
    id: 'formationCoursesPag',
    itemsPerPage: 5,
    currentPage: 1,
  });

  ngOnInit(): void {
    this._gaService.pageView('/#formationcourse', {
      title: 'Formation Course',
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
