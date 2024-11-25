import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CourseComponent } from './course.component'
import { DataService } from '@path-services/data-service'
import { provideHttpClient } from '@angular/common/http'
import { provideRouter } from '@angular/router'
import { InstitutionEnum } from '@path-app/models/InstitutionEnum'

describe('CourseComponent', () => {
  let component: CourseComponent
  let fixture: ComponentFixture<CourseComponent>
  let dataServiceStub: Partial<DataService>

  beforeEach(async () => {
    dataServiceStub = {
      getCourses: () => [
        {
          name: 'GitHub Copilot: Formação Básica',
          institution: InstitutionEnum.Udemy,
          certificateUrl: 'https://www.linkedin.com/learning/certificates/86c236d05e24c26443322a5d07c3026de9e74e8c9a13ae51d9266105b1ddc291?trk=share_certificate',
          tags: ['Tag1', 'Tag2'],
          conclusion: new Date('2024-8-22'),
          favorite: true,
        },
        {
          name: 'Comunicação Assertiva para Gestores de Alto Desempenho',
          institution: InstitutionEnum.Alura,
          certificateUrl: 'https://www.linkedin.com/learning/certificates/f1cd3d0f28df30ef793720cf64234c5f249822e19e68e8f3fb3f9bd12d56ab7c?trk=share_certificate',
          tags: ['Tag2', 'Tag3'],
          conclusion: new Date('2024-8-30'),
          favorite: true,
        },
      ],
    }

    await TestBed.configureTestingModule({
      imports: [CourseComponent],
      providers: [{ provide: DataService, useValue: dataServiceStub }, provideHttpClient(), provideRouter([])],
    }).compileComponents()

    fixture = TestBed.createComponent(CourseComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

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
    component.ngOnInit()
    const tags = component.getTags()
    expect(tags).toEqual(['Tag1', 'Tag2', 'Tag3'])
  })

  it('should calculate absolute index correctly', () => {
    component.config().itemsPerPage = 5
    component.config().currentPage = 2
    const index = component.absoluteIndex(3)
    expect(index).toBe(9)
  })

  it('should change page on onPageChange', () => {
    component.onPageChange(2)
    expect(component.config().currentPage).toBe(2)
  })

  it('should clear filters', () => {
    component.coursesFilter().add(InstitutionEnum.Udemy)
    component.tagsFilter().add('Tag1')
    component.clearFilters()
    expect(component.coursesFilter().size).toBe(0)
    expect(component.tagsFilter().size).toBe(0)
    expect(component.selectInstitutionsFilter()).toBe('')
    expect(component.selectTagFilter()).toBe('')
  })

  it('should handle institution click event', () => {
    const event = { target: { id: 'input_course_institution_Alura' } } as unknown as MouseEvent
    component.onClickIntitutionEvent(event)
    expect(component.coursesFilter().has(InstitutionEnum.Alura)).toBeTrue()
  })

  it('should handle tag click event', () => {
    const event = { target: { id: 'input_course_tag_Tag1' } } as unknown as MouseEvent
    component.onClickTagEvent(event)
    expect(component.tagsFilter().has('Tag1')).toBeTrue()
  })

  it('should delete id from coursesFilter on onClickIntitutionEvent', () => {
    const id = 'Alura'
    var institutionId = InstitutionEnum[id as keyof typeof InstitutionEnum]
    component.coursesFilter().add(institutionId)
    const event = new MouseEvent('click', { bubbles: true, cancelable: true })
    Object.defineProperty(event, 'target', { value: { id: `input_course_institution_${id}` } })

    component.onClickIntitutionEvent(event)

    expect(component.coursesFilter().has(institutionId)).toBeFalse()
  })

  it('should delete id from tagsFilter on onClickTagEvent', () => {
    const id = 'testTag'
    component.tagsFilter().add(id)
    const event = new MouseEvent('click', { bubbles: true, cancelable: true })
    Object.defineProperty(event, 'target', { value: { id: `input_course_tag_${id}` } })

    component.onClickTagEvent(event)

    expect(component.tagsFilter().has(id)).toBeFalse()
  })
})
