export interface AnalyticsConfig {
  gaId: string;
  debugMode: boolean;
}

// Only track on the canonical production hostnames.
// The production build is also deployed to Azure preview environments
// (*.azurestaticapps.net) and those hits would otherwise appear as
// real users in GA from US data centers.
const PRODUCTION_HOSTNAMES = new Set(['robsonalves.dev.br', 'www.robsonalves.dev.br']);

export function resolveAnalyticsConfig(googleAnalyticsId: string): AnalyticsConfig {
  const debugMode =
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('debug_mode');

  const isProductionHost = typeof window !== 'undefined' && PRODUCTION_HOSTNAMES.has(window.location.hostname);

  // Disable GA when running inside an automated browser (Playwright, Selenium, bots).
  const isAutomatedBrowser = typeof navigator !== 'undefined' && navigator.webdriver;

  const gaId = isProductionHost && !isAutomatedBrowser ? googleAnalyticsId : '';

  return { gaId, debugMode };
}
