import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideGoogleAnalytics,
  provideGoogleAnalyticsRouter,
} from '@hakimio/ngx-google-analytics';

import { environment } from '@path-environments/environment.development';
import { routes } from './app.routes';
import { provideConfigInitializer } from './initializer/startup';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideConfigInitializer(),
    provideGoogleAnalytics(environment.googleAnalytics),
    provideGoogleAnalyticsRouter(),
  ],
};
