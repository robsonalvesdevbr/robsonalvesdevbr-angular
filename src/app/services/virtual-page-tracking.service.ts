import { Injectable, inject } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Injectable({
  providedIn: 'root'
})
export class VirtualPageTrackingService {
  private gaService = inject(GoogleAnalyticsService);
  
  private sectionMetadata: { [key: string]: { title: string; description: string } } = {
    'about': {
      title: 'Sobre - Robson Alves',
      description: 'Conheça minha trajetória profissional de 23+ anos'
    },
    'dashboard': {
      title: 'Dashboard - Robson Alves',
      description: 'Visão geral das minhas competências e experiências'
    },
    'graduation': {
      title: '(Pós)Graduação - Robson Alves',
      description: 'Minha formação acadêmica e certificações'
    },
    'courses': {
      title: 'Cursos - Robson Alves',
      description: 'Cursos e especializações realizados'
    },
    'formationcourse': {
      title: 'Formação - Robson Alves',
      description: 'Formações complementares e treinamentos'
    },
    'books': {
      title: 'Leituras - Robson Alves',
      description: 'Livros e publicações que influenciaram minha carreira'
    },
    'contact': {
      title: 'Contato - Robson Alves',
      description: 'Entre em contato comigo'
    }
  };

  sendVirtualPageView(sectionId: string, trigger: 'click' | 'scroll' | 'hash' = 'scroll'): void {
    const metadata = this.sectionMetadata[sectionId];
    if (!metadata) return;

    const pageLocation = `${window.location.origin}/#${sectionId}`;
    
    // Send page view event
    this.gaService?.gtag('config', 'G-4VZHRRWLF8', {
      page_title: metadata.title,
      page_location: pageLocation,
      custom_parameter_trigger: trigger
    });

    // Send custom event for better tracking
    this.gaService?.event('virtual_page_view', 'navigation', sectionId);

    // Update document title for better UX
    if (typeof document !== 'undefined') {
      document.title = metadata.title;
    }
  }

  trackNavigationPattern(fromSection: string | null, toSection: string, method: string): void {
    if (fromSection) {
      this.gaService?.event('navigation_flow', 'user_journey', `${fromSection}_to_${toSection}`);
    }
  }

  trackSectionEngagement(sectionId: string, timeSpent: number, scrollDepth: number): void {
    this.gaService?.event('section_engagement', 'engagement', sectionId, timeSpent);
  }

  private calculateEngagementQuality(timeSpent: number, scrollDepth: number): string {
    if (timeSpent > 30 && scrollDepth > 75) return 'high';
    if (timeSpent > 15 && scrollDepth > 50) return 'medium';
    if (timeSpent > 5 && scrollDepth > 25) return 'low';
    return 'bounce';
  }
}