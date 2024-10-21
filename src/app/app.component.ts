import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from '@path-services/data-service';
import { GoogleAnalyticsService } from '@path-services/google-analytics.service';
import { NavigationComponent } from './components/pages/navigation/navigation.component';
import { MasterheadComponent } from './components/pages/masterhead/masterhead.component';
import { AboutComponent } from './components/pages/about/about.component';
import { GraduationComponent } from './components/pages/graduation/graduation.component';
import { CourseComponent } from './components/pages/course/course.component';
import { FormationoourseComponent } from './components/pages/formationoourse/formationoourse.component';
import { BookComponent } from './components/pages/book/book.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { FooterComponent } from './components/pages/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationComponent,
    MasterheadComponent,
    AboutComponent,
    GraduationComponent,
    CourseComponent,
    FormationoourseComponent,
    BookComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Robson Candido dos Santos Alves';
  courses = this.dataService.getCourses();
  graduations = this.dataService.getGraduations();
  books = this.dataService.getBooks();
  formationCourses = this.dataService.getFormationCourses();
  profile = this.dataService.getProfile();
  private readonly _$gaService = inject(GoogleAnalyticsService);
  //private readonly meta = inject(Meta);

  constructor(private readonly dataService: DataService) {}

  ngOnInit(): void {
    this._$gaService.init();
    // this.meta.addTag({
    //   name: 'title',
    //   content: 'Robson Candido dos Santos Alves',
    // });
    // this.meta.addTag({ name: 'description', content: 'My page profile' });
    // this.meta.addTag({
    //   name: 'keywords',
    //   content: 'Robson Candido dos Santos Alves',
    // });
    // this.meta.addTag({
    //   name: 'author',
    //   content: 'Robson Candido dos Santos Alves',
    // });
    // this.meta.addTag({
    //   name: 'viewport',
    //   content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
    // });
  }
}
