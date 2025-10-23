// Test setup: silence only i18n-specific console warnings/errors during Karma runs.
// This keeps the test output clean without hiding other important logs.

(function () {
  const originalWarn = console.warn ? console.warn.bind(console) : null;
  const originalError = console.error ? console.error.bind(console) : null;

  /**
   * Detects i18n-related warnings typically emitted by the Translate layer.
   * Examples observed:
   *  - 'Translation missing for key: about.timeline.instructor.imageAlt'
   */
  function isI18nWarn(args) {
    const [first] = args;
    return (
      typeof first === 'string' &&
      (first.startsWith('Translation missing for key:') ||
        // Fallback: any explicit mention of i18n path (conservative)
        first.includes('assets/i18n/'))
    );
  }

  /**
   * Detects i18n-related errors when loading translation JSON files.
   * Examples observed:
   *  - 'Error loading PT-BR translations:'
   *  - 'Error loading EN-US translations:'
   */
  function isI18nError(args) {
    const [first] = args;
    return (
      typeof first === 'string' &&
      first.startsWith('Error loading ') &&
      first.includes(' translations:')
    );
  }

  if (originalWarn) {
    console.warn = function (...args) {
      if (isI18nWarn(args)) {
        return; // swallow i18n warnings
      }
      return originalWarn(...args);
    };
  }

  if (originalError) {
    console.error = function (...args) {
      if (isI18nError(args)) {
        return; // swallow i18n translation loading errors in tests
      }
      return originalError(...args);
    };
  }
})();
