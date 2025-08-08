import { Injectable } from '@angular/core';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() { }

  public event(eventName: string, params: {}) {
    // gtag('event', eventName, params);
  }
}
