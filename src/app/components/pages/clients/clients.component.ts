import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  @Input({required: false}) bglight: boolean = false;

  currentClass: Record<string, boolean> = {
    'bg-light': this.bglight
  };
}
