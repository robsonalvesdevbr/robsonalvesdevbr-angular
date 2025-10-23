import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@path-pipes/translate.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-footer',
  imports: [NgxPaginationModule, TranslatePipe],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
