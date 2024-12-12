import { Component, inject, OnInit } from '@angular/core';
import { NavigationComponent } from './components/pages/navigation/navigation.component';
import { MasterheadComponent } from './components/pages/masterhead/masterhead.component';
import { AboutComponent } from './components/pages/about/about.component';
import { GraduationComponent } from './components/pages/graduation/graduation.component';
import { CourseComponent } from './components/pages/course/course.component';
import { FormationCourseComponent } from './components/pages/formationcourse/formationcourse.component';
import { BookComponent } from './components/pages/book/book.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { FooterComponent } from './components/pages/footer/footer.component';
import { PlaceholderComponent } from '@path-components/utils/placeholder/placeholder.component';
import { LoadingComponent } from '@path-components/utils/loading/loading.component';

@Component({
  selector: 'app-root',
  imports: [
    NavigationComponent,
    MasterheadComponent,
    AboutComponent,
    GraduationComponent,
    CourseComponent,
    FormationCourseComponent,
    BookComponent,
    ContactComponent,
    FooterComponent,
    PlaceholderComponent,
    LoadingComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Robson Candido dos Santos Alves';
}
