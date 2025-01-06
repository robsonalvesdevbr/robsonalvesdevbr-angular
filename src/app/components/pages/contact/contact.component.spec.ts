import { TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { DataService } from '@path-services/data-service';

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
        email: 'contato@robsonalves.dev.br',
        birthday: new Date('1980-08-29'),
        urlList: new Map<string, string>([
          ['WebSite', 'https://www.robsonalves.dev.br'],
          ['LinkedIn', 'https://www.linkedin.com/in/robson-curitiba'],
          ['Instagram', 'https://www.instagram.com/robsondesenvolvimento'],
          ['GitHub', 'https://github.com/robsonalvesdev'],
        ]),
      }),
    };

    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [{ provide: DataService, useValue: dataServiceStub }],
    }).compileComponents();

    const fixture = TestBed.createComponent(ContactComponent);
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
    if (month < 0 || (month === 0 && currentYear.getDate() < birthdate.getDate())) {
      ageCalc--;
    }
    expect(age).toBe(ageCalc);
  });
});
