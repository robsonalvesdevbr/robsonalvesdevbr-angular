import { Injectable, inject } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { VirtualPageTrackingService } from './virtual-page-tracking.service';
import { debounce, ElementCache, BatchProcessor, scheduleIdleWork } from '../utils/performance.utils';

@Injectable({
  providedIn: 'root'
})
export class EngagementTrackingService {
  private gaService = inject(GoogleAnalyticsService);
  private virtualPageService = inject(VirtualPageTrackingService);
  private scrollDepthTracked = new Set<number>();
  private sectionTimeTracking = new Map<string, number>();
  private isTrackingTime = false;

  // Performance optimizations
  private isInitialized = false;
  private resizeObserver?: ResizeObserver;
  private analyticsBatcher: BatchProcessor<{ action: string; category: string; label?: string }>;

  constructor() {
    this.analyticsBatcher = new BatchProcessor(
      (items) => this.flushAnalytics(items),
      8, // Reduced batch size for more frequent but smaller batches
      400, // Increased delay for better batching
      'normal' // Add priority parameter
    );
  }

  initializeScrollTracking(): void {
    if (typeof window === 'undefined' || this.isInitialized) return;
    this.isInitialized = true;

    // Use debounced scroll handler
    const debouncedScrollHandler = debounce(() => {
      this.trackScrollDepth();
    }, 100);

    window.addEventListener('scroll', debouncedScrollHandler, {
      passive: true,
      capture: false
    });

    // Setup resize observer for cache invalidation
    this.setupResizeObserver();
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
      this.batchAnalyticsCall('scroll_depth', 'engagement', `${milestone}%`);
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

  private batchAnalyticsCall(action: string, category: string, label?: string): void {
    this.analyticsBatcher.add({ action, category, label });
  }

  private flushAnalytics(items: Array<{ action: string; category: string; label?: string }>): void {
    items.forEach(({ action, category, label }) => {
      this.gaService?.event(action, category, label);
    });
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

    if (timeSpent > 3) { // Reduced threshold from 5 to 3 seconds
      this.batchAnalyticsCall('time_on_section', 'engagement', `${sectionId}_${timeSpent}s`);
    }
  }

  trackSectionView(sectionId: string): void {
    this.batchAnalyticsCall('section_view', 'engagement', sectionId);

    // Simular mudança de página virtual para cada seção
    const sectionTitles: { [key: string]: string } = {
      'about': 'Sobre - Robson Alves',
      'dashboard': 'Dashboard - Robson Alves',
      'graduation': '(Pós)Graduação - Robson Alves',
      'courses': 'Cursos - Robson Alves',
      'formationcourse': 'Formação - Robson Alves',
      'books': 'Leituras - Robson Alves',
      'contact': 'Contato - Robson Alves'
    };

    if (sectionTitles[sectionId]) {
      // Use requestIdleCallback for non-critical gtag calls
      scheduleIdleWork(() => {
        this.gaService?.gtag('config', 'G-4VZHRRWLF8', {
          page_title: sectionTitles[sectionId],
          page_location: `${window.location.origin}/#${sectionId}`
        });
      });
    }
  }

  trackInteraction(action: string, section: string): void {
    this.gaService?.event(action, 'interaction', section);
  }

  trackPageEngagement(): void {
    if (typeof window === 'undefined') return;

    // Track page visibility with debouncing
    const handleVisibilityChange = debounce(() => {
      if (document.hidden) {
        this.batchAnalyticsCall('page_hidden', 'engagement', 'page_visibility');
      } else {
        this.batchAnalyticsCall('page_visible', 'engagement', 'page_visibility');
      }
    }, 100);

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Track time on page before leaving
    window.addEventListener('beforeunload', () => {
      this.analyticsBatcher.flush(); // Flush pending analytics
      const timeOnPage = Math.round((performance.now()) / 1000);
      if (timeOnPage > 10) { // Only track if spent more than 10 seconds
        this.gaService?.event('time_on_page', 'engagement', 'page_duration', timeOnPage);
      }
    });
  }

  // Cleanup method for better memory management
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

    // Debounce the intersection observer callback for better performance
    const debouncedProcessor = debounce((entries: IntersectionObserverEntry[]) => {
      scheduleIdleWork(() => {
        this.processSectionChanges(entries);
      });
    }, 150); // Add debouncing to reduce processing frequency

    const observer = new IntersectionObserver(
      debouncedProcessor,
      {
        threshold: [0.3, 0.7], // Multiple specific thresholds for better accuracy
        rootMargin: '-5% 0px -5% 0px' // Reduced margin for more precise detection
      }
    );

    // Cache section queries for better performance
    const sections = Array.from(document.querySelectorAll('section[id]'));
    sections.forEach(section => observer.observe(section));

    // Track hash changes (navegação por âncoras diretas)
    window.addEventListener('hashchange', () => {
      const newSection = window.location.hash.substring(1);
      if (newSection && this.currentSection !== newSection) {
        this.currentSection = newSection;
        this.batchAnalyticsCall('hash_navigation', 'navigation', newSection);
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

    // Batch analytics calls
    this.trackSectionView(sectionId);
    this.virtualPageService.sendVirtualPageView(sectionId, 'scroll');
    this.startTimeTracking(sectionId);

    // Track navigation pattern
    if (previousSection) {
      this.endTimeTracking(previousSection);
      this.virtualPageService.trackNavigationPattern(
        previousSection,
        sectionId
      );
    }

    // Update URL hash without reloading page
    if (sectionId && window.history.replaceState) {
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  }
}
