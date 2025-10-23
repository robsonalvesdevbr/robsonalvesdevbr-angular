import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageSwitcherComponent } from './language-switcher.component';
import { LanguageService } from '@path-services/language.service';
import { signal, provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('LanguageSwitcherComponent', () => {
  let component: LanguageSwitcherComponent;
  let fixture: ComponentFixture<LanguageSwitcherComponent>;
  let mockLanguageService: jasmine.SpyObj<LanguageService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('LanguageService', ['setLanguage', 'toggleLanguage'], {
      currentLanguage: signal('pt-BR')
    });

    await TestBed.configureTestingModule({
      imports: [LanguageSwitcherComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: LanguageService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSwitcherComponent);
    component = fixture.componentInstance;
    mockLanguageService = TestBed.inject(LanguageService) as jasmine.SpyObj<LanguageService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display Brazilian flag for PT-BR', () => {
    const flag = fixture.debugElement.query(By.css('[data-testid="language-flag"]'));
    expect(flag.nativeElement.textContent.trim()).toBe('🇧🇷');
  });

  it('should have proper aria-label for PT-BR', () => {
    const button = fixture.debugElement.query(By.css('[data-testid="language-switcher-button"]'));
    expect(button.nativeElement.getAttribute('aria-label')).toBe('Selecionar idioma');
  });

  it('should toggle dropdown when clicking button', () => {
    const button = fixture.debugElement.query(By.css('[data-testid="language-switcher-button"]'));

    // Initially closed
    expect(component.isOpen()).toBe(false);

    // Click to open
    button.nativeElement.click();
    fixture.detectChanges();
    expect(component.isOpen()).toBe(true);

    // Click to close
    button.nativeElement.click();
    fixture.detectChanges();
    expect(component.isOpen()).toBe(false);
  });

  it('should close dropdown when selecting a language', () => {
    // Open dropdown
    component.isOpen.set(true);
    fixture.detectChanges();

    const ptBrButton = fixture.debugElement.query(By.css('[data-testid="lang-pt-br"]'));
    ptBrButton.nativeElement.click();
    fixture.detectChanges();

    // Dropdown should close immediately
    expect(component.isOpen()).toBe(false);

    expect(mockLanguageService.setLanguage).toHaveBeenCalledWith('pt-BR');
  });

  it('should call setLanguage when selecting EN-US', () => {
    // Open dropdown before querying items (uses *ngIf)
    component.isOpen.set(true);
    fixture.detectChanges();

    const enUsButton = fixture.debugElement.query(By.css('[data-testid="lang-en-us"]'));
    enUsButton.nativeElement.click();

    expect(mockLanguageService.setLanguage).toHaveBeenCalledWith('en-US');
  });

  it('should have data-testid for testing', () => {
    const button = fixture.debugElement.query(By.css('[data-testid="language-switcher-button"]'));
    expect(button).toBeTruthy();

    const flag = fixture.debugElement.query(By.css('[data-testid="language-flag"]'));
    expect(flag).toBeTruthy();
  });

  it('should compute language info correctly for PT-BR', () => {
    const info = component.languageInfo();
    expect(info.code).toBe('PT-BR');
    expect(info.flag).toBe('🇧🇷');
    expect(info.label).toBe('Português');
    expect(info.ariaLabel).toBe('Selecionar idioma');
  });

  it('should display language options in dropdown', () => {
    // Open dropdown before querying items (uses *ngIf)
    component.isOpen.set(true);
    fixture.detectChanges();

    const ptBrOption = fixture.debugElement.query(By.css('[data-testid="lang-pt-br"]'));
    const enUsOption = fixture.debugElement.query(By.css('[data-testid="lang-en-us"]'));

    expect(ptBrOption).toBeTruthy();
    expect(enUsOption).toBeTruthy();
    expect(ptBrOption.nativeElement.textContent).toContain('Português (BR)');
    expect(enUsOption.nativeElement.textContent).toContain('English (US)');
  });

  it('should mark current language as active', () => {
    // Open dropdown before querying items (uses *ngIf)
    component.isOpen.set(true);
    fixture.detectChanges();

    const ptBrOption = fixture.debugElement.query(By.css('[data-testid="lang-pt-br"]'));
    expect(ptBrOption.nativeElement.classList.contains('active')).toBe(true);
  });

  it('should emit languageSelected when a language is chosen', () => {
    spyOn(component.languageSelected, 'emit');
    component.isOpen.set(true);
    fixture.detectChanges();

    const enUsButton = fixture.debugElement.query(By.css('[data-testid="lang-en-us"]'));
    enUsButton.nativeElement.click();

    expect(component.languageSelected.emit).toHaveBeenCalled();
  });

  it('should update aria-expanded when toggling dropdown', () => {
    const button = fixture.debugElement.query(By.css('[data-testid="language-switcher-button"]'));
    expect(button.nativeElement.getAttribute('aria-expanded')).toBe('false');

    button.nativeElement.click();
    fixture.detectChanges();
    expect(button.nativeElement.getAttribute('aria-expanded')).toBe('true');
  });

  it('should close when clicking outside', () => {
    component.isOpen.set(true);
    fixture.detectChanges();

    // Dispara um click no document simulando clique fora do componente
    document.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.isOpen()).toBe(false);
  });
});
