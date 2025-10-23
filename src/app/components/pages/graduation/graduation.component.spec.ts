import { TestBed } from '@angular/core/testing';
import { GraduationComponent } from './graduation.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { LanguageService } from '@path-services/language.service';
import { flushI18n } from '@path-app/../testing/i18n-test.utils';

describe('GraduationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraduationComponent, HttpClientTestingModule],
      providers: [provideZonelessChangeDetection(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('should create the CourseComponent', () => {
    const fixture = TestBed.createComponent(GraduationComponent);
    // Flush i18n requests
    const httpMock = TestBed.inject(HttpTestingController);
    flushI18n(httpMock, {
      graduation: {
        title: '(Pós)Graduação',
        subtitle: 'Minha formação acadêmica',
        quantity: '{{count}} cursos',
        iconAlt: 'Ícone de formação',
        visitWebsite: 'Visitar o site de {{name}}',
        finalMessage: { line1: 'Seja', line2: 'Bem-vindo', line3: 'Sempre' }
      }
    }, {
      graduation: {
        title: 'Graduation',
        subtitle: 'My academic background',
        quantity: '{{count}} courses',
        iconAlt: 'Graduation icon',
        visitWebsite: 'Visit {{name}} website',
        finalMessage: { line1: 'Be', line2: 'Welcome', line3: 'Always' }
      }
    });
    // Ensure language and detect changes
    const lang = TestBed.inject(LanguageService);
    lang.setLanguage('pt-BR');
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render titles', () => {
    const fixture = TestBed.createComponent(GraduationComponent);
    const httpMock = TestBed.inject(HttpTestingController);
    flushI18n(httpMock, {
      graduation: {
        title: '(Pós)Graduação',
        subtitle: 'Minha formação acadêmica',
        quantity: '{{count}} cursos',
      }
    }, {
      graduation: {
        title: 'Graduation',
        subtitle: 'My academic background',
        quantity: '{{count}} courses',
      }
    });
    const lang = TestBed.inject(LanguageService);
    lang.setLanguage('pt-BR');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector(
        'div.container div.text-center h2.section-heading.text-uppercase'
      )?.textContent
    ).toBe('(Pós)Graduação');
  });
});
