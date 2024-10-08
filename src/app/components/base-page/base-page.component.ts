import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core'
import { GoogleAnalyticsService } from '@path-services/google-analytics.service'

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasePageComponent  {
  @Input({ required: false }) bglight: boolean = false
  protected $gaService = inject(GoogleAnalyticsService)

  currentClass = () => {
    return {
      'bg-light': this.bglight,
    }
  }
}
