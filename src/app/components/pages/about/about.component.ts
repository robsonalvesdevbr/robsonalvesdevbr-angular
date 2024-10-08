import { BasePageComponent } from '@path-components/base-page/base-page.component'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent extends BasePageComponent {}
