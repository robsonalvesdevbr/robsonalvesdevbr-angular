import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-masterhead',
  templateUrl: './masterhead.component.html',
  styleUrls: ['./masterhead.component.scss']
})
export class MasterheadComponent {
  @Input({required: false}) bglight: boolean = false;
}
