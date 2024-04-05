import { Injectable } from '@angular/core'
import { filter } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { NavigationEnd, Router } from '@angular/router'

declare var gtag: any

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  constructor(private _router: Router) {
    this._router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((e) => {
      if (e instanceof NavigationEnd) {
        gtag('js', new Date())
        gtag('config', environment.googleAnalytics)
      }
    })
  }

  init() {
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${environment.googleAnalytics}`
    script.async = true
    document.getElementsByTagName('head')[0].appendChild(script)

    const gtagEl = document.createElement('script')
    const gtagBody = document.createTextNode(`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
    `)
    gtagEl.appendChild(gtagBody)
    document.body.appendChild(gtagEl)
  }

  logEvent(event: string, category: string, label: string) {
    gtag('event', event, {
      event_category: category,
      event_label: label
    });
  }

  logSet(campaign: string, id: string, source: string, name: string, term: string) {
    gtag('set', campaign, {
      id: id,
      source: source,
      name: name,
      term: term,
    });
  }

  logPagView(title: string){
    gtag('event', 'page_view', {
      page_title: title,
  });
  }
}
