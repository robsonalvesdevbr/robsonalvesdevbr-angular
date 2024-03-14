import { Component } from '@angular/core';
import { ICourse } from './interfaces/ICourse';
import { Courses } from './data/Course';
import { IGraduation } from './interfaces/IGraduation';
import { Graduations } from './data/Graduation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Robson Candido dos Santos Alves';
  courses: ICourse[] = Courses;
  graduations: IGraduation[] = Graduations;
}
