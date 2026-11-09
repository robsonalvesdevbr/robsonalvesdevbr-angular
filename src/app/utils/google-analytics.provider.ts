import { DOCUMENT, EnvironmentProviders, inject, provideAppInitializer } from '@angular/core';
import { GtagService } from '@path-services/gtag.service';

export interface GoogleAnalyticsOptions {
  /** Extra parameters for the single `gtag('config')` call (e.g. `cookie_domain`). */
  config?: Record<string, unknown>;
}

/**
 * Loads gtag.js and runs `gtag('config')` once at startup. Does nothing when
 * `measurementId` is empty (non-production hosts, automated browsers).
 */
export function provideGoogleAnalytics(
  measurementId: string,
  options: GoogleAnalyticsOptions = {},
): EnvironmentProviders {
  return provideAppInitializer(() => {
    if (!measurementId) return;

    const document = inject(DOCUMENT);
    const gtag = inject(GtagService);

    gtag.gtag('js', new Date());
    gtag.gtag('config', measurementId, options.config ?? {});

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);
  });
}
