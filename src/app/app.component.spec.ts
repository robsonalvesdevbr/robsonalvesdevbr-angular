import { Profile } from './data/Profile'
import { FormationCourses } from './data/FormationCourse'
import { Books } from './data/Book'
import { Graduations } from './data/Graduation'
import { Courses } from './data/Course'
import { TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { DataService } from '@path-services/data-service'

describe('AppComponent', () => {
  let dataServiceStub: Partial<DataService>

  beforeEach(async () => {
    dataServiceStub = {
      getCourses: () => Courses,
      getGraduations: () => Graduations,
      getBooks: () => Books,
      getFormationCourses: () => FormationCourses,
      getProfile: () => Profile,
    }

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: DataService, useValue: dataServiceStub }],
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it(`should have the 'Robson Candido dos Santos Alves' title`, () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app.title).toEqual('Robson Candido dos Santos Alves')
  })

  it('should fetch courses from the data service', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app.courses).toEqual(Courses)
  })

  it('should fetch graduations from the data service', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app.graduations).toEqual(Graduations)
  })

  it('should fetch books from the data service', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app.books).toEqual(Books)
  })

  it('should fetch formation courses from the data service', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app.formationCourses).toEqual(FormationCourses)
  })

  it('should fetch profile from the data service', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app.profile).toEqual(Profile)
  })
})
