import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core'
import { IGraduation } from '@path-interfaces/IGraduation'
import { BasePageComponent } from '@path-components/base-page/base-page.component'

@Component({
  selector: 'app-graduation',
  templateUrl: './graduation.component.html',
  styleUrls: ['./graduation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraduationComponent extends BasePageComponent {
  graduations = input.required<IGraduation[]>({ alias: 'graduations' })
}
