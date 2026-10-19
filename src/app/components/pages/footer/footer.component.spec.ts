import { TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { LanguageService } from '@path-services/language.service';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient, withXhr } from '@angular/common/http';

describe('FooterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideZonelessChangeDetection(), provideHttpClient(withXhr()), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('should create the CourseComponent', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render titles', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const httpMock = TestBed.inject(HttpTestingController);
    // Provide minimal i18n maps so TranslatePipe renders strings
    httpMock.expectOne('/assets/i18n/pt-BR.json').flush({
      footer: {
        copyright: 'Todos os direitos reservados',
        pageTemplate: 'Template da página',
        sourceCode: 'Código-fonte'
      }
    });
    httpMock.expectOne('/assets/i18n/en-US.json').flush({
      footer: {
        copyright: 'All rights reserved',
        pageTemplate: 'Page template',
        sourceCode: 'Source code'
      }
    });
  // Set language to EN to match expectation
  const langService = TestBed.inject(LanguageService);
  langService.setLanguage('en-US');
  fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div.container')?.textContent).toContain(
      'Source code'
    );
  });

  it('should render the copyright and two external links that open safely', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const httpMock = TestBed.inject(HttpTestingController);
    const copy = { footer: { copyright: 'Direitos {{year}}', pageTemplate: 'Template', sourceCode: 'Código' } };
    httpMock.expectOne('/assets/i18n/pt-BR.json').flush(copy);
    httpMock.expectOne('/assets/i18n/en-US.json').flush(copy);
    TestBed.inject(LanguageService).setLanguage('pt-BR');
    fixture.detectChanges();
    const footer = (fixture.nativeElement as HTMLElement).querySelector('footer.site-footer');

    expect(footer).toBeTruthy();
    expect(footer?.textContent).toContain(`Direitos ${new Date().getFullYear()}`);
    const links = Array.from(footer!.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]'));
    expect(links.map(a => a.getAttribute('href'))).toEqual([
      'https://startbootstrap.com/theme/agency',
      'https://github.com/robsonalvesdevbr/robsonalvesdevbr-angular',
    ]);
    links.forEach(a => expect(a.getAttribute('rel')).toBe('noopener'));
  });
});
