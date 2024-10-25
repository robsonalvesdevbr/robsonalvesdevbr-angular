import { TestBed } from '@angular/core/testing'
import { ContactComponent } from './contact.component'

describe('ContactComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
    }).compileComponents()
  })

  it('should create the ContactComponent', () => {
    const fixture = TestBed.createComponent(ContactComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it('should render titles', () => {
    const fixture = TestBed.createComponent(ContactComponent)
    //fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement
    expect(compiled.querySelector('div.container div.text-center h2.section-heading.text-uppercase')?.textContent).toBe('Contato')
  })
})
