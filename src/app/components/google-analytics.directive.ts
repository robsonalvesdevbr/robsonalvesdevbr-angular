import { Directive,HostListener, Input } from '@angular/core';
import { GoogleAnalyticsService } from '../services/google-analytics.service';

@Directive({
  selector: '[appGoogleAnalytics]'
})
export class GoogleAnalyticsDirective {

  @Input('appGoogleAnalytics') option:any;

  constructor(protected $gaService: GoogleAnalyticsService){}

  @HostListener('click', ['$event']) onClick(){
    this.$gaService.logEvent(this.option.event, this.option.category, this.option.label, this.option.value);
  }

}
