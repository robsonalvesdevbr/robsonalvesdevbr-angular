import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MessageDateConclusionPipe } from '@path-pipes/message-date-conclusion.pipe';
import { SortbyPipe } from '@path-pipes/sortby.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataService } from '@path-services/data-service';
import { GoogleAnalyticsService } from '@hakimio/ngx-google-analytics';

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
    this._gaService.pageView('/#graduation', {
            title: 'Graduation'
        });
  }
  private readonly dataService = inject(DataService);
  graduations = this.dataService.getGraduations();
  private readonly _gaService = inject(GoogleAnalyticsService);
}
