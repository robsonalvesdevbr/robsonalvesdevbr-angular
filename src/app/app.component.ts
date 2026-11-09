import { Component, DestroyRef, afterNextRender, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { interval } from 'rxjs';
import { EngagementTrackingService } from '@path-services/engagement-tracking-service';
import { PerformanceMonitorService } from '@path-services/performance-monitor.service';
import { isLocalHostname } from '@path-utils/analytics-config.utils';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Robson Alves';

  private readonly engagementService = inject(EngagementTrackingService);
  private readonly performanceService = inject(PerformanceMonitorService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      this.setupPerformanceMonitoring();
      this.setupEngagementTracking();
    });

    this.destroyRef.onDestroy(() => {
      this.engagementService.destroy();
      this.performanceService.destroy();
    });
  }

  private setupPerformanceMonitoring(): void {
    // Start performance monitoring in development
    if (!this.isProduction()) {
      this.performanceService.startMonitoring();

      // Log performance report every 60 seconds in development (increased from 30s)
      interval(60000)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.performanceService.logPerformanceReport();
        });
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
    return globalThis.window !== undefined && !isLocalHostname(globalThis.location.hostname);
  }
}
