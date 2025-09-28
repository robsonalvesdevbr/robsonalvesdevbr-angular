import { Injectable } from '@angular/core';
import { PerformanceMonitor } from '../utils/performance.utils';

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
  private metrics: PerformanceMetric[] = [];
  private observer?: PerformanceObserver;
  private isMonitoring = false;

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
        console.warn('Performance Observer not fully supported:', error);
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
      setInterval(() => {
        const memory = (performance as any).memory;
        this.addMetric({
          name: 'heap-used',
          value: memory.usedJSHeapSize / 1024 / 1024, // MB
          timestamp: Date.now(),
          category: 'memory'
        });

        this.addMetric({
          name: 'heap-total',
          value: memory.totalJSHeapSize / 1024 / 1024, // MB
          timestamp: Date.now(),
          category: 'memory'
        });
      }, 30000); // Every 30 seconds
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
      console.warn(`Failed to track metric ${name}:`, error);
    }
  }

  private addMetric(metric: PerformanceMetric): void {
    this.metrics.push(metric);

    // Keep only last 1000 metrics to avoid memory leaks
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-500);
    }
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
    console.group('🚀 Performance Report');

    Object.entries(summary).forEach(([name, stats]) => {
      console.log(`📊 ${name}:`, {
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
      console.log('💾 Memory Usage:', `${latestMemory.value.toFixed(2)} MB`);
    }

    console.groupEnd();
  }

  stopMonitoring(): void {
    this.isMonitoring = false;
    this.observer?.disconnect();
  }

  destroy(): void {
    this.stopMonitoring();
    this.clearMetrics();
  }
}
