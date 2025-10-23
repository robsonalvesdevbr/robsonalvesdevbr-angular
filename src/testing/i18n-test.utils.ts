import { HttpTestingController } from '@angular/common/http/testing';

export type I18nMap = Record<string, unknown>;

export function flushI18n(httpMock: HttpTestingController, ptBR: I18nMap, enUS: I18nMap = {}): void {
  const reqs = httpMock.match(req => req.url.endsWith('/assets/i18n/pt-BR.json') || req.url.endsWith('/assets/i18n/en-US.json') || req.url.includes('/assets/i18n/'));
  if (reqs.length === 0) return;

  for (const req of reqs) {
    if (req.request.url.endsWith('pt-BR.json')) {
      req.flush(ptBR);
    } else if (req.request.url.endsWith('en-US.json')) {
      req.flush(enUS);
    } else if (req.request.url.includes('/assets/i18n/')) {
      // Fallback: decide by heuristic if needed
      if (req.request.url.toLowerCase().includes('pt-br')) {
        req.flush(ptBR);
      } else {
        req.flush(enUS);
      }
    }
  }
}
