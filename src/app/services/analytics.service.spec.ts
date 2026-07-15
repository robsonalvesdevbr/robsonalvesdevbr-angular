import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { AnalyticsService } from './analytics.service';

describe('AnalyticsService', () => {
  let service: AnalyticsService;
  let ga: jasmine.SpyObj<GoogleAnalyticsService>;

  beforeEach(() => {
    const gaSpy = jasmine.createSpyObj('GoogleAnalyticsService', ['gtag']);

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        AnalyticsService,
        { provide: GoogleAnalyticsService, useValue: gaSpy },
      ],
    });

    service = TestBed.inject(AnalyticsService);
    ga = TestBed.inject(GoogleAnalyticsService) as jasmine.SpyObj<GoogleAnalyticsService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should track section view', () => {
    service.trackSectionView('about');
    expect(ga.gtag).toHaveBeenCalledWith('event', 'section_view', { section_name: 'about' });
  });

  it('should track scroll depth', () => {
    service.trackScrollDepth(50);
    expect(ga.gtag).toHaveBeenCalledWith('event', 'scroll_depth', {
      depth_percentage: 50,
      depth_label: '50%',
    });
  });

  it('should track time on section', () => {
    service.trackTimeOnSection('about', 12);
    expect(ga.gtag).toHaveBeenCalledWith('event', 'time_on_section', {
      section_name: 'about',
      time_spent: 12,
    });
  });

  it('should track hash navigation', () => {
    service.trackHashNavigation('contact');
    expect(ga.gtag).toHaveBeenCalledWith('event', 'hash_navigation', { section_name: 'contact' });
  });

  it('should track menu toggle', () => {
    service.trackMenuToggle('opened');
    expect(ga.gtag).toHaveBeenCalledWith('event', 'menu_toggle', { menu_state: 'opened' });
  });

  it('should track menu click', () => {
    service.trackMenuClick('books');
    expect(ga.gtag).toHaveBeenCalledWith('event', 'menu_click', { section_name: 'books' });
  });

  it('should track navigation flow', () => {
    service.trackNavigationFlow('about', 'courses');
    expect(ga.gtag).toHaveBeenCalledWith('event', 'navigation_flow', {
      from_section: 'about',
      to_section: 'courses',
    });
  });

  it('should track filter institution', () => {
    service.trackFilterInstitution('UFPR', 'add');
    expect(ga.gtag).toHaveBeenCalledWith('event', 'filter_institution', {
      content_type: 'courses',
      institution: 'UFPR',
      filter_action: 'add',
    });
  });

  it('should track filter tag', () => {
    service.trackFilterTag('angular', 'remove', 'books');
    expect(ga.gtag).toHaveBeenCalledWith('event', 'filter_tag', {
      content_type: 'books',
      tag_name: 'angular',
      filter_action: 'remove',
    });
  });

  it('should track filter publisher', () => {
    service.trackFilterPublisher('Novatec', 'add');
    expect(ga.gtag).toHaveBeenCalledWith('event', 'filter_publisher', {
      content_type: 'books',
      publisher: 'Novatec',
      filter_action: 'add',
    });
  });

  it('should track clear filters', () => {
    service.trackClearFilters('books');
    expect(ga.gtag).toHaveBeenCalledWith('event', 'clear_filters', { content_type: 'books' });
  });

  it('should track certificate click', () => {
    service.trackCertificateClick('Angular Avançado', 'Alura');
    expect(ga.gtag).toHaveBeenCalledWith('event', 'certificate_click', {
      content_type: 'certificate',
      item_name: 'Angular Avançado',
      institution: 'Alura',
    });
  });

  it('should track book url click', () => {
    service.trackBookUrlClick('Clean Code', 'Alta Books');
    expect(ga.gtag).toHaveBeenCalledWith('event', 'book_url_click', {
      content_type: 'book',
      item_name: 'Clean Code',
      publisher: 'Alta Books',
    });
  });

  it('should track social link click', () => {
    service.trackSocialLinkClick('linkedin', 'footer');
    expect(ga.gtag).toHaveBeenCalledWith('event', 'social_link_click', {
      platform: 'linkedin',
      link_location: 'footer',
    });
  });

  it('should track search with results', () => {
    service.trackSearch('angular', 'courses', 3);
    expect(ga.gtag).toHaveBeenCalledWith('event', 'search', {
      search_term: 'angular',
      content_type: 'courses',
      result_count: 3,
      has_results: true,
    });
  });

  it('should track search without results', () => {
    service.trackSearch('xyz', 'books', 0);
    expect(ga.gtag).toHaveBeenCalledWith('event', 'search', {
      search_term: 'xyz',
      content_type: 'books',
      result_count: 0,
      has_results: false,
    });
  });

  it('should track pagination', () => {
    service.trackPagination('courses', 2, 5);
    expect(ga.gtag).toHaveBeenCalledWith('event', 'pagination_change', {
      content_type: 'courses',
      page_number: 2,
      total_pages: 5,
    });
  });
});
