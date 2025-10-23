import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslatePipe } from '@path-pipes/translate.pipe';

@Component({
  selector: 'app-masterhead',
  imports: [NgxPaginationModule, TranslatePipe],
  templateUrl: './masterhead.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasterheadComponent extends BasePageComponent {}
