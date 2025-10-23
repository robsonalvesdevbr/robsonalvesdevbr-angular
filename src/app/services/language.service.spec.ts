import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { LanguageService, Language, TranslationKeys } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;
  let httpMock: HttpTestingController;

  const mockPtBR: TranslationKeys = {
    common: { hello: 'Olá' },
    navigation: { about: 'Sobre' }
  };

  const mockEnUS: TranslationKeys = {
    common: { hello: 'Hello' },
    navigation: { about: 'About' }
  };

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LanguageService, provideZonelessChangeDetection()]
    });

    service = TestBed.inject(LanguageService);
    httpMock = TestBed.inject(HttpTestingController);

    // Helper to flush both translation requests
    const flushTranslations = () => {
      const initialReqs = httpMock.match(req => req.url.includes('/assets/i18n/'));
      expect(initialReqs.length).toBe(2);
      for (const req of initialReqs) {
        if (req.request.url.endsWith('pt-BR.json')) {
          req.flush(mockPtBR);
        } else if (req.request.url.endsWith('en-US.json')) {
          req.flush(mockEnUS);
        }
      }
    };

    flushTranslations();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default to PT-BR language', () => {
    expect(service.currentLanguage()).toBe('pt-BR');
  });

  it('should load translations on init', () => {
    // Translations should be loaded (already verified in beforeEach)
    expect(service.translate('common.hello')).toBe('Olá');
  });

  it('should change language to EN-US', () => {
    service.setLanguage('en-US');
    expect(service.currentLanguage()).toBe('en-US');
    expect(service.translate('common.hello')).toBe('Hello');
  });

  it('should toggle language from PT-BR to EN-US', () => {
    expect(service.currentLanguage()).toBe('pt-BR');
    service.toggleLanguage();
    expect(service.currentLanguage()).toBe('en-US');
  });

  it('should toggle language from EN-US to PT-BR', () => {
    service.setLanguage('en-US');
    service.toggleLanguage();
    expect(service.currentLanguage()).toBe('pt-BR');
  });

  it('should persist language to localStorage', () => {
    service.setLanguage('en-US');
    expect(localStorage.getItem('app-language')).toBe('en-US');
  });

  it('should update document lang attribute', () => {
    service.setLanguage('en-US');
    expect(document.documentElement.lang).toBe('en-US');
  });

  it('should return key when translation is missing', () => {
    const result = service.translate('non.existent.key');
    expect(result).toBe('non.existent.key');
  });

  it('should handle nested translation keys', () => {
    const result = service.translate('navigation.about');
    expect(result).toBe('Sobre');
  });

  it('should interpolate parameters', () => {
    // Reset and create a fresh testing module for this scenario
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LanguageService, provideZonelessChangeDetection()]
    });
    const freshService = TestBed.inject(LanguageService);
    const freshHttpMock = TestBed.inject(HttpTestingController);
    const reqs = freshHttpMock.match(req => req.url.includes('/assets/i18n/'));
    expect(reqs.length).toBe(2);
    for (const req of reqs) {
      if (req.request.url.endsWith('pt-BR.json')) {
        req.flush({ greeting: 'Olá, {{name}}!' });
      } else if (req.request.url.endsWith('en-US.json')) {
        req.flush({});
      }
    }
    const result = freshService.translate('greeting', { name: 'Robson' });
    expect(result).toBe('Olá, Robson!');
  });

  it('should not change language for invalid language code', () => {
    const initialLang = service.currentLanguage();
    service.setLanguage('invalid' as Language);
    expect(service.currentLanguage()).toBe(initialLang);
  });

  it('should load language from localStorage on init', () => {
    localStorage.setItem('app-language', 'en-US');

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LanguageService, provideZonelessChangeDetection()]
    });
    const svc = TestBed.inject(LanguageService);
    const freshHttp = TestBed.inject(HttpTestingController);
    const initReqs = freshHttp.match(req => req.url.includes('/assets/i18n/'));
    expect(initReqs.length).toBe(2);
    for (const req of initReqs) {
      if (req.request.url.endsWith('pt-BR.json')) {
        req.flush(mockPtBR);
      } else if (req.request.url.endsWith('en-US.json')) {
        req.flush(mockEnUS);
      }
    }
    expect(svc.currentLanguage()).toBe('en-US');
  });

  it('should handle HTTP errors gracefully', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LanguageService, provideZonelessChangeDetection()]
    });
    const errSvc = TestBed.inject(LanguageService);
    const freshHttp = TestBed.inject(HttpTestingController);
    const errReqs = freshHttp.match(req => req.url.includes('/assets/i18n/'));
    expect(errReqs.length).toBe(2);
    for (const req of errReqs) {
      req.error(new ErrorEvent('Network error'));
    }
    expect(errSvc).toBeTruthy();
  });
});
