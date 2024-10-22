import { Injectable, inject } from '@angular/core'
import { filter } from 'rxjs/operators'
import { environment } from '@path-environments/environment'
import { NavigationEnd, Router, Event } from '@angular/router'
import { Title } from '@angular/platform-browser'

declare let gtag: any

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  private readonly _router = inject(Router)
  private readonly _title = inject(Title)

  constructor() {
    this._initRouterEvents()
    this.init()
  }

  private _initRouterEvents(): void {
    this._router.events.pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this._sendPageView()
    })
  }

  private _sendPageView(): void {
    gtag('js', new Date())
    gtag('config', environment.googleAnalytics, {
      send_page_view: false,
      cookie_flags: 'SameSite=None; Secure',
    })
  }

  private init(): void {
    this._injectAnalyticsScript()
    this._injectGtagScript()
  }

  private _injectAnalyticsScript(): void {
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${environment.googleAnalytics}`
    script.async = true
    document.getElementsByTagName('head')[0].appendChild(script)
  }

  private _injectGtagScript(): void {
    const gtagScript = document.createElement('script')
    const gtagBody = document.createTextNode(`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
    `)
    gtagScript.appendChild(gtagBody)
    document.body.appendChild(gtagScript)
  }

  logEvent(event: string, category: string, label: string): void {
    gtag('event', event, {
      event_category: category,
      event_label: label,
    })
  }

  logSet(campaign: string, id: string, source: string, name: string, term: string): void {
    gtag('set', campaign, {
      id: id,
      source: source,
      name: name,
      term: term,
    })
  }

  logPageView(title: string): void {
    gtag('event', 'page_view', {
      page_title: title,
    })

    gtag('event', 'screen_view', {
      app_name: 'robsonalves',
      screen_name: title,
    })
  }
}
