import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { TranslatePipe } from '@path-pipes/translate.pipe';
import { AnalyticsService } from '@path-services/analytics.service';
import { DataService } from '@path-services/data-service';
import { RESUME_URL } from '@path-data/Profile';
import { CAREER_START_YEAR, yearsSince } from '@path-utils/career.utils';

@Component({
  selector: 'app-masterhead',
  imports: [NgOptimizedImage, TranslatePipe],
  templateUrl: './masterhead.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasterheadComponent extends BasePageComponent {
  private readonly analyticsService = inject(AnalyticsService);

  private readonly dataService = inject(DataService);

  readonly resumeUrl = RESUME_URL;
  readonly profile = this.dataService.getProfile();
  readonly linkedInUrl = this.profile.urlList.get('LinkedIn');

  readonly stats: readonly { labelKey: string; value: string }[] = [
    { labelKey: 'masterhead.stats.years', value: `${yearsSince(CAREER_START_YEAR)}+` },
    { labelKey: 'masterhead.stats.courses', value: String(this.dataService.getCourses().length) },
    {
      labelKey: 'masterhead.stats.graduations',
      value: String(this.dataService.getGraduations().length),
    },
    { labelKey: 'masterhead.stats.books', value: String(this.dataService.getBooks().length) },
  ];

  onContactClick(): void {
    this.analyticsService.trackSocialLinkClick('masthead_contact', 'masthead');
  }

  onLinkedInClick(): void {
    this.analyticsService.trackSocialLinkClick('linkedin', 'masthead');
  }

  onResumeClick(): void {
    this.analyticsService.trackSocialLinkClick('resume', 'masthead');
  }
}
