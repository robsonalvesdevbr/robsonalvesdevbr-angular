import { TestBed } from '@angular/core/testing';
import { DataService } from '@path-services/data-service';
import { ContactComponent } from './contact.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient, withXhr } from '@angular/common/http';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let dataServiceStub: Partial<DataService>;

  beforeEach(async () => {
    dataServiceStub = {
      getProfile: () => ({
        name: 'Robson Candido dos Santos Alves',
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
        birthday: 'Aniversário',
        age: 'Idade',
        separator: '—',
        sendEmail: 'Enviar e-mail',
        visitWebsite: 'Visitar site',
        visitLinkedIn: 'Visitar LinkedIn',
        visitInstagram: 'Visitar Instagram',
        visitGitHub: 'Visitar GitHub',
        visitRepository: 'Visitar repositório',
        aboutThisPage: {
          title: 'Sobre esta página',
          description: 'Descrição',
          sourceCode: 'Código fonte',
          visitRepo: 'Visitar repo',
          thanks: 'Obrigado'
        }
      }
    });
    httpMock.expectOne('/assets/i18n/en-US.json').flush({
      contact: {
        title: 'Contact',
        photoAlt: 'Profile photo',
        location: 'Location',
        email: 'Email',
        birthday: 'Birthday',
        age: 'Age',
        separator: '—',
        sendEmail: 'Send email',
        visitWebsite: 'Visit website',
        visitLinkedIn: 'Visit LinkedIn',
        visitInstagram: 'Visit Instagram',
        visitGitHub: 'Visit GitHub',
        visitRepository: 'Visit repository',
        aboutThisPage: {
          title: 'About this page',
          description: 'Description',
          sourceCode: 'Source code',
          visitRepo: 'Visit repo',
          thanks: 'Thanks'
        }
      }
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('calcularIdade', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2024, 5, 15));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should calculate age when birthday already occurred this year', () => {
      expect(component.calcularIdade(new Date(1990, 1, 1))).toBe(34);
    });

    it('should calculate age when birthday has not occurred yet this year', () => {
      expect(component.calcularIdade(new Date(1990, 11, 25))).toBe(33);
    });

    it('should calculate age on the exact birthday', () => {
      expect(component.calcularIdade(new Date(1990, 5, 15))).toBe(34);
    });
  });
});
