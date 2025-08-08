import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { BasePageComponent } from '@path-components/base-page/base-page.component';

@Component({
  selector: 'app-about',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent extends BasePageComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }
}
