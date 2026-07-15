import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { PerformanceMonitorService } from './performance-monitor.service';
import { LoggerService } from './logger.service';

describe('PerformanceMonitorService', () => {
  let service: PerformanceMonitorService;
  let logger: jasmine.SpyObj<LoggerService>;

  beforeEach(() => {
    const loggerSpy = jasmine.createSpyObj('LoggerService', ['log', 'warn', 'error', 'group', 'groupEnd']);

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        PerformanceMonitorService,
        { provide: LoggerService, useValue: loggerSpy },
      ],
    });

    service = TestBed.inject(PerformanceMonitorService);
    logger = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>;
  });

  afterEach(() => {
    service.destroy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should record a custom metric', () => {
    service.recordCustomMetric('my-metric', 42);
    const metrics = service.getMetrics('custom');
    expect(metrics.some((m) => m.name === 'my-metric' && m.value === 42)).toBe(true);
  });

  it('should default custom metric category to custom', () => {
    service.recordCustomMetric('another-metric', 10);
    const metrics = service.getMetrics();
    expect(metrics.find((m) => m.name === 'another-metric')?.category).toBe('custom');
  });

  it('should measure a component lifecycle', () => {
    const measure = service.measureComponent('MyComponent');
    measure.start();
    const duration = measure.end();

    expect(typeof duration).toBe('number');
    expect(service.getMetrics().some((m) => m.name === 'component-MyComponent')).toBe(true);
  });

  it('should filter metrics by category', () => {
    service.recordCustomMetric('timing-metric', 1, 'timing');
    service.recordCustomMetric('network-metric', 2, 'network');

    expect(service.getMetrics('timing').every((m) => m.category === 'timing')).toBe(true);
    expect(service.getMetrics('network').every((m) => m.category === 'network')).toBe(true);
  });

  it('should summarize metrics with avg, min, max and count', () => {
    service.recordCustomMetric('summary-metric', 10);
    service.recordCustomMetric('summary-metric', 20);
    service.recordCustomMetric('summary-metric', 30);

    const summary = service.getMetricsSummary();
    expect(summary['summary-metric']).toEqual({ avg: 20, min: 10, max: 30, count: 3 });
  });

  it('should clear all metrics', () => {
    service.recordCustomMetric('to-be-cleared', 1);
    service.clearMetrics();
    expect(service.getMetrics()).toEqual([]);
  });

  it('should log a performance report without throwing', () => {
    service.recordCustomMetric('report-metric', 5);
    service.logPerformanceReport();

    expect(logger.group).toHaveBeenCalled();
    expect(logger.log).toHaveBeenCalled();
    expect(logger.groupEnd).toHaveBeenCalled();
  });

  it('should start and stop monitoring without throwing', () => {
    expect(() => {
      service.startMonitoring();
      service.stopMonitoring();
    }).not.toThrow();
  });

  it('should not start monitoring twice', () => {
    service.startMonitoring();
    const metricsAfterFirstStart = service.getMetrics().length;
    service.startMonitoring();
    expect(service.getMetrics().length).toBe(metricsAfterFirstStart);
  });

  it('should be safe to destroy multiple times', () => {
    expect(() => {
      service.destroy();
      service.destroy();
    }).not.toThrow();
  });
});
