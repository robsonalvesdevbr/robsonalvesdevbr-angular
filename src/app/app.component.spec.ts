import { TestBed } from '@angular/core/testing';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/pages/about/about.component';
import { BookComponent } from './components/pages/book/book.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { CourseComponent } from './components/pages/course/course.component';
import { FooterComponent } from './components/pages/footer/footer.component';
import { FormationCourseComponent } from './components/pages/formationcourse/formationcourse.component';
import { GraduationComponent } from './components/pages/graduation/graduation.component';
import { MasterheadComponent } from './components/pages/masterhead/masterhead.component';
import { NavigationComponent } from './components/pages/navigation/navigation.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClientTesting, HttpClientTestingModule } from '@angular/common/http/testing';

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
        FooterComponent, // Change from declarations to imports
        HttpClientTestingModule,
      ],
      providers: [provideZonelessChangeDetection(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Robson Candido dos Santos Alves'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Robson Candido dos Santos Alves');
  });
});
