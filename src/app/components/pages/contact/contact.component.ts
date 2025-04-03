import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { GoogleAnalyticsService } from '@hakimio/ngx-google-analytics';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { DataService } from '@path-services/data-service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent extends BasePageComponent implements OnInit {
  ngOnInit(): void {
    this._gaService.pageView('/#contact', {
      title: 'Contact',
    });
  }
  private readonly dataService = inject(DataService);

  private readonly _gaService = inject(GoogleAnalyticsService);
  profiles = signal(this.dataService.getProfile());

  asIsOrder = (): number => 1;

  // Escreva uma funcáo que retorne a idade de uma pessoa com base na data de nascimento
  calcularIdade = (birthDate: Date): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth() - birth.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };
}
