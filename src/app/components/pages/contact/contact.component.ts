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

  calcularIdade(birthDate: Date): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth() - birth.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
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
