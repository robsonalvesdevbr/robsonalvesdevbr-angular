import { DatePipe, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { MessageDateConclusionPipe } from '@path-pipes/message-date-conclusion.pipe';
import { SortbyPipe } from '@path-pipes/sortby.pipe';
import { TranslatePipe } from '@path-pipes/translate.pipe';
import { DataService } from '@path-services/data-service';
import { IGraduation } from '@path-interfaces/IGraduation';

@Component({
  selector: 'app-graduation',
  imports: [
    DatePipe,
    MessageDateConclusionPipe,
    SortbyPipe,
    TranslatePipe,
    NgOptimizedImage,
  ],
  templateUrl: './graduation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraduationComponent extends BasePageComponent {
  private readonly dataService = inject(DataService);
  graduations = signal(this.dataService.getGraduations());

  trackByGraduation(index: number, item: IGraduation): string {
    return item.id;
  }
}
