import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { TranslatePipe } from '@path-pipes/translate.pipe';
import { DataService } from '@path-services/data-service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, NgxPaginationModule, NgOptimizedImage, TranslatePipe],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent extends BasePageComponent {
  private readonly dataService = inject(DataService);

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
