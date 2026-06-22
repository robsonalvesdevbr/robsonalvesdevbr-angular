import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '@path-pipes/translate.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { AnalyticsService } from '@path-services/analytics.service';

@Component({
  selector: 'app-footer',
  imports: [NgxPaginationModule, TranslatePipe],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private readonly analyticsService = inject(AnalyticsService);

  onFooterLinkClick(platform: string): void {
    this.analyticsService.trackSocialLinkClick(platform, 'footer');
  }
}
