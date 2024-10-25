import { TestBed } from '@angular/core/testing'
import { BookComponent } from './book.component'

describe('BookComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookComponent],
    }).compileComponents()
  })

  it('should create the BookComponent', () => {
    const fixture = TestBed.createComponent(BookComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it('should render titles', () => {
    const fixture = TestBed.createComponent(BookComponent)
    //fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement
    expect(compiled.querySelector('div.container div.text-center h2.section-heading.text-uppercase')?.textContent).toBe('Leituras')
  })
})
