import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { CommonModule } from '@angular/common';
import { GoogleAnalyticsDirective } from '@path-app/directives/google-analytics.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataService } from '@path-services/data-service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, NgxPaginationModule, GoogleAnalyticsDirective],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent extends BasePageComponent {
  private readonly dataService = inject(DataService);
  profiles = this.dataService.getProfile();

  asIsOrder = (a: any, b: any): number => 1;

  calcularIdade = (nascimento: Date): number => {
    const idadeDifMs = Date.now() - nascimento.getTime();
    const idadeData = new Date(idadeDifMs);
    return idadeData.getUTCFullYear() - 1970;
  };
}
