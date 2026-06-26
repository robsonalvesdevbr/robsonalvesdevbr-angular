import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';

import { routes } from './app.routes';
import { provideConfigInitializer } from './initializer/startup';
import { environment } from '../environments/environment';

const debugMode = typeof window !== 'undefined' &&
  new URLSearchParams(window.location.search).has('debug_mode');

// Only track on the canonical production hostnames.
// The production build is also deployed to Azure preview environments
// (*.azurestaticapps.net) and those hits would otherwise appear as
// real users in GA from US data centers.
const isProductionHost = typeof window !== 'undefined' && (
  window.location.hostname === 'robsonalves.dev.br' ||
  window.location.hostname === 'www.robsonalves.dev.br'
);

// Disable GA when running inside an automated browser (Playwright, Selenium, bots).
const isAutomatedBrowser = typeof navigator !== 'undefined' && navigator.webdriver;

const gaId = (isProductionHost && !isAutomatedBrowser) ? environment.googleAnalytics : '';

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
    provideConfigInitializer(),
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
