import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ThemeService } from '@path-services/theme.service';
import { TranslatePipe } from '@path-pipes/translate.pipe';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <button
      type="button"
      class="theme-toggle-btn"
      data-testid="theme-toggle"
      (click)="toggle()"
      [attr.aria-label]="
        (isDark() ? 'navigation.themeToggleToLight' : 'navigation.themeToggleToDark') | translate
      "
    >
      <i
        class="bi"
        [class.bi-sun-fill]="isDark()"
        [class.bi-moon-stars-fill]="!isDark()"
        aria-hidden="true"
      ></i>
    </button>
  `,
  styles: [
    `
      .theme-toggle-btn {
        background: transparent;
        border: none;
        color: rgba(255, 255, 255, 0.75);
        font-size: 1.1rem;
        padding: 0.25rem 0.5rem;
        cursor: pointer;
        transition: color 0.2s ease-in-out;
      }

      .theme-toggle-btn:hover,
      .theme-toggle-btn:focus-visible {
        color: #ffc800;
      }

      .theme-toggle-btn:focus-visible {
        outline: 3px solid #ffc800;
        outline-offset: 2px;
        border-radius: 0.25rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent {
  private readonly themeService = inject(ThemeService);

  isDark = computed(() => this.themeService.resolvedTheme() === 'dark');

  toggle(): void {
    this.themeService.toggleTheme();
  }
}
