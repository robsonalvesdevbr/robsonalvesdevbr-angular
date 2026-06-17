import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { LoadingComponent } from './loading.component';

const i18nFlush = { common: { loading: 'Loading...' } };

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideHttpClient(withXhr()), provideHttpClientTesting()],
      imports: [LoadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;

    const httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();

    httpMock.expectOne('/assets/i18n/pt-BR.json').flush(i18nFlush);
    httpMock.expectOne('/assets/i18n/en-US.json').flush(i18nFlush);

    fixture.detectChanges();
    await fixture.whenStable();
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

    it('should have inline template', () => {
      const componentDef = (component.constructor as any).ɵcmp;
      expect(componentDef.template).toBeDefined();
    });
  });

  describe('Template Rendering', () => {
    it('should render container with loading-container class', () => {
      const containerDiv = fixture.nativeElement.querySelector('.loading-container');
      expect(containerDiv).toBeTruthy();
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
      expect(hiddenText.textContent.trim()).toBe('Loading...');
    });

    it('should have spinner with custom size class', () => {
      const spinner = fixture.nativeElement.querySelector('.spinner-custom');
      expect(spinner).toBeTruthy();
    });
  });

  describe('CSS Classes', () => {
    it('should apply loading-container class to root div', () => {
      const containerDiv = fixture.nativeElement.querySelector('div');
      expect(containerDiv.classList.contains('loading-container')).toBe(true);
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
      expect(rootElement.classList.contains('loading-container')).toBe(true);
    });

    it('should have spinner as child of container', () => {
      const containerDiv = fixture.nativeElement.querySelector('.loading-container');
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
    it('should destroy without errors', () => {
      expect(() => {
        fixture.destroy();
      }).not.toThrow();
    });
  });

  describe('Integration', () => {
    it('should work correctly when used in parent component', () => {
      const containerDiv = fixture.nativeElement.querySelector('.loading-container');
      const spinner = containerDiv.querySelector('.spinner-border');
      const hiddenText = spinner.querySelector('.visually-hidden');

      expect(containerDiv).toBeTruthy();
      expect(spinner).toBeTruthy();
      expect(hiddenText).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should maintain template integrity after multiple operations', () => {
      for (let i = 0; i < 10; i++) {
        fixture.detectChanges();
      }

      const spinner = fixture.nativeElement.querySelector('.spinner-border');
      const hiddenText = fixture.nativeElement.querySelector('.visually-hidden');

      expect(spinner).toBeTruthy();
      expect(hiddenText).toBeTruthy();
      expect(hiddenText.textContent.trim()).toBe('Loading...');
    });
  });
});
