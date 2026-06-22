import { Injectable, inject } from '@angular/core';
import { AnalyticsService } from './analytics.service';
import { VirtualPageTrackingService } from './virtual-page-tracking.service';
import { debounce, ElementCache, BatchProcessor, scheduleIdleWork } from '../utils/performance.utils';

@Injectable({
  providedIn: 'root'
})
export class EngagementTrackingService {
  private analyticsService = inject(AnalyticsService);
  private virtualPageService = inject(VirtualPageTrackingService);
  private scrollDepthTracked = new Set<number>();
  private sectionTimeTracking = new Map<string, number>();
  private isTrackingTime = false;

  private isInitialized = false;
  private resizeObserver?: ResizeObserver;
  private analyticsBatcher: BatchProcessor<() => void>;

  constructor() {
    this.analyticsBatcher = new BatchProcessor(
      (fns) => fns.forEach(fn => fn()),
      8,
      400,
      'normal'
    );
  }

  initializeScrollTracking(): void {
    if (typeof window === 'undefined' || this.isInitialized) return;
    this.isInitialized = true;

    const debouncedScrollHandler = debounce(() => {
      this.trackScrollDepth();
    }, 100);

    window.addEventListener('scroll', debouncedScrollHandler, {
      passive: true,
      capture: false
    });

    this.setupResizeObserver();
  }

  private trackScrollDepth(): void {
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;

    if (documentHeight <= windowHeight) return;

    const scrollPercent = Math.round(
      (scrollY / (documentHeight - windowHeight)) * 100
    );

    const milestones = [25, 50, 75, 90, 100];

    const milestone = milestones.find(m =>
      scrollPercent >= m && !this.scrollDepthTracked.has(m)
    );

    if (milestone) {
      this.scrollDepthTracked.add(milestone);
      this.batchAnalyticsCall(() => this.analyticsService.trackScrollDepth(milestone));
    }
  }

  private setupResizeObserver(): void {
    if ('ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver((entries) => {
        scheduleIdleWork(() => {
          const entry = entries[0];
          if (entry.contentRect.height < 100) {
            this.scrollDepthTracked.clear();
            ElementCache.clear();
          }
        });
      });

      this.resizeObserver.observe(document.body);
    }
  }

  private batchAnalyticsCall(fn: () => void): void {
    this.analyticsBatcher.add(fn);
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

    if (timeSpent > 3) {
      this.batchAnalyticsCall(() =>
        this.analyticsService.trackTimeOnSection(sectionId, timeSpent)
      );
    }
  }

  trackSectionView(sectionId: string): void {
    this.batchAnalyticsCall(() => this.analyticsService.trackSectionView(sectionId));
  }

  trackInteraction(action: string, section: string): void {
    this.analyticsService.trackSectionView(section);
  }

  trackPageEngagement(): void {
    if (typeof window === 'undefined') return;

    window.addEventListener('beforeunload', () => {
      this.analyticsBatcher.flush();
    });
  }

  destroy(): void {
    this.analyticsBatcher.destroy();
    this.resizeObserver?.disconnect();
    this.scrollDepthTracked.clear();
    this.sectionTimeTracking.clear();
    ElementCache.clear();
  }

  private currentSection: string | null = null;
  private previousSection: string | null = null;

  setupIntersectionObserver(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const debouncedProcessor = debounce((entries: IntersectionObserverEntry[]) => {
      scheduleIdleWork(() => {
        this.processSectionChanges(entries);
      });
    }, 150);

    const observer = new IntersectionObserver(
      debouncedProcessor,
      {
        threshold: [0.3, 0.7],
        rootMargin: '-5% 0px -5% 0px'
      }
    );

    const sections = Array.from(document.querySelectorAll('section[id]'));
    sections.forEach(section => observer.observe(section));

    window.addEventListener('hashchange', () => {
      const newSection = window.location.hash.substring(1);
      if (newSection && this.currentSection !== newSection) {
        this.currentSection = newSection;
        this.batchAnalyticsCall(() => this.analyticsService.trackHashNavigation(newSection));
      }
    });
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

  private handleSectionChange(sectionId: string): void {
    if (this.currentSection === sectionId) return;

    const previousSection = this.currentSection;
    this.currentSection = sectionId;

    this.trackSectionView(sectionId);
    this.virtualPageService.sendVirtualPageView(sectionId, 'scroll');
    this.startTimeTracking(sectionId);

    if (previousSection) {
      this.endTimeTracking(previousSection);
      this.virtualPageService.trackNavigationPattern(previousSection, sectionId);
    }

    if (sectionId && window.history.replaceState) {
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  }
}
