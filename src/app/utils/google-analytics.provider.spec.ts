import { ApplicationInitStatus, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideGoogleAnalytics } from './google-analytics.provider';

type GtagWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

describe('provideGoogleAnalytics', () => {
  const win = window as GtagWindow;
  const gtagScripts = () => document.head.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]');

  beforeEach(() => {
    delete win.dataLayer;
    delete win.gtag;
    gtagScripts().forEach((s) => s.remove());
  });

  async function init(id: string, config?: Record<string, unknown>): Promise<void> {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideGoogleAnalytics(id, { config })],
    });
    await TestBed.inject(ApplicationInitStatus).donePromise;
  }

  it('does nothing without a measurement id', async () => {
    await init('');

    expect(gtagScripts()).toHaveLength(0);
    expect(win.dataLayer).toBeUndefined();
  });

  it('runs js + a single config and injects gtag.js', async () => {
    await init('G-TEST', { cookie_domain: 'x.dev' });

    const commands = (win.dataLayer ?? []).map((a) => Array.from(a as ArrayLike<unknown>));
    expect(commands.map((c) => c[0])).toEqual(['js', 'config']);
    expect(commands[1]).toEqual(['config', 'G-TEST', { cookie_domain: 'x.dev' }]);
    expect(gtagScripts()).toHaveLength(1);
    expect((gtagScripts()[0] as HTMLScriptElement).src).toContain('id=G-TEST');
  });
});
