// src/app/services/data.service.ts
import { Injectable } from '@angular/core'
import { Courses } from '@path-data/Course'
import { Graduations } from '@path-data/Graduation'
import { Books } from '@path-data/Book'
import { FormationCourses } from '@path-data/FormationCourse'
import { Profile } from '@path-data/Profile'

@Injectable({
  providedIn: 'root',
})
export class DataService {
  getCourses() {
    return Courses
  }
  getGraduations() {
    return Graduations
  }
  getBooks() {
    return Books
  }
  getFormationCourses() {
    return FormationCourses
  }
  getProfile() {
    return Profile
  }
}
