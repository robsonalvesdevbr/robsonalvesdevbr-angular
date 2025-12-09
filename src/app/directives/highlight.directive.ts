import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  private readonly el = inject(ElementRef);

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('btn-light');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('btn-light', false);
  }

  private highlight(color: string, visibility = true) {
    if (visibility) {
      this.el.nativeElement.classList.add(color);
    } else {
      this.el.nativeElement.classList.remove(color);
    }
  }
}
