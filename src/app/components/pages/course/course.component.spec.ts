import { provideHttpClient, withXhr } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { InstitutionEnum } from '@path-app/models/InstitutionEnum';
import { CourseTagEnum } from '@path-app/models/CourseTagEnum';
import { DataService } from '@path-services/data-service';
import { CourseComponent } from './course.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;
  let dataServiceStub: Partial<DataService>;

  beforeEach(async () => {
    dataServiceStub = {
      getCourses: () => [
        {
          id: 'curso-github-copilot-formacao-basica-udemy-2024-08',
          name: 'GitHub Copilot: Formação Básica',
          institution: InstitutionEnum.Udemy,
          certificateUrl:
            'https://www.linkedin.com/learning/certificates/86c236d05e24c26443322a5d07c3026de9e74e8c9a13ae51d9266105b1ddc291?trk=share_certificate',
          tags: [CourseTagEnum.ArtificialIntelligence, CourseTagEnum.GitHub],
          conclusion: new Date('2024-8-22'),
          favorite: true,
        },
        {
          id: 'curso-comunicacao-assertiva-gestores-alto-desempenho-alura-2024-08',
          name: 'Comunicação Assertiva para Gestores de Alto Desempenho',
          institution: InstitutionEnum.Alura,
          certificateUrl:
            'https://www.linkedin.com/learning/certificates/f1cd3d0f28df30ef793720cf64234c5f249822e19e68e8f3fb3f9bd12d56ab7c?trk=share_certificate',
          tags: [CourseTagEnum.GitHub, CourseTagEnum.Copilot],
          conclusion: new Date('2024-8-30'),
          favorite: true,
        },
      ],
    };

    await TestBed.configureTestingModule({
      imports: [CourseComponent],
      providers: [
        { provide: DataService, useValue: dataServiceStub },
        provideHttpClient(withXhr()),
        provideHttpClientTesting(),
        provideRouter([]),
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    // Flush i18n translations minimally to avoid warnings
    const httpMock = TestBed.inject(HttpTestingController);
    httpMock.expectOne('/assets/i18n/pt-BR.json').flush({
      courses: {
        title: 'Cursos',
        subtitle: 'Meus cursos',
        quantity: '{{count}} cursos',
        ariaClearFilters: 'Limpar filtros',
        clearFilters: 'Limpar filtros',
        filterInstitution: 'Instituição',
        filterTag: 'Tag',
        favorite: 'Favorito',
        logoAlt: 'Logo {{name}}',
        institution: 'Instituição',
        tags: 'Tags',
        completedOn: 'Concluído em',
        certificate: 'Certificado',
        unreadMessages: 'Não lidas'
      }
    });
    httpMock.expectOne('/assets/i18n/en-US.json').flush({ courses: { title: 'Courses' } });
    // Set language and detect changes
    const { LanguageService } = await import('@path-services/language.service');
    const lang = TestBed.inject(LanguageService);
    lang.setLanguage('pt-BR');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should initialize courseList and tags on ngOnInit', () => {
  //   component.ngOnInit()
  //   expect(component.courseList().size).toBe(2)
  //   expect(component.tags().size).toBe(3)
  // })

  // it('should return sorted course list', () => {
  //   component.ngOnInit()
  //   const courseList = component.getCourseList()
  //   expect(courseList).toEqual(['Alura', 'Udemy'])
  // })

  it('should return sorted tags', () => {
    component.ngOnInit();
    const tags = component.tagsArray();
    expect(tags).toEqual(['artificial-intelligence', 'copilot', 'github']);
  });

  it('should calculate absolute index correctly', () => {
    component.config().itemsPerPage = 5;
    component.config().currentPage = 2;
    const index = component.absoluteIndex(3);
    expect(index).toBe(9);
  });

  it('should change page on onPageChange', () => {
    component.onPageChange(2);
    expect(component.config().currentPage).toBe(2);
  });

  describe('collapsible filters', () => {
    const root = () => fixture.nativeElement as HTMLElement;
    const toggle = () => root().querySelector<HTMLButtonElement>('[data-testid="courses-filters-toggle"]');

    it('should keep filters collapsed by default while the search stays visible', () => {
      expect(component.filtersOpen()).toBe(false);
      expect(root().querySelector('#course-search')).toBeTruthy();
      expect(root().querySelector('#courses-filters')).toBeNull();
      expect(toggle()?.getAttribute('aria-expanded')).toBe('false');
    });

    it('should expand and collapse the filter panel through the toggle', () => {
      toggle()?.click();
      fixture.detectChanges();
      expect(root().querySelector('#courses-filters')).toBeTruthy();
      expect(toggle()?.getAttribute('aria-expanded')).toBe('true');

      toggle()?.click();
      fixture.detectChanges();
      expect(root().querySelector('#courses-filters')).toBeNull();
    });

    it('should count active filters and show the clear action only when something is active', () => {
      expect(component.activeFilterCount()).toBe(0);
      expect(component.hasActiveFilters()).toBe(false);

      component.coursesFilter.set(new Set([InstitutionEnum.Udemy]));
      component.tagsFilter.set(new Set(['github']));
      fixture.detectChanges();

      expect(component.activeFilterCount()).toBe(2);
      expect(toggle()?.querySelector('.badge')?.textContent?.trim()).toBe('2');
      expect(root().querySelector('button.btn-link')).toBeTruthy();

      component.clearFilters();
      fixture.detectChanges();
      expect(root().querySelector('button.btn-link')).toBeNull();
    });

    it('should treat a non-empty search as something to clear', () => {
      component.searchQuery.set('copilot');
      expect(component.hasActiveFilters()).toBe(true);
      expect(component.activeFilterCount()).toBe(0);
    });
  });

  it('should clear filters', () => {
    const currentInstitutions = new Set(component.coursesFilter());
    currentInstitutions.add(InstitutionEnum.Udemy);
    component.coursesFilter.set(currentInstitutions);

    const currentTags = new Set(component.tagsFilter());
    currentTags.add('Tag1');
    component.tagsFilter.set(currentTags);

    component.clearFilters();
    expect(component.coursesFilter().size).toBe(0);
    expect(component.tagsFilter().size).toBe(0);
  });

  it('should handle institution click event', () => {
    const event = {
      target: { id: 'input_course_institution_Alura' },
    } as unknown as MouseEvent;
    component.onClickIntitutionEvent(event);
    expect(component.coursesFilter().has(InstitutionEnum.Alura)).toBeTrue();
  });

  it('should handle tag click event', () => {
    const event = {
      target: { id: 'input_course_tag_Tag1' },
    } as unknown as MouseEvent;
    component.onClickTagEvent(event);
    expect(component.tagsFilter().has('Tag1')).toBeTrue();
  });

  it('should delete id from coursesFilter on onClickIntitutionEvent', () => {
    const id = 'Alura';
    const institutionId = InstitutionEnum[id as keyof typeof InstitutionEnum];

    const currentFilters = new Set(component.coursesFilter());
    currentFilters.add(institutionId);
    component.coursesFilter.set(currentFilters);

    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'target', {
      value: { id: `input_course_institution_${id}` },
    });

    component.onClickIntitutionEvent(event);

    expect(component.coursesFilter().has(institutionId)).toBeFalse();
  });

  it('should delete id from tagsFilter on onClickTagEvent', () => {
    const id = 'testTag';

    const currentTags = new Set(component.tagsFilter());
    currentTags.add(id);
    component.tagsFilter.set(currentTags);

    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'target', {
      value: { id: `input_course_tag_${id}` },
    });

    component.onClickTagEvent(event);

    expect(component.tagsFilter().has(id)).toBeFalse();
  });
});
