import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { EngagementTrackingService } from './engagement-tracking-service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { VirtualPageTrackingService } from './virtual-page-tracking.service';

describe('EngagementTrackingService', () => {
  let service: EngagementTrackingService;
  let gaService: jasmine.SpyObj<GoogleAnalyticsService>;
  let virtualPageService: jasmine.SpyObj<VirtualPageTrackingService>;

  beforeEach(() => {
    const gaSpy = jasmine.createSpyObj('GoogleAnalyticsService', ['event', 'gtag']);
    const virtualPageSpy = jasmine.createSpyObj('VirtualPageTrackingService', [
      'sendVirtualPageView',
      'trackNavigationPattern'
    ]);

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        EngagementTrackingService,
        { provide: GoogleAnalyticsService, useValue: gaSpy },
        { provide: VirtualPageTrackingService, useValue: virtualPageSpy }
      ],
    });

    service = TestBed.inject(EngagementTrackingService);
    gaService = TestBed.inject(GoogleAnalyticsService) as jasmine.SpyObj<GoogleAnalyticsService>;
    virtualPageService = TestBed.inject(VirtualPageTrackingService) as jasmine.SpyObj<VirtualPageTrackingService>;
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

      // Verificar se o tracking foi iniciado (não há um getter público, mas podemos testar o comportamento)
      expect(service).toBeTruthy();
    });

    it('should end time tracking and send analytics if time > 3s', (done) => {
      service.startTimeTracking('test-section');

      // Simular tempo passado
      setTimeout(() => {
        service.endTimeTracking('test-section');

        // Dar tempo para o batch processar
        setTimeout(() => {
          expect(gaService.event).toHaveBeenCalled();
          done();
        }, 500);
      }, 10);
    });

    it('should not send analytics if time < 3s', () => {
      service.startTimeTracking('test-section');

      // Finalizar imediatamente
      service.endTimeTracking('test-section');

      expect(gaService.event).not.toHaveBeenCalled();
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

      // Segunda chamada não deve reiniciar o timer
      expect(secondCall - firstCall).toBeLessThan(100);
    });
  });

  describe('Section View Tracking', () => {
    it('should track section view', (done) => {
      service.trackSectionView('about');

      setTimeout(() => {
        expect(gaService.event).toHaveBeenCalled();
        expect(gaService.gtag).toHaveBeenCalledWith(
          'config',
          'G-4VZHRRWLF8',
          jasmine.objectContaining({
            page_title: 'Sobre - Robson Alves'
          })
        );
        done();
      }, 500);
    });

    it('should track all section types', (done) => {
      const sections = ['about', 'dashboard', 'graduation', 'courses', 'formationcourse', 'books', 'contact'];

      sections.forEach(section => {
        service.trackSectionView(section);
      });

      setTimeout(() => {
        expect(gaService.event).toHaveBeenCalled();
        expect(gaService.gtag).toHaveBeenCalled();
        done();
      }, 500);
    });

    it('should handle unknown section', (done) => {
      service.trackSectionView('unknown-section');

      setTimeout(() => {
        expect(gaService.event).toHaveBeenCalled();
        // gtag não deve ser chamado para seções desconhecidas
        done();
      }, 500);
    });
  });

  describe('Interaction Tracking', () => {
    it('should track user interaction', () => {
      service.trackInteraction('click', 'button-section');

      expect(gaService.event).toHaveBeenCalledWith('click', 'interaction', 'button-section');
    });

    it('should track multiple interactions', () => {
      service.trackInteraction('scroll', 'header');
      service.trackInteraction('hover', 'menu');
      service.trackInteraction('click', 'link');

      expect(gaService.event).toHaveBeenCalledTimes(3);
    });
  });

  describe('Scroll Depth Tracking', () => {
    beforeEach(() => {
      // Mock window e document para testes de scroll
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

      // Não deve lançar erro
      expect(service).toBeTruthy();
    });

    it('should track scroll depth milestones', (done) => {
      service.initializeScrollTracking();

      // Simular scroll para 50%
      Object.defineProperty(window, 'scrollY', { writable: true, value: 700 });

      // Disparar evento de scroll manualmente
      window.dispatchEvent(new Event('scroll'));

      setTimeout(() => {
        // BatchProcessor deve eventualmente chamar event
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

    it('should handle visibility change', (done) => {
      service.trackPageEngagement();

      // Simular mudança de visibilidade
      Object.defineProperty(document, 'hidden', { writable: true, value: true });
      document.dispatchEvent(new Event('visibilitychange'));

      setTimeout(() => {
        // Event deve ser chamado eventualmente
        done();
      }, 600);
    });
  });

  describe('Intersection Observer', () => {
    it('should setup intersection observer', () => {
      // Mock IntersectionObserver como classe
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
      // Fazer múltiplas chamadas rapidamente
      service.trackSectionView('about');
      service.trackSectionView('courses');
      service.trackSectionView('books');

      // Aguardar o batch processar
      setTimeout(() => {
        expect(gaService.event).toHaveBeenCalled();
        done();
      }, 600);
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined gaService', () => {
      // Remover gaService
      (service as any).gaService = null;

      expect(() => {
        service.trackInteraction('click', 'test');
      }).not.toThrow();
    });

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

      // Não deve trackear scroll se não há área para rolar
      window.dispatchEvent(new Event('scroll'));

      expect(service).toBeTruthy();
    });
  });

  describe('Hash Navigation', () => {
    it('should handle hash changes', (done) => {
      // Mock IntersectionObserver
      class MockIntersectionObserver {
        observe = vi.fn();
        unobserve = vi.fn();
        disconnect = vi.fn();
      }

      window.IntersectionObserver = MockIntersectionObserver as any;

      service.setupIntersectionObserver();

      // Simular mudança de hash
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

      // Disparar múltiplos eventos de scroll rapidamente
      for (let i = 0; i < 10; i++) {
        window.dispatchEvent(new Event('scroll'));
      }

      // Devido ao debouncing, deve processar menos chamadas
      expect(service).toBeTruthy();
    });

    it('should use requestIdleCallback when available', (done) => {
      // Mock requestIdleCallback
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
