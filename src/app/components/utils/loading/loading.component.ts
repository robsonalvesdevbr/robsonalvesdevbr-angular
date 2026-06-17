import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@path-pipes/translate.pipe';

@Component({
  selector: 'app-loading',
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="loading-container">
      <div class="spinner-border spinner-custom" role="status" aria-live="polite">
        <span class="visually-hidden">{{ 'common.loading' | translate }}</span>
      </div>
    </div>
  `,
  styles: [`
    .loading-container {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .spinner-custom {
      width: 6rem;
      height: 6rem;
    }
  `],
})
export class LoadingComponent {}
