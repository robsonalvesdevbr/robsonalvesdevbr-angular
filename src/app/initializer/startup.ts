import { inject, provideAppInitializer } from '@angular/core';
import { ConfigService } from '@path-services/config.service';

// This function will be registered in app.config.ts
export function provideConfigInitializer() {
  // Registers an app initializer transparently
  return provideAppInitializer(() => {
    // Injects the service to retrieve server configurations
    const configService = inject(ConfigService);
    // Performs HTTP request and keeps configurations in memory
    return configService.getData();
  });
}
