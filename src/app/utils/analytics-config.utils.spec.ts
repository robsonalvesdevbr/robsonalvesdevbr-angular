import { resolveAnalyticsConfig } from './analytics-config.utils';

function setBrowser(url: string, webdriver = false): void {
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: new URL(url),
  });
  Object.defineProperty(navigator, 'webdriver', { configurable: true, value: webdriver });
}

describe('resolveAnalyticsConfig', () => {
  const original = window.location;
  afterEach(() => {
    Object.defineProperty(window, 'location', { configurable: true, value: original });
    Object.defineProperty(navigator, 'webdriver', { configurable: true, value: false });
  });

  it.each(['https://robsonalves.dev.br/', 'https://www.robsonalves.dev.br/'])(
    'keeps the GA id on production host %s',
    (url) => {
      setBrowser(url);
      expect(resolveAnalyticsConfig('G-123').gaId).toBe('G-123');
    },
  );

  it('blanks the GA id on preview hosts', () => {
    setBrowser('https://foo.azurestaticapps.net/');
    expect(resolveAnalyticsConfig('G-123').gaId).toBe('');
  });

  it('blanks the GA id for automated browsers even on production', () => {
    setBrowser('https://robsonalves.dev.br/', true);
    expect(resolveAnalyticsConfig('G-123').gaId).toBe('');
  });

  it('enables debugMode only with the debug_mode query param', () => {
    setBrowser('https://robsonalves.dev.br/?debug_mode=1');
    expect(resolveAnalyticsConfig('G-123').debugMode).toBe(true);
    setBrowser('https://robsonalves.dev.br/');
    expect(resolveAnalyticsConfig('G-123').debugMode).toBe(false);
  });
});
