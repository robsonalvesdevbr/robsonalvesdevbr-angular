import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { TranslatePipe } from '@path-pipes/translate.pipe';
import { AnalyticsService } from '@path-services/analytics.service';
import { DataService } from '@path-services/data-service';

@Component({
  selector: 'app-masterhead',
  imports: [NgOptimizedImage, TranslatePipe],
  templateUrl: './masterhead.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasterheadComponent extends BasePageComponent {
  private readonly analyticsService = inject(AnalyticsService);

  readonly linkedInUrl = inject(DataService).getProfile().urlList.get('LinkedIn');

  onContactClick(): void {
    this.analyticsService.trackSocialLinkClick('masthead_contact', 'masthead');
  }

  onLinkedInClick(): void {
    this.analyticsService.trackSocialLinkClick('linkedin', 'masthead');
  }
}
