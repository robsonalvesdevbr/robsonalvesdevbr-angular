// src/app/services/data.service.ts
import { Injectable } from '@angular/core';
import { Courses } from '@path-data/Course';
import { Graduations } from '@path-data/Graduation';
import { Books } from '@path-data/Book';
import { FormationCourses } from '@path-data/FormationCourse';
import { Profile } from '@path-data/Profile';
import { ICourse } from '@path-interfaces/ICourse';
import { IGraduation } from '@path-interfaces/IGraduation';
import { IBook } from '@path-interfaces/IBook';
import { IFormationCourse } from '@path-interfaces/IFormationCourse';
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
