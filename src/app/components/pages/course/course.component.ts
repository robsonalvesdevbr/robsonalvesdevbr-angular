import { Component, Input } from '@angular/core';
import { ICourse } from '../../../interfaces/ICourse';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent {
  @Input({required: true}) courses: ICourse[] = {} as ICourse[];
}
