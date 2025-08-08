import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { AnalyticsService } from '@path-app/services/analytics.service';
import { BasePageComponent } from '@path-components/base-page/base-page.component';

@Component({
  selector: 'app-about',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent extends BasePageComponent implements OnInit {
  private readonly _gaService = inject(AnalyticsService);

  constructor() {
    super();
  }

  ngOnInit() {
    this._gaService.event('page_view', {
      page_title: 'About',
      page_path: '/#about',
    });
  }
}
