import { TestBed } from '@angular/core/testing';
import { DataService } from '@path-services/data-service';
import { ContactComponent } from './contact.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient, withXhr } from '@angular/common/http';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let root: HTMLElement;
  let dataServiceStub: Partial<DataService>;

  beforeEach(async () => {
    dataServiceStub = {
      getProfile: () => ({
        name: 'Robson Alves',
        country: 'Brasil',
        state: 'Paraná',
        city: 'Curitiba',
        email: 'robson.curitibapr@gmail.com',
        birthday: new Date('1980-08-29'),
        urlList: new Map<string, string>([
          ['WebSite', 'https://www.robsonalves.dev.br'],
          ['LinkedIn', 'https://www.linkedin.com/in/robson-curitiba'],
          ['Instagram', 'https://www.instagram.com/robsondesenvolvimento'],
          ['GitHub', 'https://github.com/robsonalvesdevbr'],
        ]),
      }),
    };

    await TestBed.configureTestingModule({
  imports: [ContactComponent],
      providers: [
        { provide: DataService, useValue: dataServiceStub },
        provideZonelessChangeDetection(),
        provideHttpClient(withXhr()),
        provideHttpClientTesting()
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(ContactComponent);
    const httpMock = TestBed.inject(HttpTestingController);
    httpMock.expectOne('/assets/i18n/pt-BR.json').flush({
      contact: {
        title: 'Contato',
        photoAlt: 'Foto do perfil',
        location: 'Localização',
        email: 'E-mail',
        age: 'Idade',
        resume: 'Currículo',
        sendEmail: 'Enviar e-mail',
      }
    });
    httpMock.expectOne('/assets/i18n/en-US.json').flush({
      contact: {
        title: 'Contact',
        photoAlt: 'Profile photo',
        location: 'Location',
        email: 'Email',
        age: 'Age',
        sendEmail: 'Send email',
      }
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
    root = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delegate age calculation to the calculateAge util', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 5, 15));
    expect(component.calculateAge(new Date(1990, 1, 1))).toBe(34);
    vi.useRealTimers();
  });

  it('should render a primary email action and one labeled link per profile url', () => {
    const email = root.querySelector<HTMLAnchorElement>('[data-testid="contact-email"]');
    expect(email?.getAttribute('href')).toContain('mailto:robson.curitibapr@gmail.com');

    const outline = Array.from(root.querySelectorAll<HTMLAnchorElement>('a.btn-outline-secondary'));
    expect(outline.map(a => a.textContent?.trim())).toEqual(['WebSite', 'LinkedIn', 'Instagram', 'GitHub']);
    outline.forEach(a => expect(a.getAttribute('rel')).toBe('noopener'));
  });

  it('should link to the resume PDF in a new tab', () => {
    const resume = root.querySelector<HTMLAnchorElement>('[data-testid="contact-resume"]');
    expect(resume?.getAttribute('href')).toBe('assets/Curriculo_Robson_Alves.pdf');
    expect(resume?.getAttribute('target')).toBe('_blank');
    expect(resume?.getAttribute('rel')).toBe('noopener');
    expect(resume?.textContent?.trim()).toBe('Currículo');
  });

  it('should not expose the birth date or the repository meta card', () => {
    expect(root.textContent).not.toContain('1980');
    expect(root.querySelector('.card-header')).toBeNull();
  });

  it('should map known platforms to icons and fall back for unknown ones', () => {
    expect(component.iconFor('GitHub')).toBe('bi-github');
    expect(component.iconFor('Mastodon')).toBe('bi-link-45deg');
  });
});
