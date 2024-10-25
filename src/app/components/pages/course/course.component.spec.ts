import { TestBed } from '@angular/core/testing'
import { CourseComponent } from './course.component'

describe('CourseComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseComponent],
    }).compileComponents()
  })

  it('should create the CourseComponent', () => {
    const fixture = TestBed.createComponent(CourseComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it('should render titles', () => {
    const fixture = TestBed.createComponent(CourseComponent)
    //fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement
    expect(compiled.querySelector('div.container div.text-center h2.section-heading.text-uppercase')?.textContent).toBe('Cursos')
  })
})
