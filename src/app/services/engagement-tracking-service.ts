import { Injectable, inject } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Injectable({
  providedIn: 'root'
})
export class EngagementTrackingService {
  private gaService = inject(GoogleAnalyticsService);
  private scrollDepthTracked = new Set<number>();
  private sectionTimeTracking = new Map<string, number>();
  private isTrackingTime = false;

  initializeScrollTracking(): void {
    if (typeof window === 'undefined') return;

    window.addEventListener('scroll', () => {
      this.trackScrollDepth();
    }, { passive: true });
  }

  private trackScrollDepth(): void {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    const milestones = [25, 50, 75, 90, 100];
    
    for (const milestone of milestones) {
      if (scrollPercent >= milestone && !this.scrollDepthTracked.has(milestone)) {
        this.scrollDepthTracked.add(milestone);
        this.gaService?.event('scroll_depth', 'engagement', `${milestone}%`);
        break;
      }
    }
  }

  startTimeTracking(sectionId: string): void {
    if (this.sectionTimeTracking.has(sectionId)) return;
    
    this.sectionTimeTracking.set(sectionId, Date.now());
  }

  endTimeTracking(sectionId: string): void {
    const startTime = this.sectionTimeTracking.get(sectionId);
    if (!startTime) return;

    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    this.sectionTimeTracking.delete(sectionId);

    if (timeSpent > 5) { // Only track if spent more than 5 seconds
      this.gaService?.event('time_on_section', 'engagement', sectionId, timeSpent);
    }
  }

  trackSectionView(sectionId: string): void {
    this.gaService?.event('section_view', 'engagement', sectionId);
  }

  trackInteraction(action: string, section: string): void {
    this.gaService?.event(action, 'interaction', section);
  }

  trackPageEngagement(): void {
    if (typeof window === 'undefined') return;

    // Track page visibility
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.gaService?.event('page_hidden', 'engagement', 'page_visibility');
      } else {
        this.gaService?.event('page_visible', 'engagement', 'page_visibility');
      }
    });

    // Track time on page before leaving
    window.addEventListener('beforeunload', () => {
      const timeOnPage = Math.round((Date.now() - performance.now()) / 1000);
      if (timeOnPage > 10) { // Only track if spent more than 10 seconds
        this.gaService?.event('time_on_page', 'engagement', 'page_duration', timeOnPage);
      }
    });
  }

  setupIntersectionObserver(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          if (entry.isIntersecting) {
            this.trackSectionView(sectionId);
            this.startTimeTracking(sectionId);
          } else {
            this.endTimeTracking(sectionId);
          }
        });
      },
      { 
        threshold: 0.5, // Track when 50% of section is visible
        rootMargin: '0px 0px -20% 0px' // Start tracking a bit before the section is fully visible
      }
    );

    // Observe all major sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));
  }
}