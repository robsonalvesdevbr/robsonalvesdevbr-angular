import { Component } from '@angular/core';

@Component({
  selector: 'app-placeholder',
  imports: [],
  template: `
    <div class="placeholder">
      <div class="placeholder__header">
        <div class="placeholder__header__title"></div>
        <div class="placeholder__header__subtitle"></div>
      </div>
      <div class="placeholder__content"></div>
    </div>
  `,
  styles: [],
})
export class PlaceholderComponent {}
