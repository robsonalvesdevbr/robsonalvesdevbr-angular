import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';

import { routes } from './app.routes';
import { provideConfigInitializer } from './initializer/startup';
import { environment } from '../environments/environment';

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
    importProvidersFrom(NgxGoogleAnalyticsModule.forRoot(environment.googleAnalytics, [
      // Single gtag('config') at startup — prevents cookie_domain from being
      // reset on every navigation (NgxGoogleAnalyticsRouterModule was calling
      // gtag('config') on every NavigationEnd, overwriting the session cookie).
      { command: 'config', values: [environment.googleAnalytics, { cookie_domain: '.robsonalves.dev.br', cookie_flags: 'SameSite=None;Secure' }] },
    ])),
  ],
};
