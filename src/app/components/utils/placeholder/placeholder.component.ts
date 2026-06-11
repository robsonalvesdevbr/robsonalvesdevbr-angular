import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-placeholder',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="skeleton" role="status" aria-busy="true">
      <span class="visually-hidden">Carregando...</span>
      <div class="skeleton__header">
        <div class="skeleton__bar skeleton__bar--title"></div>
        <div class="skeleton__bar skeleton__bar--subtitle"></div>
      </div>
      <div class="skeleton__bar skeleton__bar--content"></div>
    </div>
  `,
  styles: [
    `
      .skeleton {
        padding: 3rem 1.5rem;
      }

      .skeleton__header {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 2rem;
      }

      .skeleton__bar {
        border-radius: 0.375rem;
        background: linear-gradient(
          90deg,
          var(--bs-secondary-bg) 25%,
          var(--bs-tertiary-bg) 50%,
          var(--bs-secondary-bg) 75%
        );
        background-size: 200% 100%;
        animation: skeleton-shimmer 1.5s infinite;
      }

      .skeleton__bar--title {
        width: min(20rem, 60%);
        height: 2rem;
        margin-bottom: 0.75rem;
      }

      .skeleton__bar--subtitle {
        width: min(28rem, 80%);
        height: 1rem;
      }

      .skeleton__bar--content {
        width: 100%;
        height: 12rem;
      }

      @keyframes skeleton-shimmer {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .skeleton__bar {
          animation: none;
        }
      }
    `,
  ],
})
export class PlaceholderComponent {}
