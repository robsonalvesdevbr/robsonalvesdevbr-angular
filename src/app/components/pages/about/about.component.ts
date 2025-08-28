import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { StatisticsService, DashboardStats } from '@path-services/statistics-service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { AnimatedCounterComponent } from '@path-components/utils/animated-counter/animated-counter.component';

@Component({
  selector: 'app-about',
  imports: [CommonModule, NgOptimizedImage, AnimatedCounterComponent],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent extends BasePageComponent implements OnInit {
  private readonly statisticsService = inject(StatisticsService);
  private readonly gaService = inject(GoogleAnalyticsService);

  personalStats = signal<DashboardStats | null>(null);

  ngOnInit(): void {
    this.personalStats.set(this.statisticsService.getDashboardStats());
  }

  onPersonalStatsView(): void {
    this.gaService?.event('personal_stats_view', 'about', 'statistics_section_viewed');
  }

  onSocialLinkClick(platform: string): void {
    this.gaService?.event('social_link_click', 'about', platform);
  }

  constructor() {
    super();
  }
}
