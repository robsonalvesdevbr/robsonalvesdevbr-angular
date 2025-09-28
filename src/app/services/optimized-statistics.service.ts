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
export class OptimizedStatisticsService {
  private dataService = inject(DataService);

  // Cache for expensive calculations
  private statsCache = new Map<string, { data: any; timestamp: number }>();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  private getCachedOrCompute<T>(key: string, computeFn: () => T): T {
    const cached = this.statsCache.get(key);
    const now = Date.now();

    if (cached && (now - cached.timestamp) < this.CACHE_TTL) {
      return cached.data;
    }

    const result = computeFn();
    this.statsCache.set(key, { data: result, timestamp: now });
    return result;
  }

  getDashboardStats(): DashboardStats {
    return this.getCachedOrCompute('dashboard-stats', () => {
      const courses = this.dataService.getCourses();
      const books = this.dataService.getBooks();
      const formations = this.dataService.getFormationCourses();
      const graduations = this.dataService.getGraduations();

      // Use Promise.all equivalent for parallel processing
      const [
        booksProgress,
        favoriteCourses,
        completedGraduations,
        topInstitutions,
        topTechnologies,
        recentCourses,
        monthlyProgress
      ] = [
        this.calculateBooksProgress(books),
        this.countFavoriteCourses(courses),
        this.countCompletedGraduations(graduations),
        this.getTopInstitutions(courses),
        this.getTopTechnologies(courses),
        this.getRecentCourses(courses, 5),
        this.getMonthlyProgress(courses)
      ];

      return {
        totalCourses: courses.length,
        totalBooks: books.length,
        totalFormations: formations.length,
        totalGraduations: graduations.length,
        booksProgress,
        favoriteCourses,
        completedGraduations,
        topInstitutions,
        topTechnologies,
        recentCourses,
        monthlyProgress
      };
    });
  }

  private calculateBooksProgress(books: IBook[]): number {
    if (books.length === 0) return 0;

    let totalPages = 0;
    let readPages = 0;

    // Single loop with accumulation
    for (const book of books) {
      totalPages += book.pages;
      readPages += (book.pages * book.progress / 100);
    }

    return totalPages > 0 ? Math.round((readPages / totalPages) * 100) : 0;
  }

  private countFavoriteCourses(courses: ICourse[]): number {
    return courses.reduce((count, course) => count + (course.favorite ? 1 : 0), 0);
  }

  private countCompletedGraduations(graduations: any[]): number {
    return graduations.reduce((count, g) => count + (g.conclusion === 'completed' ? 1 : 0), 0);
  }

  private getTopInstitutions(courses: ICourse[]): Array<{ name: string; count: number }> {
    return this.getCachedOrCompute('top-institutions', () => {
      const institutionCounts = new Map<string, number>();

      // Optimized counting with single loop
      for (const course of courses) {
        institutionCounts.set(
          course.institution,
          (institutionCounts.get(course.institution) || 0) + 1
        );
      }

      // Convert to array and sort in single operation
      return Array.from(institutionCounts, ([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
    });
  }

  private getTopTechnologies(courses: ICourse[]): Array<{ name: string; count: number }> {
    return this.getCachedOrCompute('top-technologies', () => {
      const techCounts = new Map<string, number>();

      // Flattened approach - avoid nested loops
      const allTags = courses.flatMap(course => course.tags);

      for (const tag of allTags) {
        techCounts.set(tag, (techCounts.get(tag) || 0) + 1);
      }

      return Array.from(techCounts, ([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
    });
  }

  private getRecentCourses(courses: ICourse[], limit: number): ICourse[] {
    return this.getCachedOrCompute(`recent-courses-${limit}`, () => {
      // Pre-filter courses with conclusion dates to avoid sorting nulls
      const completedCourses = courses.filter(course => course.conclusion);

      return completedCourses
        .sort((a, b) => new Date(b.conclusion!).getTime() - new Date(a.conclusion!).getTime())
        .slice(0, limit);
    });
  }

  private getMonthlyProgress(courses: ICourse[]): Array<{ month: string; courses: number }> {
    return this.getCachedOrCompute('monthly-progress', () => {
      const monthCounts = new Map<string, number>();

      // Single pass through courses
      for (const course of courses) {
        if (!course.conclusion) continue;

        const date = new Date(course.conclusion);
        const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        monthCounts.set(monthYear, (monthCounts.get(monthYear) || 0) + 1);
      }

      return Array.from(monthCounts, ([month, courses]) => ({ month, courses }))
        .sort((a, b) => a.month.localeCompare(b.month))
        .slice(-12);
    });
  }

  getYearlyStats(): Array<{ year: number; courses: number; formations: number }> {
    return this.getCachedOrCompute('yearly-stats', () => {
      const courses = this.dataService.getCourses();
      const formations = this.dataService.getFormationCourses();

      const yearStats = new Map<number, { courses: number; formations: number }>();

      // Process courses
      for (const course of courses) {
        if (course.conclusion) {
          const year = new Date(course.conclusion).getFullYear();
          const current = yearStats.get(year) || { courses: 0, formations: 0 };
          yearStats.set(year, { ...current, courses: current.courses + 1 });
        }
      }

      // Process formations
      for (const formation of formations) {
        if (formation.conclusion) {
          const year = new Date(formation.conclusion).getFullYear();
          const current = yearStats.get(year) || { courses: 0, formations: 0 };
          yearStats.set(year, { ...current, formations: current.formations + 1 });
        }
      }

      return Array.from(yearStats, ([year, stats]) => ({ year, ...stats }))
        .sort((a, b) => a.year - b.year);
    });
  }

  // Method to clear cache when data changes
  clearCache(): void {
    this.statsCache.clear();
  }

  // Method to get cache status for debugging
  getCacheStatus(): { size: number; keys: string[] } {
    return {
      size: this.statsCache.size,
      keys: Array.from(this.statsCache.keys())
    };
  }
}
