import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { LoadingComponent } from '@path-components/utils/loading/loading.component';
import { PlaceholderComponent } from '@path-components/utils/placeholder/placeholder.component';
import { EngagementTrackingService } from '@path-services/engagement-tracking-service';
import { PerformanceMonitorService } from '@path-services/performance-monitor.service';
import { AboutComponent } from './components/pages/about/about.component';
import { BookComponent } from './components/pages/book/book.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { CourseComponent } from './components/pages/course/course.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { FooterComponent } from './components/pages/footer/footer.component';
import { FormationCourseComponent } from './components/pages/formationcourse/formationcourse.component';
import { GraduationComponent } from './components/pages/graduation/graduation.component';
import { MasterheadComponent } from './components/pages/masterhead/masterhead.component';
import { NavigationComponent } from './components/pages/navigation/navigation.component';

@Component({
  selector: 'app-root',
  imports: [
    NavigationComponent,
    MasterheadComponent,
    AboutComponent,
    DashboardComponent,
    GraduationComponent,
    CourseComponent,
    FormationCourseComponent,
    BookComponent,
    ContactComponent,
    FooterComponent,
    PlaceholderComponent,
    LoadingComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Robson Candido dos Santos Alves';

  private engagementService = inject(EngagementTrackingService);
  private performanceService = inject(PerformanceMonitorService);

  ngOnInit(): void {
    this.setupPerformanceMonitoring();
    this.setupEngagementTracking();
  }

  private setupPerformanceMonitoring(): void {
    // Start performance monitoring in development
    if (!this.isProduction()) {
      this.performanceService.startMonitoring();

      // Log performance report every 30 seconds in development
      setInterval(() => {
        this.performanceService.logPerformanceReport();
      }, 30000);
    }
  }

  private setupEngagementTracking(): void {
    const measure = this.performanceService.measureComponent('engagement-setup');
    measure.start();

    // Initialize scroll tracking
    this.engagementService.initializeScrollTracking();

    // Track general page engagement
    this.engagementService.trackPageEngagement();

    // Setup intersection observer with reduced delay for better performance
    setTimeout(() => {
      this.engagementService.setupIntersectionObserver();
      measure.end();
    }, 500); // Reduced from 1000ms
  }

  private isProduction(): boolean {
    return typeof window !== 'undefined' &&
           window.location.hostname !== 'localhost' &&
           !window.location.hostname.includes('127.0.0.1');
  }

  ngOnDestroy(): void {
    this.engagementService.destroy();
    this.performanceService.destroy();
  }
}
