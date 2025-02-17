import { BasePageComponent } from '@path-components/base-page/base-page.component';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { GoogleAnalyticsService } from '@hakimio/ngx-google-analytics';

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
