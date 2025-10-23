import { TestBed } from '@angular/core/testing';
import { DataService } from '@path-services/data-service';
import { ContactComponent } from './contact.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClientTesting, HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

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
  imports: [ContactComponent, HttpClientTestingModule],
      providers: [
        { provide: DataService, useValue: dataServiceStub },
        provideZonelessChangeDetection(),
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

  it('should calculate age correctly', () => {
    const birthdate = new Date(1990, 1, 1);
    const age = component.calcularIdade(birthdate);
    const currentYear = new Date();
    const month = currentYear.getMonth() - birthdate.getMonth();
    let ageCalc = currentYear.getFullYear() - birthdate.getFullYear();
    if (
      month < 0 ||
      (month === 0 && currentYear.getDate() < birthdate.getDate())
    ) {
      ageCalc--;
    }
    expect(age).toBe(ageCalc);
  });
});
