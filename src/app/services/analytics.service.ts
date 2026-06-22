import { Injectable, inject } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly ga = inject(GoogleAnalyticsService);

  trackSectionView(sectionName: string): void {
    this.ga?.gtag('event', 'section_view', { section_name: sectionName });
  }

  trackScrollDepth(depthPercentage: number): void {
    this.ga?.gtag('event', 'scroll_depth', {
      depth_percentage: depthPercentage,
      depth_label: `${depthPercentage}%`,
    });
  }

  trackTimeOnSection(sectionName: string, timeSpent: number): void {
    this.ga?.gtag('event', 'time_on_section', {
      section_name: sectionName,
      time_spent: timeSpent,
    });
  }

  trackHashNavigation(sectionName: string): void {
    this.ga?.gtag('event', 'hash_navigation', { section_name: sectionName });
  }

  trackMenuToggle(state: 'opened' | 'closed'): void {
    this.ga?.gtag('event', 'menu_toggle', { menu_state: state });
  }

  trackMenuClick(sectionName: string): void {
    this.ga?.gtag('event', 'menu_click', { section_name: sectionName });
  }

  trackNavigationFlow(fromSection: string, toSection: string): void {
    this.ga?.gtag('event', 'navigation_flow', {
      from_section: fromSection,
      to_section: toSection,
    });
  }

  trackFilterInstitution(institution: string, action: 'add' | 'remove'): void {
    this.ga?.gtag('event', 'filter_institution', {
      content_type: 'courses',
      institution,
      filter_action: action,
    });
  }

  trackFilterTag(tag: string, action: 'add' | 'remove', contentType: 'courses' | 'books'): void {
    this.ga?.gtag('event', 'filter_tag', {
      content_type: contentType,
      tag_name: tag,
      filter_action: action,
    });
  }

  trackFilterPublisher(publisher: string, action: 'add' | 'remove'): void {
    this.ga?.gtag('event', 'filter_publisher', {
      content_type: 'books',
      publisher,
      filter_action: action,
    });
  }

  trackClearFilters(contentType: string): void {
    this.ga?.gtag('event', 'clear_filters', { content_type: contentType });
  }

  trackCertificateClick(courseName: string, institution: string): void {
    this.ga?.gtag('event', 'certificate_click', {
      content_type: 'certificate',
      item_name: courseName,
      institution,
    });
  }

  trackBookUrlClick(bookTitle: string, publisher: string): void {
    this.ga?.gtag('event', 'book_url_click', {
      content_type: 'book',
      item_name: bookTitle,
      publisher,
    });
  }

  trackSocialLinkClick(platform: string, linkLocation: 'about' | 'contact' | 'footer'): void {
    this.ga?.gtag('event', 'social_link_click', {
      platform,
      link_location: linkLocation,
    });
  }

  trackSearch(searchTerm: string, contentType: 'courses' | 'books', resultCount: number): void {
    this.ga?.gtag('event', 'search', {
      search_term: searchTerm,
      content_type: contentType,
      result_count: resultCount,
      has_results: resultCount > 0,
    });
  }

  trackPagination(contentType: string, pageNumber: number, totalPages: number): void {
    this.ga?.gtag('event', 'pagination_change', {
      content_type: contentType,
      page_number: pageNumber,
      total_pages: totalPages,
    });
  }
}
