import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { InstitutionEnum } from '@path-app/models/InstitutionEnum';
import { FilterPipe } from '@path-pipes/filter.pipe';
import { ImgcursoPipe } from '@path-pipes/imgcurso.pipe';
import { MessageDateConclusionPipe } from '@path-pipes/message-date-conclusion.pipe';
import { PrintTagsPipe } from '@path-pipes/print-tags.pipe';
import { SortbyPipe } from '@path-pipes/sortby.pipe';
import { DataService } from '@path-services/data-service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormationCourseComponent } from './formationcourse.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClientTesting, HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('FormationCourseComponent', () => {
  let component: FormationCourseComponent;
  let fixture: ComponentFixture<FormationCourseComponent>;
  let dataServiceStub: Partial<DataService>;

  beforeEach(async () => {
    dataServiceStub = {
      getFormationCourses: () => [
        {
          id: 'formacao-csharp-orientacao-objetos-alura-2021-04',
          name: 'C# e orientação a objetos',
          institution: InstitutionEnum.Alura,
          certificateUrl:
            'https://cursos.alura.com.br/degree/certificate/2e01d0c3-8f5d-4715-a679-3061632a9298?lang=pt_BR',
          tags: [
            'software-development',
            'microsoft-technologies',
            'csharp',
            'dotnet',
          ],
          conclusion: new Date('2021-4-26'),
          favorite: true,
        },
        {
          id: 'formacao-orquestracao-containers-kubernetes-alura-2022-05',
          name: 'Orquestração de containers com Kubernetes',
          institution: InstitutionEnum.Alura,
          certificateUrl:
            'https://cursos.alura.com.br/degree/certificate/ecc51fe7-41c9-4eed-afad-5fd31aa1232a?lang=pt_BR',
          tags: ['kubernetes', 'docker-container', 'azure-cloud'],
          conclusion: new Date('2022-5-13'),
          favorite: true,
        },
      ], // Mock the data service
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FilterPipe,
        ImgcursoPipe,
        MessageDateConclusionPipe,
        PrintTagsPipe,
        NgxPaginationModule,
        SortbyPipe,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
  FormationCourseComponent, // Import the standalone component
  HttpClientTestingModule,
      ],
      providers: [
        { provide: DataService, useValue: dataServiceStub },
        provideZonelessChangeDetection(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormationCourseComponent);
    const httpMock = TestBed.inject(HttpTestingController);
    // Minimal translation keys used in the template
    httpMock.expectOne('/assets/i18n/pt-BR.json').flush({
      formationCourse: {
        title: 'Formações',
        subtitle: 'Minhas formações',
        quantity: 'Quantidade',
        logoAlt: 'Logo',
        institution: 'Instituição',
        tags: 'Tags',
        completedOn: 'Concluído em',
        certificate: 'Certificado',
        unreadMessages: 'Mensagens não lidas'
      }
    });
    httpMock.expectOne('/assets/i18n/en-US.json').flush({
      formationCourse: {
        title: 'Formations',
        subtitle: 'My formations',
        quantity: 'Quantity',
        logoAlt: 'Logo',
        institution: 'Institution',
        tags: 'Tags',
        completedOn: 'Completed on',
        certificate: 'Certificate',
        unreadMessages: 'Unread messages'
      }
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default pagination config', () => {
    expect(component.config().itemsPerPage).toBe(5);
    expect(component.config().currentPage).toBe(1);
  });

  it('should calculate absolute index correctly', () => {
    const indexOnPage = 2;
    const expectedIndex =
      component.config().itemsPerPage * (component.config().currentPage - 1) +
      indexOnPage +
      1;
    expect(component.absoluteIndex(indexOnPage)).toBe(expectedIndex);
  });

  it('should change page number on onPageChange', () => {
    const newPageNumber = 2;
    component.onPageChange(newPageNumber);
    expect(component.config().currentPage).toBe(newPageNumber);
  });
});
