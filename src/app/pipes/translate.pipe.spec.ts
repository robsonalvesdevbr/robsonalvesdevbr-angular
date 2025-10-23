import { TestBed } from '@angular/core/testing';
import { TranslatePipe } from './translate.pipe';
import { LanguageService } from '@path-services/language.service';
import { provideZonelessChangeDetection, signal } from '@angular/core';

describe('TranslatePipe', () => {
  let pipe: TranslatePipe;
  let mockLanguageService: jasmine.SpyObj<LanguageService>;

  beforeEach(() => {
    // Create mock LanguageService
    const spy = jasmine.createSpyObj('LanguageService', ['translate'], {
      currentLanguage: signal('pt-BR')
    });

    TestBed.configureTestingModule({
      providers: [
        TranslatePipe,
        { provide: LanguageService, useValue: spy },
        provideZonelessChangeDetection()
      ]
    });

    pipe = TestBed.inject(TranslatePipe);
    mockLanguageService = TestBed.inject(LanguageService) as jasmine.SpyObj<LanguageService>;
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should call languageService.translate with key', () => {
    mockLanguageService.translate.and.returnValue('Translated Text');

    const result = pipe.transform('test.key');

    expect(mockLanguageService.translate).toHaveBeenCalledWith('test.key', undefined);
    expect(result).toBe('Translated Text');
  });

  it('should call languageService.translate with key and params', () => {
    const params = { name: 'Test' };
    mockLanguageService.translate.and.returnValue('Hello, Test!');

    const result = pipe.transform('greeting', params);

    expect(mockLanguageService.translate).toHaveBeenCalledWith('greeting', params);
    expect(result).toBe('Hello, Test!');
  });

  it('should return key when translation is missing', () => {
    mockLanguageService.translate.and.returnValue('missing.key');

    const result = pipe.transform('missing.key');

    expect(result).toBe('missing.key');
  });

  it('should handle empty key', () => {
    mockLanguageService.translate.and.returnValue('');

    const result = pipe.transform('');

    expect(mockLanguageService.translate).toHaveBeenCalledWith('', undefined);
    expect(result).toBe('');
  });

  it('should handle nested keys', () => {
    mockLanguageService.translate.and.returnValue('About');

    const result = pipe.transform('navigation.about');

    expect(mockLanguageService.translate).toHaveBeenCalledWith('navigation.about', undefined);
    expect(result).toBe('About');
  });

  it('should pass multiple parameters', () => {
    const params = { name: 'Robson', count: '10' };
    mockLanguageService.translate.and.returnValue('Hello Robson, you have 10 messages');

    const result = pipe.transform('message', params);

    expect(mockLanguageService.translate).toHaveBeenCalledWith('message', params);
    expect(result).toBe('Hello Robson, you have 10 messages');
  });
});
