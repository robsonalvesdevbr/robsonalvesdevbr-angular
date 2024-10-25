import { TestBed } from '@angular/core/testing'
import { MasterheadComponent } from './masterhead.component'

describe('MasterheadComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterheadComponent],
    }).compileComponents()
  })

  it('should create the MasterheadComponent', () => {
    const fixture = TestBed.createComponent(MasterheadComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it('should render titles', () => {
    const fixture = TestBed.createComponent(MasterheadComponent)
    //fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement
    expect(compiled.querySelector('div.container div.masthead-subheading')?.textContent).toBe('Bem vindo ao meu Website')
  })
})
