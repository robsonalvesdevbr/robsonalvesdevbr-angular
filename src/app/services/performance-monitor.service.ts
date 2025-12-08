import { Injectable, inject } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PerformanceMonitor, scheduleIdleWork } from '../utils/performance.utils';
import { LoggerService } from './logger.service';

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  category: 'timing' | 'memory' | 'network' | 'custom';
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceMonitorService {
  private readonly logger = inject(LoggerService);
  private metrics: PerformanceMetric[] = [];
  private observer?: PerformanceObserver;
  private isMonitoring = false;
  private readonly destroy$ = new Subject<void>();

  startMonitoring(): void {
    if (this.isMonitoring || typeof window === 'undefined') return;

    this.isMonitoring = true;
    this.initializePerformanceObserver();
    this.trackCoreWebVitals();
    this.trackMemoryUsage();
  }

  private initializePerformanceObserver(): void {
    if ('PerformanceObserver' in window) {
      this.observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.addMetric({
            name: entry.name,
            value: entry.duration || entry.startTime,
            timestamp: Date.now(),
            category: this.categorizeEntry(entry)
          });
        });
      });

      // Observe various performance entry types
      try {
        this.observer.observe({ entryTypes: ['measure', 'navigation', 'resource', 'paint'] });
      } catch (error) {
        this.logger.warn('Performance Observer not fully supported:', error);
      }
    }
  }

  private categorizeEntry(entry: PerformanceEntry): 'timing' | 'memory' | 'network' | 'custom' {
    if (entry.entryType === 'navigation' || entry.entryType === 'measure') return 'timing';
    if (entry.entryType === 'resource') return 'network';
    if (entry.entryType === 'paint') return 'timing';
    return 'custom';
  }

  private trackCoreWebVitals(): void {
    // Track First Contentful Paint
    this.trackMetric('FCP', () => {
      const paintEntries = performance.getEntriesByType('paint');
      const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      return fcp?.startTime || 0;
    });

    // Track Largest Contentful Paint (requires web-vitals library for production)
    // For now, we'll use a placeholder
    this.trackMetric('LCP', () => {
      return performance.now(); // Placeholder
    });

    // Track Time to Interactive (approximate)
    this.trackMetric('TTI', () => {
      return performance.now(); // Placeholder
    });
  }

  private trackMemoryUsage(): void {
    if ('memory' in performance) {
      const trackMemory = () => {
        const memory = (performance as unknown as { memory: { usedJSHeapSize: number; totalJSHeapSize: number } }).memory;
        const usedMB = memory.usedJSHeapSize / 1024 / 1024;
        const totalMB = memory.totalJSHeapSize / 1024 / 1024;

        // Only track if significant change (>5MB) to reduce noise
        const lastUsedMetric = this.getLastMetric('heap-used');
        const lastUsed = lastUsedMetric?.value || 0;

        if (Math.abs(usedMB - lastUsed) > 5) {
          this.addMetric({
            name: 'heap-used',
            value: usedMB,
            timestamp: Date.now(),
            category: 'memory'
          });

          this.addMetric({
            name: 'heap-total',
            value: totalMB,
            timestamp: Date.now(),
            category: 'memory'
          });
        }
      };

      // Use RxJS interval with scheduleIdleWork for better performance
      interval(60000) // Every minute
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          scheduleIdleWork(trackMemory, 5000);
        });
    }
  }

  private trackMetric(name: string, getValue: () => number): void {
    try {
      const value = getValue();
      this.addMetric({
        name,
        value,
        timestamp: Date.now(),
        category: 'timing'
      });
    } catch (error) {
      this.logger.warn(`Failed to track metric ${name}:`, error);
    }
  }

  private addMetric(metric: PerformanceMetric): void {
    this.metrics.push(metric);

    // Keep only last 1000 metrics to avoid memory leaks
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-500);
    }
  }

  private getLastMetric(name: string): PerformanceMetric | undefined {
    for (let i = this.metrics.length - 1; i >= 0; i--) {
      if (this.metrics[i].name === name) {
        return this.metrics[i];
      }
    }
    return undefined;
  }

  // Public API methods
  measureComponent(componentName: string): { start: () => void; end: () => number } {
    return {
      start: () => PerformanceMonitor.startMeasure(componentName),
      end: () => {
        const duration = PerformanceMonitor.endMeasure(componentName);
        this.addMetric({
          name: `component-${componentName}`,
          value: duration,
          timestamp: Date.now(),
          category: 'timing'
        });
        return duration;
      }
    };
  }

  recordCustomMetric(name: string, value: number, category: 'timing' | 'memory' | 'network' | 'custom' = 'custom'): void {
    this.addMetric({ name, value, timestamp: Date.now(), category });
  }

  getMetrics(category?: 'timing' | 'memory' | 'network' | 'custom'): PerformanceMetric[] {
    if (!category) return [...this.metrics];
    return this.metrics.filter(metric => metric.category === category);
  }

  getMetricsSummary(): { [key: string]: { avg: number; min: number; max: number; count: number } } {
    const summary: { [key: string]: { avg: number; min: number; max: number; count: number } } = {};

    const grouped = this.metrics.reduce((acc, metric) => {
      if (!acc[metric.name]) acc[metric.name] = [];
      acc[metric.name].push(metric.value);
      return acc;
    }, {} as { [key: string]: number[] });

    Object.entries(grouped).forEach(([name, values]) => {
      summary[name] = {
        avg: values.reduce((sum, val) => sum + val, 0) / values.length,
        min: Math.min(...values),
        max: Math.max(...values),
        count: values.length
      };
    });

    return summary;
  }

  clearMetrics(): void {
    this.metrics = [];
    PerformanceMonitor.clearMeasurements();
  }

  logPerformanceReport(): void {
    const summary = this.getMetricsSummary();
    this.logger.group('🚀 Performance Report');

    Object.entries(summary).forEach(([name, stats]) => {
      this.logger.log(`📊 ${name}:`, {
        average: `${stats.avg.toFixed(2)}ms`,
        min: `${stats.min.toFixed(2)}ms`,
        max: `${stats.max.toFixed(2)}ms`,
        samples: stats.count
      });
    });

    // Memory usage
    const memoryMetrics = this.getMetrics('memory');
    if (memoryMetrics.length > 0) {
      const latestMemory = memoryMetrics[memoryMetrics.length - 1];
      this.logger.log('💾 Memory Usage:', `${latestMemory.value.toFixed(2)} MB`);
    }

    this.logger.groupEnd();
  }

  stopMonitoring(): void {
    this.isMonitoring = false;
    this.observer?.disconnect();
    this.destroy$.next();
  }

  destroy(): void {
    this.stopMonitoring();
    this.clearMetrics();
    this.destroy$.complete();
  }
}
