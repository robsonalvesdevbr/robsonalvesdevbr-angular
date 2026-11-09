import { DOCUMENT, Service, inject } from '@angular/core';

type GtagWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

/**
 * Thin wrapper over the global `gtag()` function. Creates `dataLayer` and
 * `gtag` on first use (same bootstrap as the official snippet), so calls made
 * before gtag.js finishes loading are queued and never throw.
 */
@Service()
export class GtagService {
  private readonly window = inject(DOCUMENT).defaultView as GtagWindow | null;

  gtag(...args: unknown[]): void {
    const fn = this.resolveGtag();
    if (!fn) return;
    try {
      fn(...args.filter((arg) => arg !== undefined));
    } catch {
      // Analytics must never break the app.
    }
  }

  private resolveGtag(): ((...args: unknown[]) => void) | null {
    const win = this.window;
    if (!win) return null;
    const dataLayer = (win.dataLayer ??= []);
    // gtag.js requires the `arguments` object (not an array) in the dataLayer.
    win.gtag ??= function () {
      // eslint-disable-next-line prefer-rest-params
      dataLayer.push(arguments);
    };
    return win.gtag;
  }
}
