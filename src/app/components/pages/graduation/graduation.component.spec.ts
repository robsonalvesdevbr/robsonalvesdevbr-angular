import { TestBed } from '@angular/core/testing';
import { GraduationComponent } from './graduation.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { LanguageService } from '@path-services/language.service';
import { flushI18n } from '@path-app/../testing/i18n-test.utils';
import { DataService } from '@path-services/data-service';

describe('GraduationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraduationComponent],
      providers: [provideZonelessChangeDetection(), provideHttpClient(withXhr()), provideHttpClientTesting()],
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
        logoAlt: 'Logo da instituição {{name}}',
        visitWebsite: 'Visitar o site de {{name}}',
        finalMessage: { line1: 'Seja', line2: 'Bem-vindo', line3: 'Sempre' }
      }
    }, {
      graduation: {
        title: 'Graduation',
        subtitle: 'My academic background',
        quantity: '{{count}} courses',
        logoAlt: 'Institution logo {{name}}',
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
        'div.container div.text-center h2.section-heading'
      )?.textContent
    ).toBe('(Pós)Graduação');
  });

  describe('cards', () => {
    const i18n = {
      graduation: {
        title: 'Formação',
        subtitle: 'Sub',
        quantity: '{{count}}',
        logoAlt: 'Logo {{name}}',
        visitWebsite: 'Visitar {{name}}',
        finalMessage: { line1: 'a', line2: 'b', line3: 'c' },
      },
    };

    it('should render one graduation-card per graduation', () => {
      const fixture = TestBed.createComponent(GraduationComponent);
      const expected = TestBed.inject(DataService).getGraduations().length;
      flushI18n(TestBed.inject(HttpTestingController), i18n, i18n);
      TestBed.inject(LanguageService).setLanguage('pt-BR');
      fixture.detectChanges();

      const cards = (fixture.nativeElement as HTMLElement).querySelectorAll(
        '[data-testid="graduation-card"]'
      );
      expect(cards).toHaveLength(expected);
    });

    it('should fall back to the default logo when the institution has none', () => {
      TestBed.overrideProvider(DataService, {
        useValue: {
          getGraduations: () => [
            {
              id: 'sem-logo',
              name: 'Curso sem logo',
              institution: 'Instituição X',
              conclusionDate: new Date(2020, 0),
              conclusion: 'completed',
              websiteInstituition: 'https://example.com',
            },
          ],
        },
      });
      const fixture = TestBed.createComponent(GraduationComponent);
      flushI18n(TestBed.inject(HttpTestingController), i18n, i18n);
      TestBed.inject(LanguageService).setLanguage('pt-BR');
      fixture.detectChanges();

      const logo = (fixture.nativeElement as HTMLElement).querySelector<HTMLImageElement>(
        '[data-testid="graduation-card"] img'
      );
      expect(logo?.getAttribute('src')).toContain('assets/img/others/formacao.png');
    });
  });
});
