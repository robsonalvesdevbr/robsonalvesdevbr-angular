import { Component, OnInit, OnDestroy, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EngagementTrackingService } from '@path-services/engagement-tracking-service';
import { PerformanceMonitorService } from '@path-services/performance-monitor.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Robson Candido dos Santos Alves';

  private readonly engagementService = inject(EngagementTrackingService);
  private readonly performanceService = inject(PerformanceMonitorService);
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.setupPerformanceMonitoring();
    this.setupEngagementTracking();
  }

  private setupPerformanceMonitoring(): void {
    // Start performance monitoring in development
    if (!this.isProduction()) {
      this.performanceService.startMonitoring();

      // Log performance report every 60 seconds in development (increased from 30s)
      interval(60000)
        .pipe(takeUntil(this.destroy$))
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
    return globalThis.window !== undefined &&
           globalThis.location.hostname !== 'localhost' &&
           !globalThis.location.hostname.includes('127.0.0.1');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.engagementService.destroy();
    this.performanceService.destroy();
  }
}
