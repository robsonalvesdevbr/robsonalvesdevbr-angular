import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core'
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
import { Meta } from '@angular/platform-browser'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'Robson Candido dos Santos Alves'
  profile: IProfile = Profile
  courses: ICourse[] = Courses
  graduations: IGraduation[] = Graduations
  books: IBook[] = Books
  formationCourses: IFormationCourse[] = FormationCourses
  private _$gaService = inject(GoogleAnalyticsService)
  private meta = inject(Meta)

  ngOnInit(): void {
    this._$gaService.init()
    this.meta.addTag({ name: 'title', content: 'Robson Candido dos Santos Alves' })
    this.meta.addTag({ name: 'description', content: 'My page profile' })
    this.meta.addTag({ name: 'keywords', content: 'Robson Candido dos Santos Alves' })
    this.meta.addTag({ name: 'author', content: 'Robson Candido dos Santos Alves' })
    this.meta.addTag({ name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' })
  }
}
