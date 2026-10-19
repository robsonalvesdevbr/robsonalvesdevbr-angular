import { afterNextRender, DestroyRef, Directive, ElementRef, inject, signal } from '@angular/core';

/**
 * Recolhe uma lista de chips em uma linha. O estado fica exposto (`exportAs`) para o botão
 * de seta do template: `expanded`, `overflowing` e `toggle()`.
 */
@Directive({
  selector: '[appChipsAccordion]',
  exportAs: 'chipsAccordion',
  host: { '[class.is-collapsed]': '!expanded()' },
})
export class ChipsAccordionDirective {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly expanded = signal(false);
  // Sem layout para medir (jsdom/SSR) assume que há o que expandir.
  readonly overflowing = signal(true);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (typeof ResizeObserver === 'undefined') return;

      const measure = () => this.overflowing.set(this.wraps());
      const resize = new ResizeObserver(measure);
      const mutation = new MutationObserver(measure);
      resize.observe(this.host);
      mutation.observe(this.host, { childList: true });
      destroyRef.onDestroy(() => {
        resize.disconnect();
        mutation.disconnect();
      });

      measure();
      // A troca de fonte muda a largura dos chips sem alterar o tamanho da lista.
      document.fonts?.ready.then(measure);
    });
  }

  toggle(): void {
    this.expanded.update(expanded => !expanded);
  }

  // Há o que expandir quando algum chip quebrou para uma linha abaixo da primeira.
  private wraps(): boolean {
    const chips = this.host.querySelectorAll<HTMLElement>('label');
    if (chips.length < 2) return false;
    return chips[chips.length - 1].offsetTop > chips[0].offsetTop + 2;
  }
}
