import { Injectable, signal, computed, effect, inject, DOCUMENT } from '@angular/core';

export type Theme = 'light' | 'dark' | 'auto';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'app-theme';
  private readonly DEFAULT_THEME: Theme = 'auto';

  private readonly document = inject(DOCUMENT);

  // Signal para o tema escolhido pelo usuário
  theme = signal<Theme>(this.getInitialTheme());

  // Signal para a preferência do sistema operacional
  private systemPrefersDark = signal<boolean>(this.getSystemPrefersDark());

  // Tema efetivamente aplicado ('auto' resolve para a preferência do sistema)
  resolvedTheme = computed<'light' | 'dark'>(() => {
    const theme = this.theme();
    if (theme === 'auto') {
      return this.systemPrefersDark() ? 'dark' : 'light';
    }
    return theme;
  });

  constructor() {
    // Acompanha mudanças na preferência do sistema
    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
    mediaQuery?.addEventListener?.('change', event => {
      this.systemPrefersDark.set(event.matches);
    });

    // Aplica o tema no <html> (Bootstrap 5.3 usa data-bs-theme)
    effect(() => {
      this.document.documentElement.setAttribute('data-bs-theme', this.resolvedTheme());
    });
  }

  private getInitialTheme(): Theme {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored && this.isValidTheme(stored)) {
        return stored;
      }
    } catch {
      // ignore storage errors (e.g., storage disabled)
    }
    return this.DEFAULT_THEME;
  }

  private getSystemPrefersDark(): boolean {
    return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false;
  }

  setTheme(theme: Theme): void {
    if (!this.isValidTheme(theme)) return;

    this.theme.set(theme);
    try {
      localStorage.setItem(this.STORAGE_KEY, theme);
    } catch {
      // ignore storage errors
    }
  }

  toggleTheme(): void {
    this.setTheme(this.resolvedTheme() === 'dark' ? 'light' : 'dark');
  }

  private isValidTheme(theme: string): theme is Theme {
    return theme === 'light' || theme === 'dark' || theme === 'auto';
  }
}
