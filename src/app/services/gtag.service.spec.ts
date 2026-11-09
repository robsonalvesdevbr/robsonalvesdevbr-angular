import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { GtagService } from './gtag.service';

type GtagWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

describe('GtagService', () => {
  const win = window as GtagWindow;

  beforeEach(() => {
    delete win.dataLayer;
    delete win.gtag;
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] });
  });

  it('creates dataLayer and gtag on first call and queues the arguments object', () => {
    TestBed.inject(GtagService).gtag('event', 'x', { a: 1 });

    expect(typeof win.gtag).toBe('function');
    expect(win.dataLayer).toHaveLength(1);
    expect(Array.from(win.dataLayer![0] as ArrayLike<unknown>)).toEqual(['event', 'x', { a: 1 }]);
  });

  it('drops undefined arguments', () => {
    TestBed.inject(GtagService).gtag('event', undefined, 'y');

    expect(Array.from(win.dataLayer![0] as ArrayLike<unknown>)).toEqual(['event', 'y']);
  });

  it('reuses an existing gtag function', () => {
    const existing = vi.fn();
    win.gtag = existing;

    TestBed.inject(GtagService).gtag('event', 'z');

    expect(existing).toHaveBeenCalledWith('event', 'z');
  });

  it('never throws when gtag fails', () => {
    win.gtag = () => {
      throw new Error('boom');
    };

    expect(() => TestBed.inject(GtagService).gtag('event', 'z')).not.toThrow();
  });
});
