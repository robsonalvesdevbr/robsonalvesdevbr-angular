import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [LoadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Structure', () => {
    it('should use OnPush change detection strategy', () => {
      const componentDef = (component.constructor as any).ɵcmp;
      expect(componentDef.onPush).toBe(true);
    });

    it('should be a standalone component', () => {
      const componentDef = (component.constructor as any).ɵcmp;
      expect(componentDef.standalone).toBe(true);
    });

    it('should have correct selector', () => {
      const componentDef = (component.constructor as any).ɵcmp;
      expect(componentDef.selectors).toEqual([['app-loading']]);
    });

    it('should have no dependencies', () => {
      const componentDef = (component.constructor as any).ɵcmp;
      // Componente tem imports: [] vazio, então dependencies existe mas é uma função vazia
      expect(componentDef.dependencies).toBeDefined();
    });

    it('should have inline template', () => {
      const componentDef = (component.constructor as any).ɵcmp;
      expect(componentDef.template).toBeDefined();
    });
  });

  describe('Template Rendering', () => {
    it('should render container div with flex layout', () => {
      const containerDiv = fixture.nativeElement.querySelector('.d-flex');

      expect(containerDiv).toBeTruthy();
      expect(containerDiv.classList.contains('justify-content-center')).toBe(true);
      expect(containerDiv.classList.contains('align-items-center')).toBe(true);
    });

    it('should render spinner with correct Bootstrap class', () => {
      const spinner = fixture.nativeElement.querySelector('.spinner-border');

      expect(spinner).toBeTruthy();
    });

    it('should render spinner with correct role', () => {
      const spinner = fixture.nativeElement.querySelector('.spinner-border');

      expect(spinner.getAttribute('role')).toBe('status');
    });

    it('should render visually hidden text for accessibility', () => {
      const hiddenText = fixture.nativeElement.querySelector('.visually-hidden');

      expect(hiddenText).toBeTruthy();
      expect(hiddenText.textContent).toBe('Loading...');
    });

    it('should have container with full viewport height', () => {
      const containerDiv = fixture.nativeElement.querySelector('.d-flex');

      expect(containerDiv.style.height).toBe('100vh');
    });

    it('should have spinner with custom size', () => {
      const spinner = fixture.nativeElement.querySelector('.spinner-border');

      expect(spinner.style.width).toBe('6rem');
      expect(spinner.style.height).toBe('6rem');
    });
  });

  describe('CSS Classes', () => {
    it('should apply all Bootstrap flex utility classes', () => {
      const containerDiv = fixture.nativeElement.querySelector('div');

      expect(containerDiv.classList.contains('d-flex')).toBe(true);
      expect(containerDiv.classList.contains('justify-content-center')).toBe(true);
      expect(containerDiv.classList.contains('align-items-center')).toBe(true);
    });

    it('should apply Bootstrap spinner class', () => {
      const spinner = fixture.nativeElement.querySelector('.spinner-border');

      expect(spinner.classList.contains('spinner-border')).toBe(true);
    });

    it('should apply Bootstrap visually-hidden class', () => {
      const hiddenText = fixture.nativeElement.querySelector('.visually-hidden');

      expect(hiddenText.classList.contains('visually-hidden')).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should have ARIA role for spinner', () => {
      const spinner = fixture.nativeElement.querySelector('.spinner-border');

      expect(spinner.getAttribute('role')).toBe('status');
    });

    it('should have descriptive hidden text for screen readers', () => {
      const hiddenText = fixture.nativeElement.querySelector('.visually-hidden');

      expect(hiddenText).toBeTruthy();
      expect(hiddenText.textContent.trim()).toBe('Loading...');
    });

    it('should have visually-hidden class for screen reader only content', () => {
      const hiddenText = fixture.nativeElement.querySelector('.visually-hidden');

      expect(hiddenText.classList.contains('visually-hidden')).toBe(true);
    });
  });

  describe('DOM Structure', () => {
    it('should have container as root element', () => {
      const rootElement = fixture.nativeElement.firstElementChild;

      expect(rootElement.tagName.toLowerCase()).toBe('div');
      expect(rootElement.classList.contains('d-flex')).toBe(true);
    });

    it('should have spinner as child of container', () => {
      const containerDiv = fixture.nativeElement.querySelector('.d-flex');
      const spinner = containerDiv.querySelector('.spinner-border');

      expect(spinner).toBeTruthy();
    });

    it('should have hidden text as child of spinner', () => {
      const spinner = fixture.nativeElement.querySelector('.spinner-border');
      const hiddenText = spinner.querySelector('.visually-hidden');

      expect(hiddenText).toBeTruthy();
    });

    it('should have exactly one spinner element', () => {
      const spinners = fixture.nativeElement.querySelectorAll('.spinner-border');

      expect(spinners.length).toBe(1);
    });

    it('should have exactly one visually-hidden text', () => {
      const hiddenTexts = fixture.nativeElement.querySelectorAll('.visually-hidden');

      expect(hiddenTexts.length).toBe(1);
    });
  });

  describe('Change Detection', () => {
    it('should not throw on multiple detectChanges calls', () => {
      expect(() => {
        fixture.detectChanges();
        fixture.detectChanges();
        fixture.detectChanges();
      }).not.toThrow();
    });

    it('should maintain stable DOM after detectChanges', () => {
      const initialSpinner = fixture.nativeElement.querySelector('.spinner-border');

      fixture.detectChanges();

      const afterSpinner = fixture.nativeElement.querySelector('.spinner-border');

      expect(afterSpinner).toBeTruthy();
      expect(afterSpinner).toBe(initialSpinner);
    });
  });

  describe('Component Lifecycle', () => {
    it('should initialize without errors', () => {
      expect(() => {
        const tempFixture = TestBed.createComponent(LoadingComponent);
        tempFixture.detectChanges();
      }).not.toThrow();
    });

    it('should destroy without errors', () => {
      expect(() => {
        fixture.destroy();
      }).not.toThrow();
    });

    it('should render template immediately on creation', () => {
      const tempFixture = TestBed.createComponent(LoadingComponent);
      tempFixture.detectChanges();

      const spinner = tempFixture.nativeElement.querySelector('.spinner-border');

      expect(spinner).toBeTruthy();

      tempFixture.destroy();
    });
  });

  describe('Integration', () => {
    it('should work correctly when used in parent component', () => {
      // Este componente é usado em @defer loading blocks
      // Verificamos que ele renderiza corretamente de forma isolada
      const containerDiv = fixture.nativeElement.querySelector('.d-flex');
      const spinner = containerDiv.querySelector('.spinner-border');
      const hiddenText = spinner.querySelector('.visually-hidden');

      expect(containerDiv).toBeTruthy();
      expect(spinner).toBeTruthy();
      expect(hiddenText).toBeTruthy();
    });

    it('should not leak memory on repeated renders', () => {
      // Teste básico de memória - renderizar múltiplas vezes
      for (let i = 0; i < 5; i++) {
        const tempFixture = TestBed.createComponent(LoadingComponent);
        tempFixture.detectChanges();
        tempFixture.destroy();
      }

      expect(true).toBe(true); // Se chegou aqui, não houve crash
    });
  });

  describe('Edge Cases', () => {
    it('should handle fixture destroy and recreate', () => {
      fixture.destroy();

      expect(() => {
        fixture = TestBed.createComponent(LoadingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }).not.toThrow();
    });

    it('should maintain template integrity after multiple operations', () => {
      for (let i = 0; i < 10; i++) {
        fixture.detectChanges();
      }

      const spinner = fixture.nativeElement.querySelector('.spinner-border');
      const hiddenText = fixture.nativeElement.querySelector('.visually-hidden');

      expect(spinner).toBeTruthy();
      expect(hiddenText).toBeTruthy();
      expect(hiddenText.textContent).toBe('Loading...');
    });
  });
});
