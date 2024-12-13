import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormationCourseComponent } from './formationcourse.component';
import { DataService } from '@path-services/data-service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { GoogleAnalyticsDirective } from '@path-app/directives/google-analytics.directive';
import { FilterPipe } from '@path-pipes/filter.pipe';
import { ImgcursoPipe } from '@path-pipes/imgcurso.pipe';
import { MessageDateConclusionPipe } from '@path-pipes/message-date-conclusion.pipe';
import { PrintTagsPipe } from '@path-pipes/print-tags.pipe';
import { SortbyPipe } from '@path-pipes/sortby.pipe';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { InstitutionEnum } from '@path-app/models/InstitutionEnum';

describe('FormationCourseComponent', () => {
  let component: FormationCourseComponent;
  let fixture: ComponentFixture<FormationCourseComponent>;
  let dataServiceStub: Partial<DataService>;

  beforeEach(async () => {
    dataServiceStub = {
      getFormationCourses: () => [
        {
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
        GoogleAnalyticsDirective,
        SortbyPipe,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        FormationCourseComponent, // Import the standalone component
      ],
      providers: [{ provide: DataService, useValue: dataServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(FormationCourseComponent);
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
