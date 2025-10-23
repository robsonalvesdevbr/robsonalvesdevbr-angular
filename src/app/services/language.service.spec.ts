import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
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
      providers: [LanguageService]
    });

    service = TestBed.inject(LanguageService);
    httpMock = TestBed.inject(HttpTestingController);

    // Flush initial requests
    const reqPtBR = httpMock.expectOne('/assets/i18n/pt-BR.json');
    const reqEnUS = httpMock.expectOne('/assets/i18n/en-US.json');
    reqPtBR.flush(mockPtBR);
    reqEnUS.flush(mockEnUS);
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
    // Add a mock translation with parameters
    const mockTranslations: TranslationKeys = {
      greeting: 'Olá, {{name}}!'
    };

    service.setLanguage('pt-BR');
    const reqPtBR = httpMock.expectOne('/assets/i18n/pt-BR.json');
    reqPtBR.flush(mockTranslations);

    const result = service.translate('greeting', { name: 'Robson' });
    expect(result).toContain('Robson');
  });

  it('should not change language for invalid language code', () => {
    const initialLang = service.currentLanguage();
    service.setLanguage('invalid' as Language);
    expect(service.currentLanguage()).toBe(initialLang);
  });

  it('should load language from localStorage on init', () => {
    localStorage.setItem('app-language', 'en-US');

    // Create new service instance to test initialization
    const newService = new LanguageService(TestBed.inject(HttpClientTestingModule) as any);

    // Flush HTTP requests
    const reqPtBR = httpMock.expectOne('/assets/i18n/pt-BR.json');
    const reqEnUS = httpMock.expectOne('/assets/i18n/en-US.json');
    reqPtBR.flush(mockPtBR);
    reqEnUS.flush(mockEnUS);

    expect(newService.currentLanguage()).toBe('en-US');
  });

  it('should handle HTTP errors gracefully', () => {
    // Create a new service to test error handling
    const errorService = new LanguageService(TestBed.inject(HttpClientTestingModule) as any);

    const reqPtBR = httpMock.expectOne('/assets/i18n/pt-BR.json');
    const reqEnUS = httpMock.expectOne('/assets/i18n/en-US.json');

    // Simulate error
    reqPtBR.error(new ErrorEvent('Network error'));
    reqEnUS.error(new ErrorEvent('Network error'));

    // Service should still be functional
    expect(errorService).toBeTruthy();
  });
});
