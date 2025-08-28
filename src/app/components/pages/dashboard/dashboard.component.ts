import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';
import { StatisticsService, DashboardStats } from '@path-services/statistics-service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { AnimatedCounterComponent } from '@path-components/utils/animated-counter/animated-counter.component';
import { BasePageComponent } from '@path-components/base-page/base-page.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, AnimatedCounterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent extends BasePageComponent implements OnInit {
  private readonly statisticsService = inject(StatisticsService);
  private readonly gaService = inject(GoogleAnalyticsService);

  stats = signal<DashboardStats | null>(null);
  yearlyStats = signal(this.statisticsService.getYearlyStats());
  isLoading = signal(true);

  ngOnInit(): void {
    this.loadStats();
    this.gaService?.event('page_view', 'dashboard', 'statistics_viewed');
  }

  private loadStats(): void {
    setTimeout(() => {
      this.stats.set(this.statisticsService.getDashboardStats());
      this.isLoading.set(false);
    }, 500); // Simulate loading delay for better UX
  }

  onStatsCardClick(cardType: string): void {
    this.gaService?.event('stats_card_click', 'dashboard', cardType);
  }
}