import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-portifoliogrid',
  templateUrl: './portifoliogrid.component.html',
  styleUrls: ['./portifoliogrid.component.scss']
})
export class PortifoliogridComponent {
  @Input({required: false}) bglight: boolean = false;
}
