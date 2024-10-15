import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core'
import { GoogleAnalyticsService } from '@path-services/google-analytics.service'
import { Meta } from '@angular/platform-browser'
import { DataService } from '@path-services/data-service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'Robson Candido dos Santos Alves'
  courses = this.dataService.getCourses()
  graduations = this.dataService.getGraduations()
  books = this.dataService.getBooks()
  formationCourses = this.dataService.getFormationCourses()
  profile = this.dataService.getProfile()
  private readonly _$gaService = inject(GoogleAnalyticsService)
  private readonly meta = inject(Meta)

  constructor(private readonly dataService: DataService) {}

  ngOnInit(): void {
    this._$gaService.init()
    this.meta.addTag({ name: 'title', content: 'Robson Candido dos Santos Alves' })
    this.meta.addTag({ name: 'description', content: 'My page profile' })
    this.meta.addTag({ name: 'keywords', content: 'Robson Candido dos Santos Alves' })
    this.meta.addTag({ name: 'author', content: 'Robson Candido dos Santos Alves' })
    this.meta.addTag({ name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' })
  }
}
