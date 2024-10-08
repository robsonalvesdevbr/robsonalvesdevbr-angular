import { ChangeDetectionStrategy, Component } from '@angular/core'
import { BasePageComponent } from '@path-components/base-page/base-page.component'

@Component({
  selector: 'app-portifoliogrid',
  templateUrl: './portifoliogrid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortifoliogridComponent extends BasePageComponent {}
