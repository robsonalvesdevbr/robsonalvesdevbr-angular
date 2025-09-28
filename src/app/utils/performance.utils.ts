/**
 * Performance utility functions for optimizing Angular application
 */

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, wait);
    }
  };
}

export class ElementCache {
  private static cache = new Map<string, HTMLElement>();
  private static observer?: MutationObserver;

  static get(id: string): HTMLElement | null {
    if (!this.cache.has(id)) {
      const element = document.getElementById(id);
      if (element) {
        this.cache.set(id, element);
        this.setupMutationObserver();
      }
      return element;
    }
    return this.cache.get(id) || null;
  }

  private static setupMutationObserver(): void {
    if (this.observer) return;

    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.removedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as HTMLElement;
              if (element.id && this.cache.has(element.id)) {
                this.cache.delete(element.id);
              }
            }
          });
        }
      });
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  static clear(): void {
    this.cache.clear();
  }

  static size(): number {
    return this.cache.size;
  }
}

export class PerformanceMonitor {
  private static measurements = new Map<string, number>();

  static startMeasure(name: string): void {
    performance.mark(`${name}-start`);
  }

  static endMeasure(name: string): number {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);

    const measures = performance.getEntriesByName(name);
    const duration = measures[measures.length - 1].duration;

    this.measurements.set(name, duration);
    return duration;
  }

  static getMeasurements(): Map<string, number> {
    return new Map(this.measurements);
  }

  static clearMeasurements(): void {
    this.measurements.clear();
    performance.clearMeasures();
    performance.clearMarks();
  }
}

export function scheduleIdleWork(callback: () => void, timeout = 1000): void {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(callback, { timeout });
  } else {
    setTimeout(callback, 0);
  }
}

export function isReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

export class BatchProcessor<T> {
  private queue: T[] = [];
  private timeout: number | null = null;

  constructor(
    private processor: (items: T[]) => void,
    private batchSize = 10,
    private delay = 100
  ) {}

  add(item: T): void {
    this.queue.push(item);

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    if (this.queue.length >= this.batchSize) {
      this.flush();
    } else {
      this.timeout = window.setTimeout(() => {
        this.flush();
      }, this.delay);
    }
  }

  flush(): void {
    if (this.queue.length === 0) return;

    const items = [...this.queue];
    this.queue = [];

    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }

    this.processor(items);
  }

  destroy(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.flush();
  }
}
