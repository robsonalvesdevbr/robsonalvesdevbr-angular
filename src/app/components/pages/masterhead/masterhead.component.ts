import { Component, Input } from '@angular/core';
import { BasePageComponent } from '../../base-page/base-page.component';

@Component({
  selector: 'app-masterhead',
  templateUrl: './masterhead.component.html',
  styleUrls: ['./masterhead.component.scss']
})
export class MasterheadComponent extends BasePageComponent {
  @Input({required: false}) bglight: boolean = false;
}
