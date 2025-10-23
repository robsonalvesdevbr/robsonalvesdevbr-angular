import { TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { LanguageService } from '@path-services/language.service';
import { provideHttpClientTesting, HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('FooterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideHttpClientTesting()],
      imports: [FooterComponent, HttpClientTestingModule],
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
        termsOfUse: 'Termos de Uso'
      }
    });
    httpMock.expectOne('/assets/i18n/en-US.json').flush({
      footer: {
        copyright: 'All rights reserved',
        pageTemplate: 'Page template',
        termsOfUse: 'Terms of Use'
      }
    });
  // Set language to EN to match expectation
  const langService = TestBed.inject(LanguageService);
  langService.setLanguage('en-US');
  fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div.container')?.textContent).toContain(
      'Terms of Use'
    );
  });
});
