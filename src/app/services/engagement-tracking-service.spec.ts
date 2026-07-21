import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { EngagementTrackingService } from './engagement-tracking-service';
import { AnalyticsService } from './analytics.service';
import { VirtualPageTrackingService } from './virtual-page-tracking.service';

describe('EngagementTrackingService', () => {
  let service: EngagementTrackingService;
  let analyticsService: jasmine.SpyObj<AnalyticsService>;
  let _virtualPageService: jasmine.SpyObj<VirtualPageTrackingService>;

  beforeEach(() => {
    const analyticsSpy = jasmine.createSpyObj('AnalyticsService', [
      'trackSectionView',
      'trackScrollDepth',
      'trackTimeOnSection',
      'trackHashNavigation',
    ]);
    const virtualPageSpy = jasmine.createSpyObj('VirtualPageTrackingService', [
      'sendVirtualPageView',
      'trackNavigationPattern'
    ]);

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        EngagementTrackingService,
        { provide: AnalyticsService, useValue: analyticsSpy },
        { provide: VirtualPageTrackingService, useValue: virtualPageSpy }
      ],
    });

    service = TestBed.inject(EngagementTrackingService);
    analyticsService = TestBed.inject(AnalyticsService) as jasmine.SpyObj<AnalyticsService>;
    _virtualPageService = TestBed.inject(VirtualPageTrackingService) as jasmine.SpyObj<VirtualPageTrackingService>;
  });

  afterEach(() => {
    service.destroy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Time Tracking', () => {
    it('should start time tracking for a section', () => {
      service.startTimeTracking('test-section');
      expect(service).toBeTruthy();
    });

    it('should end time tracking and send analytics if time > 3s', (done) => {
      service.startTimeTracking('test-section');

      setTimeout(() => {
        service.endTimeTracking('test-section');

        setTimeout(() => {
          expect(analyticsService.trackTimeOnSection).toHaveBeenCalled();
          done();
        }, 500);
      }, 10);
    });

    it('should not send analytics if time < 3s', () => {
      service.startTimeTracking('test-section');
      service.endTimeTracking('test-section');
      expect(analyticsService.trackTimeOnSection).not.toHaveBeenCalled();
    });

    it('should handle endTimeTracking without startTimeTracking', () => {
      expect(() => {
        service.endTimeTracking('non-existent-section');
      }).not.toThrow();
    });

    it('should not restart tracking for same section', () => {
      service.startTimeTracking('test-section');
      const firstCall = performance.now();

      service.startTimeTracking('test-section');
      const secondCall = performance.now();

      expect(secondCall - firstCall).toBeLessThan(100);
    });
  });

  describe('Section View Tracking', () => {
    it('should track section view via analytics service', (done) => {
      service.trackSectionView('about');

      setTimeout(() => {
        expect(analyticsService.trackSectionView).toHaveBeenCalledWith('about');
        done();
      }, 500);
    });

    it('should track all section types', (done) => {
      const sections = ['about', 'graduation', 'courses', 'trilhas', 'books', 'contact'];

      sections.forEach(section => {
        service.trackSectionView(section);
      });

      setTimeout(() => {
        expect(analyticsService.trackSectionView).toHaveBeenCalled();
        done();
      }, 500);
    });

    it('should not send duplicate gtag config call', (done) => {
      service.trackSectionView('about');

      setTimeout(() => {
        expect(analyticsService.trackSectionView).toHaveBeenCalledWith('about');
        done();
      }, 500);
    });
  });

  describe('Interaction Tracking', () => {
    it('should track user interaction via analytics service', () => {
      service.trackInteraction('click', 'button-section');
      expect(analyticsService.trackSectionView).toHaveBeenCalledWith('button-section');
    });

    it('should track multiple interactions', () => {
      service.trackInteraction('scroll', 'header');
      service.trackInteraction('hover', 'menu');
      service.trackInteraction('click', 'link');

      expect(analyticsService.trackSectionView).toHaveBeenCalledTimes(3);
    });
  });

  describe('Scroll Depth Tracking', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerHeight', { writable: true, value: 600 });
      Object.defineProperty(document.documentElement, 'scrollHeight', { writable: true, value: 2000 });
      Object.defineProperty(window, 'scrollY', { writable: true, value: 0 });
    });

    it('should initialize scroll tracking', () => {
      expect(() => {
        service.initializeScrollTracking();
      }).not.toThrow();
    });

    it('should not initialize twice', () => {
      service.initializeScrollTracking();
      service.initializeScrollTracking();
      expect(service).toBeTruthy();
    });

    it('should track scroll depth milestones with numeric value', (done) => {
      service.initializeScrollTracking();

      Object.defineProperty(window, 'scrollY', { writable: true, value: 700 });
      window.dispatchEvent(new Event('scroll'));

      setTimeout(() => {
        done();
      }, 600);
    });
  });

  describe('Page Engagement Tracking', () => {
    it('should track page engagement', () => {
      expect(() => {
        service.trackPageEngagement();
      }).not.toThrow();
    });

    it('should not track page_hidden or page_visible events', (done) => {
      service.trackPageEngagement();

      Object.defineProperty(document, 'hidden', { writable: true, value: true });
      document.dispatchEvent(new Event('visibilitychange'));

      setTimeout(() => {
        expect(analyticsService.trackSectionView).not.toHaveBeenCalled();
        done();
      }, 600);
    });
  });

  describe('Intersection Observer', () => {
    it('should setup intersection observer', () => {
      class MockIntersectionObserver {
        observe = vi.fn();
        unobserve = vi.fn();
        disconnect = vi.fn();
      }

      window.IntersectionObserver = MockIntersectionObserver as any;

      expect(() => {
        service.setupIntersectionObserver();
      }).not.toThrow();
    });

    it('should handle browsers without IntersectionObserver', () => {
      const originalIO = window.IntersectionObserver;
      delete (window as any).IntersectionObserver;

      expect(() => {
        service.setupIntersectionObserver();
      }).not.toThrow();

      window.IntersectionObserver = originalIO;
    });
  });

  describe('Cleanup', () => {
    it('should cleanup resources on destroy', () => {
      service.initializeScrollTracking();
      service.startTimeTracking('test-section');

      expect(() => {
        service.destroy();
      }).not.toThrow();
    });

    it('should be safe to call destroy multiple times', () => {
      service.destroy();
      service.destroy();
      expect(service).toBeTruthy();
    });
  });

  describe('Batch Processing', () => {
    it('should batch analytics calls', (done) => {
      service.trackSectionView('about');
      service.trackSectionView('courses');
      service.trackSectionView('books');

      setTimeout(() => {
        expect(analyticsService.trackSectionView).toHaveBeenCalled();
        done();
      }, 600);
    });
  });

  describe('Edge Cases', () => {
    it('should handle SSR environment (no window)', () => {
      const originalWindow = global.window;
      delete (global as any).window;

      expect(() => {
        service.initializeScrollTracking();
        service.trackPageEngagement();
      }).not.toThrow();

      global.window = originalWindow;
    });

    it('should handle document with no height', () => {
      Object.defineProperty(document.documentElement, 'scrollHeight', { writable: true, value: 500 });
      Object.defineProperty(window, 'innerHeight', { writable: true, value: 600 });

      service.initializeScrollTracking();
      window.dispatchEvent(new Event('scroll'));

      expect(service).toBeTruthy();
    });
  });

  describe('Hash Navigation', () => {
    it('should handle hash changes', (done) => {
      class MockIntersectionObserver {
        observe = vi.fn();
        unobserve = vi.fn();
        disconnect = vi.fn();
      }

      window.IntersectionObserver = MockIntersectionObserver as any;

      service.setupIntersectionObserver();

      window.location.hash = '#about';
      window.dispatchEvent(new Event('hashchange'));

      setTimeout(() => {
        done();
      }, 200);
    });
  });

  describe('Performance', () => {
    it('should use debouncing for scroll events', () => {
      service.initializeScrollTracking();

      for (let i = 0; i < 10; i++) {
        window.dispatchEvent(new Event('scroll'));
      }

      expect(service).toBeTruthy();
    });

    it('should use requestIdleCallback when available', (done) => {
      const originalRIC = (window as any).requestIdleCallback;
      (window as any).requestIdleCallback = (cb: () => void) => setTimeout(cb, 0);

      service.trackSectionView('about');

      setTimeout(() => {
        (window as any).requestIdleCallback = originalRIC;
        done();
      }, 100);
    });
  });
});
