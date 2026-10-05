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

  private readonly socialIcons: Record<string, string> = {
    WebSite: 'bi-house-fill',
    LinkedIn: 'bi-linkedin',
    Instagram: 'bi-instagram',
    GitHub: 'bi-github',
  };

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

  iconFor(platform: string): string {
    return this.socialIcons[platform] ?? 'bi-link-45deg';
  }
}
