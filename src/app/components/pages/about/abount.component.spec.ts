import { TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { LanguageService } from '@path-services/language.service';
import { flushI18n } from '@path-app/../testing/i18n-test.utils';

describe('AbountComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
      providers: [provideZonelessChangeDetection(), provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();
  });

  it('should create the AboutComponent', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    const httpMock = TestBed.inject(HttpTestingController);
    flushI18n(httpMock, {
      about: { title: 'Sobre', subtitle: ' Conheça minha trajetória profissional de 23+ anos ' }
    }, {
      about: { title: 'About', subtitle: ' Learn about my 23+ year professional journey ' }
    });
    const lang = TestBed.inject(LanguageService);
    lang.setLanguage('pt-BR');
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    const httpMock = TestBed.inject(HttpTestingController);
    flushI18n(httpMock, {
      about: { title: 'Sobre', subtitle: ' Conheça minha trajetória profissional de 23+ anos ' }
    }, {
      about: { title: 'About', subtitle: ' Learn about my 23+ year professional journey ' }
    });
    const lang = TestBed.inject(LanguageService);
    lang.setLanguage('pt-BR');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const text = compiled
      .querySelector('div.container div.text-center h3.section-subheading.text-muted')
      ?.textContent?.trim();
    expect(text).toBe('Conheça minha trajetória profissional de 23+ anos');
  });
});
