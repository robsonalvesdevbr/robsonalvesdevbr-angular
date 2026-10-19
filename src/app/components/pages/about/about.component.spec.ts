import { TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { LanguageService } from '@path-services/language.service';
import { flushI18n } from '@path-app/../testing/i18n-test.utils';

describe('AboutComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
      providers: [provideZonelessChangeDetection(), provideHttpClient(withXhr()), provideHttpClientTesting()]
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
      .querySelector('div.container div.text-center h3.section-subheading')
      ?.textContent?.trim();
    expect(text).toBe('Conheça minha trajetória profissional de 23+ anos');
  });

  it('should render one bento timeline item per career stage and the experience highlight', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    const httpMock = TestBed.inject(HttpTestingController);
    const stage = (name: string) => ({
      period: `${name}-period`,
      title: `${name}-title`,
      description: `${name}-description`,
    });
    flushI18n(httpMock, {
      about: {
        title: 'Sobre',
        subtitle: 'Trajetória',
        timeline: {
          instructor: stage('instructor'),
          transition: stage('transition'),
          financial: stage('financial'),
          modernization: stage('modernization'),
          architect: stage('architect'),
          experience: { line1: '23+ Anos', line2: 'de', line3: 'Experiência!' },
        },
      },
    });
    TestBed.inject(LanguageService).setLanguage('pt-BR');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const items = Array.from(compiled.querySelectorAll('.bento-timeline li'));
    expect(items).toHaveLength(5);
    expect(items[0].textContent).toContain('instructor-period');
    expect(items[0].textContent).toContain('instructor-title');
    expect(items[4].textContent).toContain('architect-description');

    const highlight = compiled.querySelector('[data-testid="about-experience"]');
    expect(highlight?.textContent).toContain('23+ Anos');
    expect(highlight?.textContent).toContain('Experiência!');
    expect(compiled.querySelector('[data-testid="about-title"]')?.textContent?.trim()).toBe('Sobre');
  });
});
