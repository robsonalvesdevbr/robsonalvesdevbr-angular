import { Directive, HostListener, inject, Input } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { GoogleAnalyticsService } from '@path-services/google-analytics.service'

interface AnalyticsOption {
  event: string
  category: string
  label: string
  logType: 'page_view' | 'set'
  title?: string
}

@Directive({
  selector: '[appGoogleAnalytics]',
  standalone: true,
})
export class GoogleAnalyticsDirective {
  @Input('appGoogleAnalytics') option!: AnalyticsOption

  private readonly _gaService = inject(GoogleAnalyticsService)
  private readonly _titleService = inject(Title)

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    if (this._titleService.getTitle().toLowerCase() === 'robson alves - desenvolvimento de softwares') return

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
