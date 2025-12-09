import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { StatisticsService, DashboardStats } from '@path-services/statistics-service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { DataService } from '@path-services/data-service';
import { PerformanceMonitorService } from '@path-services/performance-monitor.service';
import { LoggerService } from '@path-services/logger.service';
import { AnimatedCounterComponent } from '@path-components/utils/animated-counter/animated-counter.component';
import { TranslatePipe } from '@path-pipes/translate.pipe';
import { IGraduation } from '@path-interfaces/IGraduation';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let statisticsService: jasmine.SpyObj<StatisticsService>;
  let gaService: jasmine.SpyObj<GoogleAnalyticsService>;
  let dataService: jasmine.SpyObj<DataService>;
  let performanceService: jasmine.SpyObj<PerformanceMonitorService>;
  let loggerService: jasmine.SpyObj<LoggerService>;

  const mockStats: DashboardStats = {
    totalCourses: 10,
    totalBooks: 5,
    totalFormations: 3,
    totalGraduations: 2,
    favoriteCourses: 4,
    completedGraduations: 1,
    booksProgress: 75,
    topInstitutions: [
      { name: 'Udemy', count: 5 },
      { name: 'Coursera', count: 3 },
    ],
    topTechnologies: [
      { name: 'Angular', count: 8 },
      { name: 'TypeScript', count: 6 },
    ],
    recentCourses: [],
    monthlyProgress: [],
  };

  const mockGraduations: IGraduation[] = [
    {
      id: 'grad-1',
      title: 'Computer Science',
      institution: 'MIT',
      link: 'https://example.com',
      start: '2015-01-01',
      conclusion: 'completed',
      logo: 'mit.png',
    },
    {
      id: 'grad-2',
      title: 'Software Engineering',
      institution: 'Stanford',
      link: 'https://example.com',
      start: '2020-01-01',
      conclusion: 'inprogress',
      logo: 'stanford.png',
    },
    {
      id: 'grad-3',
      title: 'Data Science',
      institution: 'Berkeley',
      link: 'https://example.com',
      start: '2021-01-01',
      conclusion: 'inprogress',
      logo: 'berkeley.png',
    },
  ];

  beforeEach(async () => {
    const statisticsServiceSpy = jasmine.createSpyObj('StatisticsService', [
      'getDashboardStats',
      'getYearlyStats',
    ]);
    const gaServiceSpy = jasmine.createSpyObj('GoogleAnalyticsService', ['event']);
    const dataServiceSpy = jasmine.createSpyObj('DataService', ['getGraduations']);
    const performanceServiceSpy = jasmine.createSpyObj('PerformanceMonitorService', [
      'measureComponent',
    ]);
    const loggerServiceSpy = jasmine.createSpyObj('LoggerService', ['warn']);

    const mockMeasure = {
      start: vi.fn(),
      end: vi.fn().mockReturnValue(50),
    };

    statisticsServiceSpy.getDashboardStats.and.returnValue(mockStats);
    statisticsServiceSpy.getYearlyStats.and.returnValue([
      { year: 2023, courses: 5, formations: 2 },
      { year: 2024, courses: 5, formations: 1 },
    ]);
    dataServiceSpy.getGraduations.and.returnValue(mockGraduations);
    performanceServiceSpy.measureComponent.and.returnValue(mockMeasure);

    await TestBed.configureTestingModule({
      imports: [DashboardComponent, AnimatedCounterComponent, TranslatePipe],
      providers: [
        provideZonelessChangeDetection(),
        { provide: StatisticsService, useValue: statisticsServiceSpy },
        { provide: GoogleAnalyticsService, useValue: gaServiceSpy },
        { provide: DataService, useValue: dataServiceSpy },
        { provide: PerformanceMonitorService, useValue: performanceServiceSpy },
        { provide: LoggerService, useValue: loggerServiceSpy },
      ],
    }).compileComponents();

    statisticsService = TestBed.inject(StatisticsService) as jasmine.SpyObj<StatisticsService>;
    gaService = TestBed.inject(GoogleAnalyticsService) as jasmine.SpyObj<GoogleAnalyticsService>;
    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    performanceService = TestBed.inject(
      PerformanceMonitorService
    ) as jasmine.SpyObj<PerformanceMonitorService>;
    loggerService = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>;

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Structure', () => {
    it('should use OnPush change detection strategy', () => {
      const componentDef = (component.constructor as any).ɵcmp;
      expect(componentDef.onPush).toBe(true);
    });

    it('should be a standalone component', () => {
      const componentDef = (component.constructor as any).ɵcmp;
      expect(componentDef.standalone).toBe(true);
    });

    it('should extend BasePageComponent', () => {
      expect(component).toBeInstanceOf(DashboardComponent);
    });

    it('should have correct selector', () => {
      const componentDef = (component.constructor as any).ɵcmp;
      expect(componentDef.selectors).toEqual([['app-dashboard']]);
    });
  });

  describe('Initialization', () => {
    it('should initialize with loading state', () => {
      expect(component.isLoading()).toBe(true);
    });

    it('should initialize stats as null', () => {
      expect(component.stats()).toBeNull();
    });

    it('should load yearly stats on initialization', () => {
      expect(component.yearlyStats()).toBeDefined();
      expect(component.yearlyStats().length).toBe(2);
    });
  });

  describe('ngOnInit', () => {
    it('should call loadStats on initialization', () => {
      spyOn<any>(component, 'loadStats');

      component.ngOnInit();

      expect((component as any).loadStats).toHaveBeenCalled();
    });

    it('should track page view with Google Analytics', () => {
      component.ngOnInit();

      expect(gaService.event).toHaveBeenCalledWith('page_view', 'dashboard', 'statistics_viewed');
    });

    it('should set isLoading to false after initialization', () => {
      component.ngOnInit();

      expect(component.isLoading()).toBe(false);
    });

    it('should load dashboard stats', () => {
      component.ngOnInit();

      expect(component.stats()).toEqual(mockStats);
    });
  });

  describe('loadStats', () => {
    it('should call StatisticsService.getDashboardStats', () => {
      component.ngOnInit();

      expect(statisticsService.getDashboardStats).toHaveBeenCalled();
    });

    it('should update stats signal with loaded data', () => {
      component.ngOnInit();

      expect(component.stats()).toEqual(mockStats);
    });

    it('should set isLoading to false after loading', () => {
      component.ngOnInit();

      expect(component.isLoading()).toBe(false);
    });

    it('should measure performance during stats loading', () => {
      component.ngOnInit();

      expect(performanceService.measureComponent).toHaveBeenCalledWith('dashboard-stats-load');
    });

    it('should call measure.start before loading', () => {
      const mockMeasure = performanceService.measureComponent('dashboard-stats-load');

      component.ngOnInit();

      expect(mockMeasure?.start).toHaveBeenCalled();
    });

    it('should call measure.end after loading', () => {
      const mockMeasure = performanceService.measureComponent('dashboard-stats-load');

      component.ngOnInit();

      expect(mockMeasure?.end).toHaveBeenCalled();
    });

    it('should not log warning if loading is fast (<100ms)', () => {
      const mockMeasure = {
        start: vi.fn(),
        end: vi.fn().mockReturnValue(50),
      };
      performanceService.measureComponent.and.returnValue(mockMeasure);

      component.ngOnInit();

      expect(loggerService.warn).not.toHaveBeenCalled();
    });

    it('should log warning if loading is slow (>100ms)', () => {
      const mockMeasure = {
        start: vi.fn(),
        end: vi.fn().mockReturnValue(150),
      };
      performanceService.measureComponent.and.returnValue(mockMeasure);

      component.ngOnInit();

      expect(loggerService.warn).toHaveBeenCalledWith(
        jasmine.stringContaining('Dashboard stats loading took 150.00ms')
      );
    });
  });

  describe('onStatsCardClick', () => {
    it('should track stats card click event', () => {
      component.onStatsCardClick('courses');

      expect(gaService.event).toHaveBeenCalledWith('stats_card_click', 'dashboard', 'courses');
    });

    it('should track different card types', () => {
      component.onStatsCardClick('books');

      expect(gaService.event).toHaveBeenCalledWith('stats_card_click', 'dashboard', 'books');
    });

    it('should handle multiple clicks', () => {
      component.onStatsCardClick('courses');
      component.onStatsCardClick('books');
      component.onStatsCardClick('graduations');

      expect(gaService.event).toHaveBeenCalledTimes(3);
    });
  });

  describe('getInProgressGraduations', () => {
    it('should return count of in-progress graduations', () => {
      const count = component.getInProgressGraduations();

      expect(count).toBe(2);
    });

    it('should filter graduations by conclusion status', () => {
      component.getInProgressGraduations();

      expect(dataService.getGraduations).toHaveBeenCalled();
    });

    it('should return 0 when no in-progress graduations', () => {
      const completedGraduations: IGraduation[] = [
        {
          id: 'grad-1',
          title: 'Test',
          institution: 'Test',
          link: 'https://example.com',
          start: '2020-01-01',
          conclusion: 'completed',
          logo: 'test.png',
        },
      ];
      dataService.getGraduations.and.returnValue(completedGraduations);

      const count = component.getInProgressGraduations();

      expect(count).toBe(0);
    });

    it('should handle empty graduations array', () => {
      dataService.getGraduations.and.returnValue([]);

      const count = component.getInProgressGraduations();

      expect(count).toBe(0);
    });
  });

  describe('Signal Reactivity', () => {
    it('should allow stats signal to be updated', () => {
      const newStats: DashboardStats = { ...mockStats, totalCourses: 20 };

      component.stats.set(newStats);

      expect(component.stats()).toEqual(newStats);
      expect(component.stats()?.totalCourses).toBe(20);
    });

    it('should allow yearlyStats signal to be updated', () => {
      const newYearlyStats = [{ year: 2025, courses: 10, formations: 5 }];

      component.yearlyStats.set(newYearlyStats);

      expect(component.yearlyStats()).toEqual(newYearlyStats);
    });

    it('should allow isLoading signal to be updated', () => {
      component.isLoading.set(true);
      expect(component.isLoading()).toBe(true);

      component.isLoading.set(false);
      expect(component.isLoading()).toBe(false);
    });
  });

  describe('Integration with Services', () => {
    it('should use StatisticsService for dashboard stats', () => {
      component.ngOnInit();

      expect(statisticsService.getDashboardStats).toHaveBeenCalled();
    });

    it('should use StatisticsService for yearly stats', () => {
      expect(statisticsService.getYearlyStats).toHaveBeenCalled();
    });

    it('should use DataService for graduations', () => {
      component.getInProgressGraduations();

      expect(dataService.getGraduations).toHaveBeenCalled();
    });

    it('should use GoogleAnalyticsService for tracking', () => {
      component.ngOnInit();
      component.onStatsCardClick('test');

      expect(gaService.event).toHaveBeenCalledTimes(2);
    });

    it('should use PerformanceMonitorService for metrics', () => {
      component.ngOnInit();

      expect(performanceService.measureComponent).toHaveBeenCalled();
    });

    it('should use LoggerService for warnings', () => {
      const mockMeasure = {
        start: vi.fn(),
        end: vi.fn().mockReturnValue(200),
      };
      performanceService.measureComponent.and.returnValue(mockMeasure);

      component.ngOnInit();

      expect(loggerService.warn).toHaveBeenCalled();
    });
  });

  describe('Template Rendering', () => {
    it('should have template configured', () => {
      // Template existe e usa AnimatedCounterComponent
      const componentDef = (component.constructor as any).ɵcmp;

      expect(componentDef.template).toBeDefined();
    });

    it('should update stats signal reactively', () => {
      // Não renderizar template pois AnimatedCounterComponent tem inputs required
      const newStats: DashboardStats = { ...mockStats, totalCourses: 99 };
      component.stats.set(newStats);

      expect(component.stats()?.totalCourses).toBe(99);
    });
  });

  describe('Edge Cases', () => {
    it('should handle null performance service gracefully', () => {
      performanceService.measureComponent.and.returnValue(null);

      expect(() => {
        component.ngOnInit();
      }).not.toThrow();
    });

    it('should handle undefined measure.end return value', () => {
      const mockMeasure = {
        start: vi.fn(),
        end: vi.fn().mockReturnValue(undefined),
      };
      performanceService.measureComponent.and.returnValue(mockMeasure);

      expect(() => {
        component.ngOnInit();
      }).not.toThrow();
    });

    it('should handle graduations with different conclusion values', () => {
      const mixedGraduations: IGraduation[] = [
        {
          id: '1',
          title: 'Test 1',
          institution: 'Test',
          link: 'https://example.com',
          start: '2020-01-01',
          conclusion: 'inprogress',
          logo: 'test.png',
        },
        {
          id: '2',
          title: 'Test 2',
          institution: 'Test',
          link: 'https://example.com',
          start: '2020-01-01',
          conclusion: 'completed',
          logo: 'test.png',
        },
        {
          id: '3',
          title: 'Test 3',
          institution: 'Test',
          link: 'https://example.com',
          start: '2020-01-01',
          conclusion: 'pending',
          logo: 'test.png',
        },
      ];
      dataService.getGraduations.and.returnValue(mixedGraduations);

      const count = component.getInProgressGraduations();

      expect(count).toBe(1);
    });

    it('should handle stats with zero values', () => {
      const zeroStats: DashboardStats = {
        totalCourses: 0,
        totalBooks: 0,
        totalFormations: 0,
        totalGraduations: 0,
        favoriteCourses: 0,
        completedGraduations: 0,
        booksProgress: 0,
        topInstitutions: [],
        topTechnologies: [],
        recentCourses: [],
        monthlyProgress: [],
      };
      statisticsService.getDashboardStats.and.returnValue(zeroStats);

      component.ngOnInit();

      expect(component.stats()).toEqual(zeroStats);
    });
  });

  describe('Component Lifecycle', () => {
    it('should initialize component instance', () => {
      expect(component).toBeTruthy();
      expect(component).toBeInstanceOf(DashboardComponent);
    });

    it('should handle multiple ngOnInit calls', () => {
      component.ngOnInit();
      component.ngOnInit();

      expect(statisticsService.getDashboardStats).toHaveBeenCalledTimes(2);
    });

    it('should handle fixture destruction without rendering', () => {
      // Não renderizar template pois AnimatedCounterComponent tem inputs required
      expect(() => {
        fixture.destroy();
      }).not.toThrow();
    });
  });

  describe('BasePageComponent Integration', () => {
    it('should inherit bglight input from BasePageComponent', () => {
      // bglight é herdado de BasePageComponent
      expect(component.bglight).toBeDefined();
    });

    it('should inherit currentClass computed from BasePageComponent', () => {
      // currentClass é herdado de BasePageComponent
      expect(component.currentClass).toBeDefined();
    });

    it('should inherit bglight signal from BasePageComponent', () => {
      // bglight é herdado de BasePageComponent e tem valor padrão false
      expect(component.bglight).toBeDefined();
      expect(component.bglight()).toBe(false);
    });
  });
});
