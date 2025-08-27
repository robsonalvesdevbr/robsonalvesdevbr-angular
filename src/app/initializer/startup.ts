import { provideAppInitializer } from '@angular/core';

export function provideConfigInitializer() {
  return provideAppInitializer(() => {
    return Promise.resolve();
  });
}
