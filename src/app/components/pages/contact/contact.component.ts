import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { TranslatePipe } from '@path-pipes/translate.pipe';
import { DataService } from '@path-services/data-service';
import { AnalyticsService } from '@path-services/analytics.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { calculateAge as calculateAgeUtil } from '@path-utils/age.utils';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, NgxPaginationModule, NgOptimizedImage, TranslatePipe],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent extends BasePageComponent {
  private readonly dataService = inject(DataService);
  private readonly analyticsService = inject(AnalyticsService);

  profiles = signal(this.dataService.getProfile());

  asIsOrder(): number {
    return 1;
  }

  calculateAge(birthDate: Date): number {
    return calculateAgeUtil(birthDate);
  }

  onSocialLinkClick(platform: string): void {
    this.analyticsService.trackSocialLinkClick(platform, 'contact');
  }

  onEmailClick(): void {
    this.analyticsService.trackSocialLinkClick('email', 'contact');
  }

  onRepositoryClick(): void {
    this.analyticsService.trackSocialLinkClick('github_repo', 'contact');
  }
}
