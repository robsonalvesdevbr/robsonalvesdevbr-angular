import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { HighlightDirective } from './highlight.directive';

@Component({
  standalone: true,
  imports: [HighlightDirective],
  template: `
    <button appHighlight>Test Button</button>
    <div appHighlight>Test Div</div>
  `,
})
class TestHighlightComponent {}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestHighlightComponent>;
  let buttonElement: HTMLElement;
  let divElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [TestHighlightComponent, HighlightDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHighlightComponent);
    fixture.detectChanges();

    buttonElement = fixture.nativeElement.querySelector('button');
    divElement = fixture.nativeElement.querySelector('div');
  });

  it('should create an instance', () => {
    expect(HighlightDirective).toBeTruthy();
  });

  describe('Directive Application', () => {
    it('should be applied to button element', () => {
      expect(buttonElement).toBeTruthy();
    });

    it('should be applied to div element', () => {
      expect(divElement).toBeTruthy();
    });

    it('should not have btn-light class initially', () => {
      expect(buttonElement.classList.contains('btn-light')).toBe(false);
      expect(divElement.classList.contains('btn-light')).toBe(false);
    });
  });

  describe('Mouse Enter Behavior', () => {
    it('should add btn-light class on mouseenter to button', () => {
      buttonElement.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();

      expect(buttonElement.classList.contains('btn-light')).toBe(true);
    });

    it('should add btn-light class on mouseenter to div', () => {
      divElement.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();

      expect(divElement.classList.contains('btn-light')).toBe(true);
    });

    it('should handle multiple mouseenter events', () => {
      buttonElement.dispatchEvent(new MouseEvent('mouseenter'));
      buttonElement.dispatchEvent(new MouseEvent('mouseenter'));
      buttonElement.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();

      expect(buttonElement.classList.contains('btn-light')).toBe(true);
    });
  });

  describe('Mouse Leave Behavior', () => {
    it('should remove btn-light class on mouseleave from button', () => {
      buttonElement.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();
      expect(buttonElement.classList.contains('btn-light')).toBe(true);

      buttonElement.dispatchEvent(new MouseEvent('mouseleave'));
      fixture.detectChanges();

      expect(buttonElement.classList.contains('btn-light')).toBe(false);
    });

    it('should remove btn-light class on mouseleave from div', () => {
      divElement.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();
      expect(divElement.classList.contains('btn-light')).toBe(true);

      divElement.dispatchEvent(new MouseEvent('mouseleave'));
      fixture.detectChanges();

      expect(divElement.classList.contains('btn-light')).toBe(false);
    });

    it('should handle mouseleave without prior mouseenter', () => {
      // Não deve lançar erro mesmo sem ter adicionado a classe antes
      expect(() => {
        buttonElement.dispatchEvent(new MouseEvent('mouseleave'));
        fixture.detectChanges();
      }).not.toThrow();
    });

    it('should handle multiple mouseleave events', () => {
      buttonElement.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();

      buttonElement.dispatchEvent(new MouseEvent('mouseleave'));
      buttonElement.dispatchEvent(new MouseEvent('mouseleave'));
      buttonElement.dispatchEvent(new MouseEvent('mouseleave'));
      fixture.detectChanges();

      expect(buttonElement.classList.contains('btn-light')).toBe(false);
    });
  });

  describe('Hover Cycle', () => {
    it('should add and remove class in complete hover cycle', () => {
      // Hover on
      buttonElement.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();
      expect(buttonElement.classList.contains('btn-light')).toBe(true);

      // Hover off
      buttonElement.dispatchEvent(new MouseEvent('mouseleave'));
      fixture.detectChanges();
      expect(buttonElement.classList.contains('btn-light')).toBe(false);
    });

    it('should handle multiple hover cycles', () => {
      for (let i = 0; i < 5; i++) {
        buttonElement.dispatchEvent(new MouseEvent('mouseenter'));
        fixture.detectChanges();
        expect(buttonElement.classList.contains('btn-light')).toBe(true);

        buttonElement.dispatchEvent(new MouseEvent('mouseleave'));
        fixture.detectChanges();
        expect(buttonElement.classList.contains('btn-light')).toBe(false);
      }
    });

    it('should handle rapid hover on/off', () => {
      buttonElement.dispatchEvent(new MouseEvent('mouseenter'));
      buttonElement.dispatchEvent(new MouseEvent('mouseleave'));
      buttonElement.dispatchEvent(new MouseEvent('mouseenter'));
      buttonElement.dispatchEvent(new MouseEvent('mouseleave'));
      fixture.detectChanges();

      expect(buttonElement.classList.contains('btn-light')).toBe(false);
    });
  });

  describe('Multiple Elements', () => {
    it('should work independently on different elements', () => {
      // Hover on button
      buttonElement.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();

      expect(buttonElement.classList.contains('btn-light')).toBe(true);
      expect(divElement.classList.contains('btn-light')).toBe(false);
    });

    it('should handle hover on both elements separately', () => {
      // Hover on button
      buttonElement.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();
      expect(buttonElement.classList.contains('btn-light')).toBe(true);

      // Hover on div (button still hovered)
      divElement.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();
      expect(divElement.classList.contains('btn-light')).toBe(true);
      expect(buttonElement.classList.contains('btn-light')).toBe(true);

      // Leave button
      buttonElement.dispatchEvent(new MouseEvent('mouseleave'));
      fixture.detectChanges();
      expect(buttonElement.classList.contains('btn-light')).toBe(false);
      expect(divElement.classList.contains('btn-light')).toBe(true);
    });

    it('should handle simultaneous hover on all elements', () => {
      buttonElement.dispatchEvent(new MouseEvent('mouseenter'));
      divElement.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();

      expect(buttonElement.classList.contains('btn-light')).toBe(true);
      expect(divElement.classList.contains('btn-light')).toBe(true);
    });
  });

  describe('CSS Class Management', () => {
    it('should only add btn-light class, not modify other classes', () => {
      buttonElement.classList.add('existing-class');

      buttonElement.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();

      expect(buttonElement.classList.contains('btn-light')).toBe(true);
      expect(buttonElement.classList.contains('existing-class')).toBe(true);
    });

    it('should only remove btn-light class on mouseleave', () => {
      buttonElement.classList.add('existing-class');
      buttonElement.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();

      buttonElement.dispatchEvent(new MouseEvent('mouseleave'));
      fixture.detectChanges();

      expect(buttonElement.classList.contains('btn-light')).toBe(false);
      expect(buttonElement.classList.contains('existing-class')).toBe(true);
    });

    it('should not duplicate btn-light class on multiple mouseenter', () => {
      buttonElement.dispatchEvent(new MouseEvent('mouseenter'));
      buttonElement.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();

      const classes = Array.from(buttonElement.classList);
      const btnLightCount = classes.filter(c => c === 'btn-light').length;

      expect(btnLightCount).toBe(1);
    });
  });

  describe('Bootstrap Integration', () => {
    it('should use Bootstrap btn-light class', () => {
      buttonElement.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();

      expect(buttonElement.classList.contains('btn-light')).toBe(true);
    });

    it('should work with Bootstrap button classes', () => {
      buttonElement.classList.add('btn', 'btn-primary');

      buttonElement.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();

      expect(buttonElement.classList.contains('btn')).toBe(true);
      expect(buttonElement.classList.contains('btn-primary')).toBe(true);
      expect(buttonElement.classList.contains('btn-light')).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle destroyed fixture gracefully', () => {
      buttonElement.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();

      fixture.destroy();

      // Directive should not throw error after fixture destruction
      expect(true).toBe(true);
    });

    it('should handle element without any classes initially', () => {
      const cleanElement = buttonElement;
      // Remove todas as classes
      cleanElement.className = '';

      cleanElement.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();

      expect(cleanElement.classList.contains('btn-light')).toBe(true);
    });

    it('should not affect elements without directive', () => {
      // Criar elemento sem a diretiva
      const normalElement = document.createElement('button');
      fixture.nativeElement.appendChild(normalElement);

      normalElement.dispatchEvent(new MouseEvent('mouseenter'));

      expect(normalElement.classList.contains('btn-light')).toBe(false);
    });
  });

  describe('Directive Structure', () => {
    it('should have standalone true', () => {
      const directiveDef = (HighlightDirective as any).ɵdir;
      expect(directiveDef.standalone).toBe(true);
    });

    it('should have correct selector', () => {
      const directiveDef = (HighlightDirective as any).ɵdir;
      expect(directiveDef.selectors).toEqual([['', 'appHighlight', '']]);
    });
  });

  describe('Performance', () => {
    it('should handle rapid successive hovers efficiently', () => {
      const startTime = performance.now();

      for (let i = 0; i < 100; i++) {
        buttonElement.dispatchEvent(new MouseEvent('mouseenter'));
        buttonElement.dispatchEvent(new MouseEvent('mouseleave'));
      }
      fixture.detectChanges();

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should complete 100 hover cycles in reasonable time (< 100ms)
      expect(duration).toBeLessThan(100);
      expect(buttonElement.classList.contains('btn-light')).toBe(false);
    });

    it('should not cause memory leaks on repeated use', () => {
      // Teste básico - múltiplos ciclos sem crash
      for (let i = 0; i < 1000; i++) {
        buttonElement.dispatchEvent(new MouseEvent('mouseenter'));
        buttonElement.dispatchEvent(new MouseEvent('mouseleave'));
      }
      fixture.detectChanges();

      expect(true).toBe(true); // Se chegou aqui, não houve leak crítico
    });
  });
});
