// src/app/services/data.service.ts
import { Injectable } from '@angular/core';
import { Books } from '@path-data/Book';
import { Courses } from '@path-data/Course';
import { FormationCourses } from '@path-data/FormationCourse';
import { Graduations } from '@path-data/Graduation';
import { Profile } from '@path-data/Profile';
import { IBook } from '@path-interfaces/IBook';
import { ICourse } from '@path-interfaces/ICourse';
import { IFormationCourse } from '@path-interfaces/IFormationCourse';
import { IGraduation } from '@path-interfaces/IGraduation';
import { IProfile } from '@path-interfaces/IProfile';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  getCourses(): ICourse[] {
    return Courses;
  }
  getGraduations(): IGraduation[] {
    return Graduations;
  }
  getBooks(): IBook[] {
    return Books;
  }
  getFormationCourses(): IFormationCourse[] {
    return FormationCourses;
  }
  getProfile(): IProfile {
    return Profile;
  }
}
