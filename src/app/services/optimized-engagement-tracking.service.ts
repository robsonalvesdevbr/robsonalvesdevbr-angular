import { Injectable, inject } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { VirtualPageTrackingService } from './virtual-page-tracking.service';

@Injectable({
  providedIn: 'root'
})
export class OptimizedEngagementTrackingService {
  private gaService = inject(GoogleAnalyticsService);
  private virtualPageService = inject(VirtualPageTrackingService);
  private scrollDepthTracked = new Set<number>();
  private sectionTimeTracking = new Map<string, number>();

  // Performance optimizations
  private scrollTimeout: number | null = null;
  private resizeObserver?: ResizeObserver;
  private intersectionObserver?: IntersectionObserver;
  private isInitialized = false;

  initializeScrollTracking(): void {
    if (typeof window === 'undefined' || this.isInitialized) return;
    this.isInitialized = true;

    // Debounced scroll handler
    window.addEventListener('scroll', this.debouncedScrollHandler.bind(this), {
      passive: true,
      capture: false
    });

    // Optimize resize handling
    this.setupResizeObserver();
  }

  private debouncedScrollHandler(): void {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    this.scrollTimeout = window.setTimeout(() => {
      this.trackScrollDepth();
      this.scrollTimeout = null;
    }, 100); // Debounce 100ms
  }

  private trackScrollDepth(): void {
    // Cache DOM measurements
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;

    if (documentHeight <= windowHeight) return; // No scroll needed

    const scrollPercent = Math.round(
      (scrollY / (documentHeight - windowHeight)) * 100
    );

    const milestones = [25, 50, 75, 90, 100];

    // Find first untracked milestone
    const milestone = milestones.find(m =>
      scrollPercent >= m && !this.scrollDepthTracked.has(m)
    );

    if (milestone) {
      this.scrollDepthTracked.add(milestone);
      // Batch analytics calls
      this.batchAnalyticsCall('scroll_depth', 'engagement', `${milestone}%`);
    }
  }

  private setupResizeObserver(): void {
    if ('ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver((entries) => {
        // Reset scroll tracking on significant size changes
        const entry = entries[0];
        if (entry.contentRect.height < 100) {
          this.scrollDepthTracked.clear();
        }
      });

      this.resizeObserver.observe(document.body);
    }
  }

  setupOptimizedIntersectionObserver(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    // Single threshold for better performance
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        // Use RequestIdleCallback for non-critical updates
        this.scheduleIdleWork(() => {
          this.processSectionChanges(entries);
        });
      },
      {
        threshold: 0.5, // Single threshold
        rootMargin: '-10% 0px -10% 0px' // Simpler margin
      }
    );

    // Cache section queries
    const sections = Array.from(document.querySelectorAll('section[id]'));
    sections.forEach(section => this.intersectionObserver!.observe(section));
  }

  private scheduleIdleWork(callback: () => void): void {
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(callback, { timeout: 1000 });
    } else {
      setTimeout(callback, 0);
    }
  }

  private processSectionChanges(entries: IntersectionObserverEntry[]): void {
    const visibleSections = entries
      .filter(entry => entry.isIntersecting)
      .map(entry => ({ id: entry.target.id, ratio: entry.intersectionRatio }))
      .sort((a, b) => b.ratio - a.ratio);

    if (visibleSections.length > 0) {
      const primarySection = visibleSections[0];
      this.handleSectionChange(primarySection.id);
    }
  }

  private currentSection: string | null = null;
  private analyticsQueue: Array<{ action: string; category: string; label?: string }> = [];
  private batchTimeout: number | null = null;

  private handleSectionChange(sectionId: string): void {
    if (this.currentSection === sectionId) return;

    const previousSection = this.currentSection;
    this.currentSection = sectionId;

    // Batch analytics calls
    this.batchAnalyticsCall('section_view', 'engagement', sectionId);

    // Handle section timing
    if (previousSection) {
      this.endTimeTracking(previousSection);
    }
    this.startTimeTracking(sectionId);

    // Virtual page tracking
    this.virtualPageService.sendVirtualPageView(sectionId, 'scroll');
  }

  private batchAnalyticsCall(action: string, category: string, label?: string): void {
    this.analyticsQueue.push({ action, category, label });

    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout);
    }

    this.batchTimeout = window.setTimeout(() => {
      this.flushAnalytics();
    }, 200); // Batch calls every 200ms
  }

  private flushAnalytics(): void {
    if (this.analyticsQueue.length === 0) return;

    // Send all batched events
    this.analyticsQueue.forEach(({ action, category, label }) => {
      this.gaService?.event(action, category, label);
    });

    this.analyticsQueue = [];
    this.batchTimeout = null;
  }

  startTimeTracking(sectionId: string): void {
    if (!this.sectionTimeTracking.has(sectionId)) {
      this.sectionTimeTracking.set(sectionId, performance.now());
    }
  }

  endTimeTracking(sectionId: string): void {
    const startTime = this.sectionTimeTracking.get(sectionId);
    if (!startTime) return;

    const timeSpent = Math.round((performance.now() - startTime) / 1000);
    this.sectionTimeTracking.delete(sectionId);

    if (timeSpent > 3) { // Reduced threshold
      this.batchAnalyticsCall('time_on_section', 'engagement', `${sectionId}_${timeSpent}s`);
    }
  }

  destroy(): void {
    // Cleanup
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout);
    }

    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();

    // Flush remaining analytics
    this.flushAnalytics();
  }
}
