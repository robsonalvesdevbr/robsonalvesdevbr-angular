import { Injectable, inject } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { AnalyticsService } from './analytics.service';
import { environment } from '@path-environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VirtualPageTrackingService {
  private gaService = inject(GoogleAnalyticsService);
  private analyticsService = inject(AnalyticsService);

  private sectionMetadata: { [key: string]: { title: string; description: string } } = {
    'about': {
      title: 'Sobre - Robson Alves',
      description: 'Conheça minha trajetória profissional de 23+ anos'
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

    this.gaService?.gtag('config', environment.googleAnalytics, {
      page_title: metadata.title,
      page_location: pageLocation,
      custom_parameter_trigger: trigger
    });

    if (typeof document !== 'undefined') {
      document.title = metadata.title;
    }
  }

  trackNavigationPattern(fromSection: string | null, toSection: string): void {
    if (fromSection) {
      this.analyticsService.trackNavigationFlow(fromSection, toSection);
    }
  }
}
