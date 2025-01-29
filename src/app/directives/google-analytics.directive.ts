import { Directive, HostListener, inject, Input } from '@angular/core';
import { GoogleAnalyticsService } from '@hakimio/ngx-google-analytics';
import { IAnalyticsOption } from '@path-interfaces/IAnalyticsOption';

@Directive({
  selector: '[appGoogleAnalytics]',
})
export class GoogleAnalyticsDirective {
  @Input('appGoogleAnalytics') option!: IAnalyticsOption;

  private readonly _gaService = inject(GoogleAnalyticsService);

  @HostListener('click', ['$event'])
  onClick(): void {
    const eventName = this.option.eventName;
    const category = this.option.category;
    const label = this.option.label;
    const logType = this.option.logType;
    const title = this.option.title;

    this._gaService.event(eventName, {
            category: category,
            label: label,
        });
  }
}
