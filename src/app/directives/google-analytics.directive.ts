import { Directive, HostListener, inject, Input } from '@angular/core'
import { AnalyticsOption } from '@path-interfaces/IAnalyticsOption'
import { GoogleAnalyticsService } from '@path-services/google-analytics.service'

@Directive({
  selector: '[appGoogleAnalytics]',
  standalone: true,
})
export class GoogleAnalyticsDirective {
  @Input('appGoogleAnalytics') option!: AnalyticsOption

  private readonly _gaService = inject(GoogleAnalyticsService)

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    const { event: eventName, category, label, logType, title } = this.option

    // Log the event using Google Analytics service
    this._gaService.logEvent(eventName, category, label)

    // Handle specific log types
    if (logType === 'page_view' && title) {
      this._gaService.logPageView(title)
    } else if (logType === 'set') {
      const campaignData = `${category}+${label}`
      this._gaService.logSet('campaign', 'robsonalves', 'azure', 'black_friday_promotion', campaignData)
    }
  }
}
