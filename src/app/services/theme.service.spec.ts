import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.removeItem('app-theme');
    document.documentElement.removeAttribute('data-bs-theme');

    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), ThemeService],
    });
  });

  afterEach(() => {
    localStorage.removeItem('app-theme');
    document.documentElement.removeAttribute('data-bs-theme');
  });

  it('should be created', () => {
    const service = TestBed.inject(ThemeService);
    expect(service).toBeTruthy();
  });

  it('should default to auto theme', () => {
    const service = TestBed.inject(ThemeService);
    expect(service.theme()).toBe('auto');
  });

  it('should restore theme from localStorage', () => {
    localStorage.setItem('app-theme', 'dark');
    const service = TestBed.inject(ThemeService);
    expect(service.theme()).toBe('dark');
    expect(service.resolvedTheme()).toBe('dark');
  });

  it('should ignore invalid stored theme', () => {
    localStorage.setItem('app-theme', 'invalid');
    const service = TestBed.inject(ThemeService);
    expect(service.theme()).toBe('auto');
  });

  it('should persist theme on setTheme', () => {
    const service = TestBed.inject(ThemeService);
    service.setTheme('dark');
    expect(localStorage.getItem('app-theme')).toBe('dark');
    expect(service.resolvedTheme()).toBe('dark');
  });

  it('should not accept invalid theme on setTheme', () => {
    const service = TestBed.inject(ThemeService);
    service.setTheme('invalid' as never);
    expect(service.theme()).toBe('auto');
  });

  it('should toggle between light and dark', () => {
    const service = TestBed.inject(ThemeService);
    service.setTheme('light');
    service.toggleTheme();
    expect(service.resolvedTheme()).toBe('dark');
    service.toggleTheme();
    expect(service.resolvedTheme()).toBe('light');
  });

  it('should apply data-bs-theme attribute on document element', () => {
    const service = TestBed.inject(ThemeService);
    service.setTheme('dark');
    TestBed.tick();
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('dark');

    service.setTheme('light');
    TestBed.tick();
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('light');
  });

  it('should resolve auto theme based on system preference', () => {
    const service = TestBed.inject(ThemeService);
    expect(service.theme()).toBe('auto');
    expect(['light', 'dark']).toContain(service.resolvedTheme());
  });
});
