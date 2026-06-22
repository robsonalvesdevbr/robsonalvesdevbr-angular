import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';

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
      // Fix cookie_domain once at startup — prevents www vs non-www conflict.
      // 'auto' lets GA pick the highest-level domain (.robsonalves.dev.br),
      // which works for both www.robsonalves.dev.br and robsonalves.dev.br.
      { command: 'config', values: [environment.googleAnalytics, { cookie_domain: 'robsonalves.dev.br' }] },
    ])),
    importProvidersFrom(NgxGoogleAnalyticsRouterModule.forRoot()),
  ],
};
