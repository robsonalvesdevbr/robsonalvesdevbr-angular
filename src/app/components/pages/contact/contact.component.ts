import { Component, Input } from '@angular/core'
import { IProfile } from '../../../interfaces/IProfile'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  @Input({ required: true }) profiles: IProfile = {} as IProfile
  @Input({ required: false }) bglight: boolean = false

  asIsOrder(a: any, b: any) {
    return 1
  }
}
