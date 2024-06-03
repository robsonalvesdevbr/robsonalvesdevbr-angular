import { Directive, HostListener, Input, inject, input } from '@angular/core'
import { GoogleAnalyticsService } from '@path-services/google-analytics.service'

@Directive({
  selector: '[appGoogleAnalytics]',
})
export class GoogleAnalyticsDirective {
  option = input.required<any>({ alias: 'appGoogleAnalytics' })
  $gaService = inject(GoogleAnalyticsService)

  @HostListener('click', ['$event']) onClick() {
    this.$gaService.logEvent(this.option().event, this.option().category, this.option().label)

    if (this.option().logType === 'page_view') this.$gaService.logPagView(this.option().title)
    else if (this.option().logType === 'set') this.$gaService.logSet('campaign', 'robsonalves', 'azure', 'black_friday_promotion', `${this.option().category}+${this.option().label}`)
  }
}
