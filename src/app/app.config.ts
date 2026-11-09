import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { resolveAnalyticsConfig } from '@path-utils/analytics-config.utils';
import { provideGoogleAnalytics } from '@path-utils/google-analytics.provider';

const { gaId, debugMode } = resolveAnalyticsConfig(environment.googleAnalytics);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      })
    ),
    // Single gtag('config') at startup — never on NavigationEnd, which would
    // reset the cookie_domain/session cookie on every navigation.
    provideGoogleAnalytics(gaId, {
      config: {
        cookie_domain: '.robsonalves.dev.br',
        cookie_flags: 'SameSite=None;Secure',
        ...(debugMode ? { debug_mode: true } : {}),
      },
    }),
  ],
};
