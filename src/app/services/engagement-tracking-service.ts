import { Injectable, inject } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { VirtualPageTrackingService } from './virtual-page-tracking.service';

@Injectable({
  providedIn: 'root'
})
export class EngagementTrackingService {
  private gaService = inject(GoogleAnalyticsService);
  private virtualPageService = inject(VirtualPageTrackingService);
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
      this.gaService?.gtag('config', 'G-4VZHRRWLF8', {
        page_title: sectionTitles[sectionId],
        page_location: `${window.location.origin}/#${sectionId}`
      });
    }
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

  private currentSection: string | null = null;
  private previousSection: string | null = null;

  setupIntersectionObserver(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            // Só trackear se mudou de seção
            if (this.currentSection !== sectionId) {
              this.previousSection = this.currentSection;
              this.currentSection = sectionId;
              
              // Track section view and virtual page
              this.trackSectionView(sectionId);
              this.virtualPageService.sendVirtualPageView(sectionId, 'scroll');
              this.startTimeTracking(sectionId);
              
              // Track navigation pattern
              if (this.previousSection) {
                this.virtualPageService.trackNavigationPattern(
                  this.previousSection, 
                  sectionId
                );
              }
              
              // Atualizar URL hash sem recarregar página
              if (sectionId && window.history.replaceState) {
                window.history.replaceState(null, '', `#${sectionId}`);
              }
            }
          } else if (!entry.isIntersecting) {
            this.endTimeTracking(sectionId);
          }
        });
      },
      { 
        threshold: [0.3, 0.5, 0.7], // Múltiplos thresholds para melhor detecção
        rootMargin: '0px 0px -20% 0px'
      }
    );

    // Observe all major sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));
    
    // Track hash changes (navegação por âncoras diretas)
    window.addEventListener('hashchange', () => {
      const newSection = window.location.hash.substring(1);
      if (newSection && this.currentSection !== newSection) {
        this.currentSection = newSection;
        this.gaService?.event('hash_navigation', 'navigation', newSection);
      }
    });
  }
}