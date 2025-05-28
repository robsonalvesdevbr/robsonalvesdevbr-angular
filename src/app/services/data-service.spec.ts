import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Books } from '@path-data/Book';
import { Courses } from '@path-data/Course';
import { FormationCourses } from '@path-data/FormationCourse';
import { Graduations } from '@path-data/Graduation';
import { Profile } from '@path-data/Profile';
import { DataService } from './data-service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the correct list of courses', () => {
    const courses = service.getCourses();
    expect(courses).toEqual(Courses);
  });

  it('should return the correct list of graduations', () => {
    const graduations = service.getGraduations();
    expect(graduations).toEqual(Graduations);
  });

  it('should return the correct list of books', () => {
    const books = service.getBooks();
    expect(books).toEqual(Books);
  });

  it('should return the correct list of formation courses', () => {
    const formationCourses = service.getFormationCourses();
    expect(formationCourses).toEqual(FormationCourses);
  });

  it('should return the correct profile', () => {
    const profile = service.getProfile();
    expect(profile).toEqual(Profile);
  });
});
