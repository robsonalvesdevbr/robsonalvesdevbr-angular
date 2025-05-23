import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  template: '',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasePageComponent {
  readonly bglight = input(false);

  // HACK: This is a workaround for the issue with the `ngClass` directive
  currentClass = () => {
    return {
      'bg-light': this.bglight(),
    };
  };
}
