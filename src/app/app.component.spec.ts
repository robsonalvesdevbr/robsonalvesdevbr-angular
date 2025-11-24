import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { EngagementTrackingService } from '@path-services/engagement-tracking-service';
import { PerformanceMonitorService } from '@path-services/performance-monitor.service';

describe('AppComponent', () => {
  let mockEngagementService: jasmine.SpyObj<EngagementTrackingService>;
  let mockPerformanceService: jasmine.SpyObj<PerformanceMonitorService>;

  beforeEach(async () => {
    mockEngagementService = jasmine.createSpyObj('EngagementTrackingService', [
      'initializeScrollTracking',
      'trackPageEngagement',
      'setupIntersectionObserver',
      'destroy',
    ]);

    mockPerformanceService = jasmine.createSpyObj('PerformanceMonitorService', [
      'startMonitoring',
      'logPerformanceReport',
      'measureComponent',
      'destroy',
    ]);

    mockPerformanceService.measureComponent.and.returnValue({
      start: vi.fn(),
      end: vi.fn(),
    });

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
      ],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: EngagementTrackingService, useValue: mockEngagementService },
        { provide: PerformanceMonitorService, useValue: mockPerformanceService },
      ],
    }).overrideComponent(AppComponent, {
      remove: { imports: [] },
      add: { template: '<div>Test</div>' },
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Robson Candido dos Santos Alves'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Robson Candido dos Santos Alves');
  });
});
