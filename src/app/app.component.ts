import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ICourse } from '@path-interfaces/ICourse'
import { Courses } from '@path-data/Course'
import { IGraduation } from '@path-interfaces/IGraduation'
import { Graduations } from '@path-data/Graduation'
import { IBook } from '@path-interfaces/IBook'
import { Books } from '@path-data/Book'
import { IFormationCourse } from '@path-interfaces/IFormationCourse'
import { FormationCourses } from '@path-data/FormationCourse'
import { IProfile } from '@path-interfaces/IProfile'
import { Profile } from '@path-data/Profile'
import { GoogleAnalyticsService } from '@path-services/google-analytics.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'Robson Candido dos Santos Alves'
  profile: IProfile = Profile
  courses: ICourse[] = Courses
  graduations: IGraduation[] = Graduations
  books: IBook[] = Books
  formationCourses: IFormationCourse[] = FormationCourses

  constructor(private _$gaService: GoogleAnalyticsService) {}

  ngOnInit(): void {
    this._$gaService.init()
  }
}
