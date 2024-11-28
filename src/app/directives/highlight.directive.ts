import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('btn-light');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('btn-light', false);
  }
  private highlight(color: string, visibility: boolean = true) {
    if (visibility) {
      this.el.nativeElement.classList.add(color);
      this.el.nativeElement.blur();
    } else {
      this.el.nativeElement.classList.remove(color);
      this.el.nativeElement.blur();
    }
  }
}
