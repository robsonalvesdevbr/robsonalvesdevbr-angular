import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { VirtualPageTrackingService } from './virtual-page-tracking.service';
import { AnalyticsService } from './analytics.service';

describe('VirtualPageTrackingService', () => {
  let service: VirtualPageTrackingService;
  let gaService: jasmine.SpyObj<GoogleAnalyticsService>;
  let analyticsService: jasmine.SpyObj<AnalyticsService>;

  beforeEach(() => {
    const gaSpy = jasmine.createSpyObj('GoogleAnalyticsService', ['gtag']);
    const analyticsSpy = jasmine.createSpyObj('AnalyticsService', ['trackNavigationFlow']);

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        VirtualPageTrackingService,
        { provide: GoogleAnalyticsService, useValue: gaSpy },
        { provide: AnalyticsService, useValue: analyticsSpy },
      ],
    });

    service = TestBed.inject(VirtualPageTrackingService);
    gaService = TestBed.inject(GoogleAnalyticsService) as jasmine.SpyObj<GoogleAnalyticsService>;
    analyticsService = TestBed.inject(AnalyticsService) as jasmine.SpyObj<AnalyticsService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a virtual page view for a known section', () => {
    service.sendVirtualPageView('about');

    expect(gaService.gtag).toHaveBeenCalledWith('event', 'page_view', {
      page_title: 'Sobre - Robson Alves',
      page_location: `${window.location.origin}/#about`,
    });
    expect(document.title).toBe('Sobre - Robson Alves');
  });

  it('should update document title per section', () => {
    service.sendVirtualPageView('books');
    expect(document.title).toBe('Leituras - Robson Alves');
  });

  it('should do nothing for an unknown section', () => {
    service.sendVirtualPageView('unknown-section');
    expect(gaService.gtag).not.toHaveBeenCalled();
  });

  it('should track navigation flow when fromSection is provided', () => {
    service.trackNavigationPattern('about', 'courses');
    expect(analyticsService.trackNavigationFlow).toHaveBeenCalledWith('about', 'courses');
  });

  it('should not track navigation flow when fromSection is null', () => {
    service.trackNavigationPattern(null, 'courses');
    expect(analyticsService.trackNavigationFlow).not.toHaveBeenCalled();
  });
});
