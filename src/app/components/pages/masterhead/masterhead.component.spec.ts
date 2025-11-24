import { TestBed } from '@angular/core/testing';
import { MasterheadComponent } from './masterhead.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { LanguageService } from '@path-services/language.service';

describe('MasterheadComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterheadComponent],
      providers: [provideZonelessChangeDetection(), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('should create the MasterheadComponent', () => {
    const fixture = TestBed.createComponent(MasterheadComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render titles', () => {
    const fixture = TestBed.createComponent(MasterheadComponent);
    const httpMock = TestBed.inject(HttpTestingController);
    httpMock.expectOne('/assets/i18n/pt-BR.json').flush({
      masterhead: {
        welcome: 'Bem-vindo',
        subtitle: 'Bem-vindo ao meu portfólio!',
        learnMore: 'Saiba mais'
      }
    });
    httpMock.expectOne('/assets/i18n/en-US.json').flush({
      masterhead: {
        welcome: 'Welcome',
        subtitle: 'Welcome to my portfolio!',
        learnMore: 'Learn more'
      }
    });
    // Ensure PT-BR selected
    const lang = TestBed.inject(LanguageService);
    lang.setLanguage('pt-BR');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('div.container div.masthead-subheading')
        ?.textContent
    ).toBe('Bem-vindo');
    const headingText = compiled.querySelector('div.container div.masthead-heading')?.textContent?.trim();
    expect(headingText).toBe('Bem-vindo ao meu portfólio!');
  });
});
