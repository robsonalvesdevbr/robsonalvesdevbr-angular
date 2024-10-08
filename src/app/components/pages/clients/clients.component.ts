import { ChangeDetectionStrategy, Component } from '@angular/core'
import { BasePageComponent } from '@path-components/base-page/base-page.component'

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsComponent extends BasePageComponent {}
