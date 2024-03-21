import { Component } from '@angular/core'
import { ICourse } from './interfaces/ICourse'
import { Courses } from './data/Course'
import { IGraduation } from './interfaces/IGraduation'
import { Graduations } from './data/Graduation'
import { IBook } from './interfaces/IBook'
import { Books } from './data/Book'
import { IFormationCourse } from './interfaces/IFormationCourse'
import { FormationCourses } from './data/FormationCourse'
import { IProfile } from './interfaces/IProfile'
import { Profile } from './data/Profile'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Robson Candido dos Santos Alves'
  profile: IProfile = Profile
  courses: ICourse[] = Courses
  graduations: IGraduation[] = Graduations
  books: IBook[] = Books
  formationCourses: IFormationCourse[] = FormationCourses
}
