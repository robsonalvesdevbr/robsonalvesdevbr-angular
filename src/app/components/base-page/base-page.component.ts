import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  template: '',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasePageComponent {
  @Input({ required: false }) bglight: boolean = false;

  // HACK: This is a workaround for the issue with the `ngClass` directive
  currentClass = () => {
    return {
      'bg-light': this.bglight,
    };
  };
}
