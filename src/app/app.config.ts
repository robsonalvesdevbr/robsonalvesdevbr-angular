import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';

import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { resolveAnalyticsConfig } from '@path-utils/analytics-config.utils';

const { gaId, debugMode } = resolveAnalyticsConfig(environment.googleAnalytics);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch()),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      })
    ),
    importProvidersFrom(NgxGoogleAnalyticsModule.forRoot(gaId, [
      // Single gtag('config') at startup — prevents cookie_domain from being
      // reset on every navigation (NgxGoogleAnalyticsRouterModule was calling
      // gtag('config') on every NavigationEnd, overwriting the session cookie).
      { command: 'config', values: [gaId, {
        cookie_domain: '.robsonalves.dev.br',
        cookie_flags: 'SameSite=None;Secure',
        ...(debugMode ? { debug_mode: true } : {}),
      }] },
    ])),
  ],
};
