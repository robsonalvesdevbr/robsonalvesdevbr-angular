import { Injectable, inject } from '@angular/core';
import { DataService } from '@path-services/data-service';
import { ICourse } from '@path-interfaces/ICourse';
import { IBook } from '@path-interfaces/IBook';

export interface DashboardStats {
  totalCourses: number;
  totalBooks: number;
  totalFormations: number;
  totalGraduations: number;
  booksProgress: number;
  favoriteCourses: number;
  completedGraduations: number;
  topInstitutions: Array<{ name: string; count: number }>;
  topTechnologies: Array<{ name: string; count: number }>;
  recentCourses: ICourse[];
  monthlyProgress: Array<{ month: string; courses: number }>;
}

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private dataService = inject(DataService);

  getDashboardStats(): DashboardStats {
    const courses = this.dataService.getCourses();
    const books = this.dataService.getBooks();
    const formations = this.dataService.getFormationCourses();
    const graduations = this.dataService.getGraduations();

    return {
      totalCourses: courses.length,
      totalBooks: books.length,
      totalFormations: formations.length,
      totalGraduations: graduations.length,
      booksProgress: this.calculateBooksProgress(books),
      favoriteCourses: courses.filter(c => c.favorite).length,
      completedGraduations: graduations.filter(g => g.conclusion === 'completed').length,
      topInstitutions: this.getTopInstitutions(courses),
      topTechnologies: this.getTopTechnologies(courses),
      recentCourses: this.getRecentCourses(courses, 5),
      monthlyProgress: this.getMonthlyProgress(courses)
    };
  }

  private calculateBooksProgress(books: IBook[]): number {
    const totalPages = books.reduce((sum, book) => sum + book.pages, 0);
    const readPages = books.reduce((sum, book) => sum + (book.pages * book.progress / 100), 0);
    return Math.round((readPages / totalPages) * 100);
  }

  private getTopInstitutions(courses: ICourse[]): Array<{ name: string; count: number }> {
    const institutionCounts = new Map<string, number>();
    
    courses.forEach(course => {
      const current = institutionCounts.get(course.institution) || 0;
      institutionCounts.set(course.institution, current + 1);
    });

    return Array.from(institutionCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }

  private getTopTechnologies(courses: ICourse[]): Array<{ name: string; count: number }> {
    const techCounts = new Map<string, number>();
    
    courses.forEach(course => {
      course.tags.forEach(tag => {
        const current = techCounts.get(tag) || 0;
        techCounts.set(tag, current + 1);
      });
    });

    return Array.from(techCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  private getRecentCourses(courses: ICourse[], limit: number): ICourse[] {
    return courses
      .sort((a, b) => {
        const dateA = a.conclusion ? new Date(a.conclusion).getTime() : 0;
        const dateB = b.conclusion ? new Date(b.conclusion).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, limit);
  }

  private getMonthlyProgress(courses: ICourse[]): Array<{ month: string; courses: number }> {
    const monthCounts = new Map<string, number>();
    
    courses.forEach(course => {
      if (course.conclusion) {
        const date = new Date(course.conclusion);
        const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        const current = monthCounts.get(monthYear) || 0;
        monthCounts.set(monthYear, current + 1);
      }
    });

    return Array.from(monthCounts.entries())
      .map(([month, courses]) => ({ month, courses }))
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-12); // Last 12 months
  }

  getYearlyStats(): Array<{ year: number; courses: number; formations: number }> {
    const courses = this.dataService.getCourses();
    const formations = this.dataService.getFormationCourses();
    
    const yearStats = new Map<number, { courses: number; formations: number }>();
    
    courses.forEach(course => {
      if (course.conclusion) {
        const year = new Date(course.conclusion).getFullYear();
        const current = yearStats.get(year) || { courses: 0, formations: 0 };
        yearStats.set(year, { ...current, courses: current.courses + 1 });
      }
    });
    
    formations.forEach(formation => {
      if (formation.conclusion) {
        const year = new Date(formation.conclusion).getFullYear();
        const current = yearStats.get(year) || { courses: 0, formations: 0 };
        yearStats.set(year, { ...current, formations: current.formations + 1 });
      }
    });

    return Array.from(yearStats.entries())
      .map(([year, stats]) => ({ year, ...stats }))
      .sort((a, b) => a.year - b.year);
  }
}