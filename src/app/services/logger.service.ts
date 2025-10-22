import { Injectable, isDevMode } from '@angular/core';

/**
 * Logger service that only logs in development mode
 * This prevents console pollution in production and potential information leakage
 */
@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  /**
   * Log a message to the console (development only)
   */
  log(message: string, ...optionalParams: unknown[]): void {
    if (isDevMode()) {
      console.log(message, ...optionalParams);
    }
  }

  /**
   * Log a warning to the console (development only)
   */
  warn(message: string, ...optionalParams: unknown[]): void {
    if (isDevMode()) {
      console.warn(message, ...optionalParams);
    }
  }

  /**
   * Log an error to the console (development only)
   */
  error(message: string, ...optionalParams: unknown[]): void {
    if (isDevMode()) {
      console.error(message, ...optionalParams);
    }
  }

  /**
   * Log debug information to the console (development only)
   */
  debug(message: string, ...optionalParams: unknown[]): void {
    if (isDevMode()) {
      console.debug(message, ...optionalParams);
    }
  }

  /**
   * Log grouped information to the console (development only)
   */
  group(label: string): void {
    if (isDevMode()) {
      console.group(label);
    }
  }

  /**
   * End a console group (development only)
   */
  groupEnd(): void {
    if (isDevMode()) {
      console.groupEnd();
    }
  }

  /**
   * Log a table to the console (development only)
   */
  table(data: Record<string, unknown>[] | Record<string, unknown>): void {
    if (isDevMode()) {
      console.table(data);
    }
  }
}
