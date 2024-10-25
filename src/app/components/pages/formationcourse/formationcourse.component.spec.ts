import { TestBed } from '@angular/core/testing'
import { FormationCourseComponent } from './formationcourse.component'

describe('FormationCourseComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormationCourseComponent],
    }).compileComponents()
  })

  it('should create the CourseComponent', () => {
    const fixture = TestBed.createComponent(FormationCourseComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it('should render titles', () => {
    const fixture = TestBed.createComponent(FormationCourseComponent)
    //fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement
    expect(compiled.querySelector('div.container div.text-center h2.section-heading.text-uppercase')?.textContent).toBe('Cursos de Formação')
  })
})
