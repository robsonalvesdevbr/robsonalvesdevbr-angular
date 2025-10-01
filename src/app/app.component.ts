import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EngagementTrackingService } from '@path-services/engagement-tracking-service';
import { PerformanceMonitorService } from '@path-services/performance-monitor.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Robson Candido dos Santos Alves';

  private engagementService = inject(EngagementTrackingService);
  private performanceService = inject(PerformanceMonitorService);
  private performanceInterval?: number;

  ngOnInit(): void {
    this.setupPerformanceMonitoring();
    this.setupEngagementTracking();
  }

  private setupPerformanceMonitoring(): void {
    // Start performance monitoring in development
    if (!this.isProduction()) {
      this.performanceService.startMonitoring();

      // Log performance report every 60 seconds in development (increased from 30s)
      this.performanceInterval = window.setInterval(() => {
        this.performanceService.logPerformanceReport();
      }, 60000);
    }
  }

  private setupEngagementTracking(): void {
    const measure = this.performanceService.measureComponent('engagement-setup');
    measure.start();

    this.engagementService.initializeScrollTracking();
    this.engagementService.trackPageEngagement();

    requestIdleCallback(() => {
      this.engagementService.setupIntersectionObserver();
      measure.end();
    }, { timeout: 2000 });
  }

  private isProduction(): boolean {
    return typeof window !== 'undefined' &&
           window.location.hostname !== 'localhost' &&
           !window.location.hostname.includes('127.0.0.1');
  }

  ngOnDestroy(): void {
    if (this.performanceInterval) {
      clearInterval(this.performanceInterval);
    }
    this.engagementService.destroy();
    this.performanceService.destroy();
  }
}
