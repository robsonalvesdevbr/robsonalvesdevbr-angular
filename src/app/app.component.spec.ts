import { TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { RouterOutlet } from '@angular/router'
import { NavigationComponent } from './components/pages/navigation/navigation.component'
import { MasterheadComponent } from './components/pages/masterhead/masterhead.component'
import { AboutComponent } from './components/pages/about/about.component'
import { GraduationComponent } from './components/pages/graduation/graduation.component'
import { CourseComponent } from './components/pages/course/course.component'
import { FormationCourseComponent } from './components/pages/formationcourse/formationcourse.component'
import { BookComponent } from './components/pages/book/book.component'
import { ContactComponent } from './components/pages/contact/contact.component'
import { FooterComponent } from './components/pages/footer/footer.component'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterOutlet,
        NavigationComponent,
        MasterheadComponent,
        AboutComponent,
        GraduationComponent,
        CourseComponent,
        FormationCourseComponent,
        BookComponent,
        ContactComponent,
        FooterComponent,
      ],
      declarations: [AppComponent],
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it(`should have as title 'Robson Candido dos Santos Alves'`, () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app.title).toEqual('Robson Candido dos Santos Alves')
  })

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement
    expect(compiled.querySelector('h1')?.textContent).toContain('Robson Candido dos Santos Alves')
  })
})
