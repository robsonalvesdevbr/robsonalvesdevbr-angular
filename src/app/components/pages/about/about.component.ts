import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { SeoService } from '@path-services/seo.service';
import { TranslatePipe } from '@path-pipes/translate.pipe';

@Component({
  selector: 'app-about',
  imports: [CommonModule, NgOptimizedImage, TranslatePipe],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent extends BasePageComponent implements OnInit {
  private readonly gaService = inject(GoogleAnalyticsService);
  private readonly seoService = inject(SeoService);

  ngOnInit(): void {
    // Set up SEO optimization for about page
    this.seoService.setAboutPageSeo();
    this.seoService.generateBreadcrumbStructuredData();
    this.seoService.updatePageCanonical();
  }

  onSocialLinkClick(platform: string): void {
    this.gaService?.event('social_link_click', 'about', platform);
  }

  constructor() {
    super();
  }
}
