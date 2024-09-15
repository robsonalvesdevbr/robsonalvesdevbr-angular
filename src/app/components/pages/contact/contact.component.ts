import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core'
import { IProfile } from '@path-interfaces/IProfile'
import { BasePageComponent } from '@path-components/base-page/base-page.component'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent extends BasePageComponent {
  profiles = input.required<IProfile>({ alias: 'profiles' })

  asIsOrder = (a: any, b: any): number => 1

  calcularIdade = (nascimento: Date): number => {
    const idadeDifMs = Date.now() - nascimento.getTime()
    const idadeData = new Date(idadeDifMs)
    return idadeData.getUTCFullYear() - 1970
  }
}
