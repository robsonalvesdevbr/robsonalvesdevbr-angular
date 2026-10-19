import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { AnalyticsService } from '@path-services/analytics.service';
import { SeoService } from '@path-services/seo.service';
import { TranslatePipe } from '@path-pipes/translate.pipe';

@Component({
  selector: 'app-about',
  imports: [TranslatePipe],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent extends BasePageComponent implements OnInit {
  readonly timeline = [
    { key: 'instructor', icon: 'bi-mortarboard-fill' },
    { key: 'transition', icon: 'bi-code-slash' },
    { key: 'financial', icon: 'bi-bank2' },
    { key: 'modernization', icon: 'bi-cloud-arrow-up-fill' },
    { key: 'architect', icon: 'bi-diagram-3-fill' },
  ] as const;

  private readonly analyticsService = inject(AnalyticsService);
  private readonly seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setAboutPageSeo();
    this.seoService.generateBreadcrumbStructuredData();
    this.seoService.updatePageCanonical();
  }

  onSocialLinkClick(platform: string): void {
    this.analyticsService.trackSocialLinkClick(platform, 'about');
  }

  constructor() {
    super();
  }
}
