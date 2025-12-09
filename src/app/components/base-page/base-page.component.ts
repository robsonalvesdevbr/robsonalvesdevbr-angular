import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  template: '',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasePageComponent {
  readonly bglight = input(false);

  currentClass = computed(() => ({
    'bg-light': this.bglight(),
  }));
}
