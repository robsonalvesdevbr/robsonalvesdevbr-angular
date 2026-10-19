import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ChipsAccordionDirective } from './chips-accordion.directive';

@Component({
  imports: [ChipsAccordionDirective],
  template: `
    <div appChipsAccordion #chips="chipsAccordion" id="list">
      <label>a</label>
      <label>b</label>
    </div>
    <button (click)="chips.toggle()">toggle</button>
  `,
})
class HostComponent {}

describe('ChipsAccordionDirective', () => {
  const setup = () => {
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    return {
      fixture,
      list: root.querySelector<HTMLElement>('#list')!,
      button: root.querySelector<HTMLButtonElement>('button')!,
    };
  };

  it('should start collapsed', () => {
    const { list } = setup();
    expect(list.classList.contains('is-collapsed')).toBe(true);
  });

  it('should toggle the collapsed class from the exposed API', () => {
    const { fixture, list, button } = setup();

    button.click();
    fixture.detectChanges();
    expect(list.classList.contains('is-collapsed')).toBe(false);

    button.click();
    fixture.detectChanges();
    expect(list.classList.contains('is-collapsed')).toBe(true);
  });

  it('should assume there is something to expand when the layout cannot be measured', () => {
    const { fixture } = setup();
    const directive = fixture.debugElement.children[0].injector.get(ChipsAccordionDirective);
    expect(directive.overflowing()).toBe(true);
  });
});
