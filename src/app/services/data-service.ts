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

  // Create read-only proxies to avoid unnecessary cloning
  private readonly _coursesProxy = new Proxy(this._courses, {
    get: (target, prop) => target[prop as keyof typeof target],
    set: () => false // Make it read-only
  });

  private readonly _graduationsProxy = new Proxy(this._graduations, {
    get: (target, prop) => target[prop as keyof typeof target],
    set: () => false
  });

  private readonly _booksProxy = new Proxy(this._books, {
    get: (target, prop) => target[prop as keyof typeof target],
    set: () => false
  });

  private readonly _formationCoursesProxy = new Proxy(this._formationCourses, {
    get: (target, prop) => target[prop as keyof typeof target],
    set: () => false
  });

  getCourses(): readonly ICourse[] {
    return this._coursesProxy;
  }

  getGraduations(): readonly IGraduation[] {
    return this._graduationsProxy;
  }

  getBooks(): readonly IBook[] {
    return this._booksProxy;
  }

  getFormationCourses(): readonly IFormationCourse[] {
    return this._formationCoursesProxy;
  }

  getProfile(): IProfile {
    return this._profile;
  }

  // Keep methods for cases that need mutability
  getCoursesCopy(): ICourse[] {
    return [...this._courses];
  }

  getGraduationsCopy(): IGraduation[] {
    return [...this._graduations];
  }

  getBooksCopy(): IBook[] {
    return [...this._books];
  }

  getFormationCoursesCopy(): IFormationCourse[] {
    return [...this._formationCourses];
  }
}
