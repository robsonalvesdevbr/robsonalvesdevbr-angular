import { TestBed } from '@angular/core/testing'
import { GraduationComponent } from './graduation.component'

describe('GraduationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraduationComponent],
    }).compileComponents()
  })

  it('should create the CourseComponent', () => {
    const fixture = TestBed.createComponent(GraduationComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it('should render titles', () => {
    const fixture = TestBed.createComponent(GraduationComponent)
    //fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement
    expect(compiled.querySelector('div.container div.text-center h2.section-heading.text-uppercase')?.textContent).toBe('(Pós)Graduação')
  })
})
