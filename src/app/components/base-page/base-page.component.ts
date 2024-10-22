import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core'

@Component({
  template: '',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class BasePageComponent {
  @Input({ required: false }) bglight: boolean = false

  currentClass = () => {
    return {
      'bg-light': this.bglight,
    }
  }
}
