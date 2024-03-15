import { Component, Input } from '@angular/core';
import { IGraduation } from '../../../interfaces/IGraduation';

@Component({
  selector: 'app-graduation',
  templateUrl: './graduation.component.html',
  styleUrls: ['./graduation.component.scss']
})
export class GraduationComponent {
  @Input({required: false}) bglight: boolean = false;
  @Input({required: true}) graduations: IGraduation[] = [];
}
