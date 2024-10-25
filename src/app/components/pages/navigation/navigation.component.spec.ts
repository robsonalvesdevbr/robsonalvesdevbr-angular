import { TestBed } from '@angular/core/testing'
import { NavigationComponent } from './navigation.component'

describe('NavigationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationComponent],
    }).compileComponents()
  })

  it('should create the CourseComponent', () => {
    const fixture = TestBed.createComponent(NavigationComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it('should render titles', () => {
    const fixture = TestBed.createComponent(NavigationComponent)
    //fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement
    expect(compiled.querySelector('#about')?.textContent).toBe('Sobre')
    expect(compiled.querySelector('#graduation')?.textContent).toBe('(Pós)Graduação')
    expect(compiled.querySelector('#courses')?.textContent).toBe('Cursos')
    expect(compiled.querySelector('#formationcourse')?.textContent).toBe('Formação')
    expect(compiled.querySelector('#books')?.textContent).toBe('Leituras')
    expect(compiled.querySelector('#contact')?.textContent).toBe('Contato')
  })
})
