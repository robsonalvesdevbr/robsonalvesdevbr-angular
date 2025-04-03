import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { GoogleAnalyticsService } from '@hakimio/ngx-google-analytics';
import { BasePageComponent } from '@path-components/base-page/base-page.component';

@Component({
  selector: 'app-about',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent extends BasePageComponent implements OnInit {
  private readonly _gaService = inject(GoogleAnalyticsService);

  constructor() {
    super();
  }

  ngOnInit() {
    this._gaService.pageView('/#about', {
      title: 'About',
    });
  }
}
