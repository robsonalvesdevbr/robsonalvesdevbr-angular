import { Component, Input } from '@angular/core';
import { IGraduation } from '@path-interfaces/IGraduation';
import { BasePageComponent } from '@path-components/base-page/base-page.component';

@Component({
  selector: 'app-graduation',
  templateUrl: './graduation.component.html',
  styleUrls: ['./graduation.component.scss']
})
export class GraduationComponent extends BasePageComponent  {
  @Input({required: true}) graduations: IGraduation[] = [];
}
