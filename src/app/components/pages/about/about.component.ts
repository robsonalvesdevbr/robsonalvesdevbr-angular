import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  @Input({required: false}) bglight: boolean = false;

  currentClass: Record<string, boolean> = {
    'bg-light': this.bglight
  };
}
