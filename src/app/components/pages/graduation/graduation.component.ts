import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { AnalyticsService } from '@path-app/services/analytics.service';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { MessageDateConclusionPipe } from '@path-pipes/message-date-conclusion.pipe';
import { SortbyPipe } from '@path-pipes/sortby.pipe';
import { DataService } from '@path-services/data-service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-graduation',
  imports: [
    CommonModule,
    MessageDateConclusionPipe,
    NgxPaginationModule,
    SortbyPipe,
    NgOptimizedImage,
  ],
  templateUrl: './graduation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraduationComponent extends BasePageComponent implements OnInit {
  ngOnInit(): void {
    this._gaService.event('page_view', {
      page_title: 'Graduation',
      page_path: '/#graduation',
    });
  }
  private readonly dataService = inject(DataService);
  private readonly _gaService = inject(AnalyticsService);
  graduations = signal(this.dataService.getGraduations());
}
