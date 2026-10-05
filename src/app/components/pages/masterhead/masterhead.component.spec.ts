import { TestBed } from '@angular/core/testing';
import { MasterheadComponent } from './masterhead.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { LanguageService } from '@path-services/language.service';

describe('MasterheadComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterheadComponent],
      providers: [provideZonelessChangeDetection(), provideHttpClient(withXhr()), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('should create the MasterheadComponent', () => {
    const fixture = TestBed.createComponent(MasterheadComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render identity and call-to-action links', () => {
    const fixture = TestBed.createComponent(MasterheadComponent);
    const httpMock = TestBed.inject(HttpTestingController);
    httpMock.expectOne('/assets/i18n/pt-BR.json').flush({
      contact: { photoAlt: 'Foto de perfil' },
      masterhead: {
        name: 'Robson Alves',
        role: 'Arquiteto de Software',
        tagline: 'Especialista em .NET',
        contact: 'Entrar em contato',
        resume: 'Currículo',
      },
    });
    httpMock.expectOne('/assets/i18n/en-US.json').flush({ masterhead: {} });
    const lang = TestBed.inject(LanguageService);
    lang.setLanguage('pt-BR');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1.masthead-heading')?.textContent?.trim()).toBe('Robson Alves');
    expect(compiled.querySelector('.masthead-subheading')?.textContent?.trim()).toBe('Arquiteto de Software');
    expect(compiled.querySelector('.masthead-tagline')?.textContent?.trim()).toBe('Especialista em .NET');

    const contact = compiled.querySelector<HTMLAnchorElement>('[data-testid="masthead-contact"]');
    expect(contact?.getAttribute('href')).toBe('#contact');
    expect(contact?.textContent?.trim()).toBe('Entrar em contato');

    const linkedin = compiled.querySelector<HTMLAnchorElement>('[data-testid="masthead-linkedin"]');
    expect(linkedin?.getAttribute('href')).toContain('linkedin.com');
    expect(linkedin?.getAttribute('rel')).toBe('noopener');

    const resume = compiled.querySelector<HTMLAnchorElement>('[data-testid="masthead-resume"]');
    expect(resume?.getAttribute('href')).toBe('assets/Curriculo_Robson_Alves.pdf');
    expect(resume?.getAttribute('target')).toBe('_blank');
    expect(resume?.getAttribute('rel')).toBe('noopener');
    expect(resume?.textContent?.trim()).toBe('Currículo');
  });
});
