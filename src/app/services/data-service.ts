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
  private readonly _courses = Courses;
  private readonly _graduations = Graduations;
  private readonly _books = Books;
  private readonly _formationCourses = FormationCourses;
  private readonly _profile = Profile;

  getCourses(): ICourse[] {
    return [...this._courses];
  }

  getGraduations(): IGraduation[] {
    return [...this._graduations];
  }

  getBooks(): IBook[] {
    return [...this._books];
  }

  getFormationCourses(): IFormationCourse[] {
    return [...this._formationCourses];
  }

  getProfile(): IProfile {
    return this._profile;
  }
}
