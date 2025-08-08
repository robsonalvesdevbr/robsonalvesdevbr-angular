import { Component } from '@angular/core';
import { LoadingComponent } from '@path-components/utils/loading/loading.component';
import { PlaceholderComponent } from '@path-components/utils/placeholder/placeholder.component';
import { AboutComponent } from './components/pages/about/about.component';
import { BookComponent } from './components/pages/book/book.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { CourseComponent } from './components/pages/course/course.component';
import { FooterComponent } from './components/pages/footer/footer.component';
import { FormationCourseComponent } from './components/pages/formationcourse/formationcourse.component';
import { GraduationComponent } from './components/pages/graduation/graduation.component';
import { MasterheadComponent } from './components/pages/masterhead/masterhead.component';
import { NavigationComponent } from './components/pages/navigation/navigation.component';

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
