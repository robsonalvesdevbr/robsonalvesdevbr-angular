import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-aboutthisproject',
  templateUrl: './aboutthisproject.component.html',
  styleUrl: './aboutthisproject.component.scss'
})
export class AboutthisprojectComponent {
  @Input({ required: false }) bglight: boolean = false
}
