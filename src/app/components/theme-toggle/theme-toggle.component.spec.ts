import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ThemeToggleComponent } from './theme-toggle.component';
import { ThemeService } from '@path-services/theme.service';

describe('ThemeToggleComponent', () => {
  let fixture: ComponentFixture<ThemeToggleComponent>;
  let component: ThemeToggleComponent;
  let themeService: jasmine.SpyObj<ThemeService> & { resolvedTheme: ReturnType<typeof signal> };

  beforeEach(async () => {
    const resolvedTheme = signal<'light' | 'dark'>('light');
    const themeSpy = jasmine.createSpyObj('ThemeService', ['toggleTheme']);
    themeSpy.resolvedTheme = resolvedTheme;

    await TestBed.configureTestingModule({
      imports: [ThemeToggleComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: ThemeService, useValue: themeSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeToggleComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService) as typeof themeService;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should report isDark as false when resolved theme is light', () => {
    expect(component.isDark()).toBe(false);
  });

  it('should report isDark as true when resolved theme is dark', () => {
    themeService.resolvedTheme.set('dark');
    expect(component.isDark()).toBe(true);
  });

  it('should delegate toggle to ThemeService', () => {
    component.toggle();
    expect(themeService.toggleTheme).toHaveBeenCalled();
  });
});
