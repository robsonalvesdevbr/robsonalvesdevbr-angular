import { Directive, HostListener, Input } from '@angular/core'
import { GoogleAnalyticsService } from '../services/google-analytics.service'

@Directive({
  selector: '[appGoogleAnalytics]',
})
export class GoogleAnalyticsDirective {
  @Input('appGoogleAnalytics') option: any

  constructor(protected $gaService: GoogleAnalyticsService) {}


  @HostListener('click', ['$event']) onClick() {

    this.$gaService.logEvent(this.option.event, this.option.category, this.option.label)

    if(this.option.logType === 'page_view')
      this.$gaService.logPagView(this.option.title)
    else if(this.option.logType === 'set')
      this.$gaService.logSet('campaign', 'robsonalves', 'azure', 'black_friday_promotion', `${this.option.category}+${this.option.label}` )
  }
}
