import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { PlaceholderComponent } from './placeholder.component';

describe('PlaceholderComponent', () => {
  let component: PlaceholderComponent;
  let fixture: ComponentFixture<PlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [PlaceholderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaceholderComponent);
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
      expect(componentDef.selectors).toEqual([['app-placeholder']]);
    });

    it('should have inline template', () => {
      const componentDef = (component.constructor as any).ɵcmp;
      expect(componentDef.template).toBeDefined();
    });
  });

  describe('Template Rendering', () => {
    it('should render main skeleton container', () => {
      const skeletonDiv = fixture.nativeElement.querySelector('.skeleton');
      expect(skeletonDiv).toBeTruthy();
    });

    it('should render header with title and subtitle bars', () => {
      const header = fixture.nativeElement.querySelector('.skeleton__header');
      expect(header).toBeTruthy();
      expect(header.querySelector('.skeleton__bar--title')).toBeTruthy();
      expect(header.querySelector('.skeleton__bar--subtitle')).toBeTruthy();
    });

    it('should render content bar', () => {
      const content = fixture.nativeElement.querySelector('.skeleton__bar--content');
      expect(content).toBeTruthy();
    });

    it('should render all bars with the shimmer base class', () => {
      const bars = fixture.nativeElement.querySelectorAll('.skeleton__bar');
      expect(bars.length).toBe(3);
    });
  });

  describe('Accessibility', () => {
    it('should expose status role with aria-busy', () => {
      const skeletonDiv = fixture.nativeElement.querySelector('.skeleton');
      expect(skeletonDiv.getAttribute('role')).toBe('status');
      expect(skeletonDiv.getAttribute('aria-busy')).toBe('true');
    });

    it('should have visually hidden loading text for screen readers', () => {
      const hiddenText = fixture.nativeElement.querySelector('.visually-hidden');
      expect(hiddenText).toBeTruthy();
      expect(hiddenText.textContent).toContain('Carregando');
    });
  });

  describe('Stability', () => {
    it('should keep the same structure across change detection cycles', () => {
      fixture.detectChanges();
      fixture.detectChanges();

      const bars = fixture.nativeElement.querySelectorAll('.skeleton__bar');
      expect(bars.length).toBe(3);
    });
  });
});
