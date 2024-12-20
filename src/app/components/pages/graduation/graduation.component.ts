import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { GoogleAnalyticsDirective } from '@path-app/directives/google-analytics.directive';
import { MessageDateConclusionPipe } from '@path-pipes/message-date-conclusion.pipe';
import { SortbyPipe } from '@path-pipes/sortby.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataService } from '@path-services/data-service';

@Component({
  selector: 'app-graduation',
  imports: [
    CommonModule,
    MessageDateConclusionPipe,
    NgxPaginationModule,
    GoogleAnalyticsDirective,
    SortbyPipe,
    NgOptimizedImage,
  ],
  templateUrl: './graduation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraduationComponent extends BasePageComponent {
  private readonly dataService = inject(DataService);
  graduations = this.dataService.getGraduations();
}
