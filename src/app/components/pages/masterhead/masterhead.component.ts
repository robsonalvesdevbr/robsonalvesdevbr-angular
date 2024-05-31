import { ChangeDetectionStrategy, Component } from '@angular/core'
import { BasePageComponent } from '@path-components/base-page/base-page.component'

@Component({
  selector: 'app-masterhead',
  templateUrl: './masterhead.component.html',
  styleUrls: ['./masterhead.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasterheadComponent extends BasePageComponent {}
