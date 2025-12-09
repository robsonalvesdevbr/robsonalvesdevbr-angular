import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { OptimizedStatisticsService, DashboardStats } from './optimized-statistics.service';
import { DataService } from './data-service';
import { ICourse } from '@path-interfaces/ICourse';
import { IBook } from '@path-interfaces/IBook';
import { IGraduation } from '@path-interfaces/IGraduation';
import { IFormationCourse } from '@path-interfaces/IFormationCourse';

describe('OptimizedStatisticsService', () => {
  let service: OptimizedStatisticsService;
  let dataService: DataService;

  const mockCourses: ICourse[] = [
    {
      id: 'course-1',
      title: 'Angular Advanced',
      institution: 'Udemy',
      link: 'https://example.com',
      start: '2024-01-01',
      conclusion: '2024-02-01',
      tags: ['Angular', 'TypeScript'],
      favorite: true,
    },
    {
      id: 'course-2',
      title: 'React Basics',
      institution: 'Coursera',
      link: 'https://example.com',
      start: '2024-03-01',
      conclusion: '2024-04-01',
      tags: ['React', 'JavaScript'],
      favorite: false,
    },
    {
      id: 'course-3',
      title: 'Vue.js Mastery',
      institution: 'Udemy',
      link: 'https://example.com',
      start: '2023-12-01',
      conclusion: '2023-12-31',
      tags: ['Vue', 'JavaScript'],
      favorite: true,
    },
  ];

  const mockBooks: IBook[] = [
    {
      id: 'book-1',
      title: 'Clean Code',
      subtitle: 'A Handbook',
      category: 'Programming',
      publishName: 'Publisher A',
      tags: ['Code Quality'],
      releaseDate: '2008-01-01',
      pages: 400,
      progress: 100,
    },
    {
      id: 'book-2',
      title: 'Design Patterns',
      subtitle: 'Elements',
      category: 'Programming',
      publishName: 'Publisher B',
      tags: ['Design'],
      releaseDate: '1994-01-01',
      pages: 600,
      progress: 50,
    },
  ];

  const mockGraduations: IGraduation[] = [
    {
      id: 'grad-1',
      title: 'Computer Science',
      institution: 'MIT',
      link: 'https://example.com',
      start: '2015-01-01',
      conclusion: 'completed',
      logo: 'mit-logo.png',
    },
    {
      id: 'grad-2',
      title: 'Software Engineering',
      institution: 'Stanford',
      link: 'https://example.com',
      start: '2018-01-01',
      conclusion: 'in-progress',
      logo: 'stanford-logo.png',
    },
  ];

  const mockFormations: IFormationCourse[] = [
    {
      id: 'formation-1',
      title: 'Web Development',
      institution: 'Alura',
      link: 'https://example.com',
      start: '2023-01-01',
      conclusion: '2023-06-01',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        OptimizedStatisticsService,
        DataService,
      ],
    });

    service = TestBed.inject(OptimizedStatisticsService);
    dataService = TestBed.inject(DataService);

    // Mock DataService methods
    vi.spyOn(dataService, 'getCourses').mockReturnValue(mockCourses);
    vi.spyOn(dataService, 'getBooks').mockReturnValue(mockBooks);
    vi.spyOn(dataService, 'getGraduations').mockReturnValue(mockGraduations);
    vi.spyOn(dataService, 'getFormationCourses').mockReturnValue(mockFormations);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getDashboardStats', () => {
    it('should calculate correct dashboard statistics', () => {
      const stats = service.getDashboardStats();

      expect(stats.totalCourses).toBe(3);
      expect(stats.totalBooks).toBe(2);
      expect(stats.totalFormations).toBe(1);
      expect(stats.totalGraduations).toBe(2);
      expect(stats.favoriteCourses).toBe(2);
      expect(stats.completedGraduations).toBe(1);
    });

    it('should calculate books progress correctly', () => {
      const stats = service.getDashboardStats();

      // Book 1: 400 pages * 100% = 400 pages read
      // Book 2: 600 pages * 50% = 300 pages read
      // Total: 700/1000 = 70%
      expect(stats.booksProgress).toBe(70);
    });

    it('should return top institutions', () => {
      const stats = service.getDashboardStats();

      expect(stats.topInstitutions).toEqual([
        { name: 'Udemy', count: 2 },
        { name: 'Coursera', count: 1 },
      ]);
    });

    it('should return top technologies', () => {
      const stats = service.getDashboardStats();

      // Angular: 1, TypeScript: 1, React: 1, JavaScript: 2, Vue: 1
      expect(stats.topTechnologies.length).toBeGreaterThan(0);
      expect(stats.topTechnologies[0]).toHaveProperty('name');
      expect(stats.topTechnologies[0]).toHaveProperty('count');
    });

    it('should return recent courses', () => {
      const stats = service.getDashboardStats();

      expect(stats.recentCourses.length).toBeLessThanOrEqual(5);
      expect(stats.recentCourses[0].id).toBe('course-2'); // Most recent
    });

    it('should cache results', () => {
      const stats1 = service.getDashboardStats();
      const stats2 = service.getDashboardStats();

      // Should be same object reference (cached)
      expect(stats1).toBe(stats2);
      expect(dataService.getCourses).toHaveBeenCalledTimes(1);
    });

    it('should handle empty books array', () => {
      vi.spyOn(dataService, 'getBooks').mockReturnValue([]);

      const stats = service.getDashboardStats();

      expect(stats.booksProgress).toBe(0);
      expect(stats.totalBooks).toBe(0);
    });
  });

  describe('getYearlyStats', () => {
    it('should group courses and formations by year', () => {
      const yearlyStats = service.getYearlyStats();

      expect(yearlyStats).toEqual([
        { year: 2023, courses: 1, formations: 1 },
        { year: 2024, courses: 2, formations: 0 },
      ]);
    });

    it('should cache yearly stats', () => {
      const stats1 = service.getYearlyStats();
      const stats2 = service.getYearlyStats();

      expect(stats1).toBe(stats2);
    });

    it('should handle courses without conclusion date', () => {
      const coursesWithoutDates: ICourse[] = [
        {
          id: 'course-no-date',
          title: 'Incomplete Course',
          institution: 'Test',
          link: 'https://example.com',
          start: '2024-01-01',
          conclusion: '',
          tags: ['Test'],
          favorite: false,
        },
      ];

      const formationsWithoutDates: IFormationCourse[] = [
        {
          id: 'formation-no-date',
          title: 'Incomplete Formation',
          institution: 'Test',
          link: 'https://example.com',
          start: '2024-01-01',
          conclusion: '',
        },
      ];

      vi.spyOn(dataService, 'getCourses').mockReturnValue(coursesWithoutDates);
      vi.spyOn(dataService, 'getFormationCourses').mockReturnValue(formationsWithoutDates);
      service.clearCache();

      const yearlyStats = service.getYearlyStats();

      expect(yearlyStats).toEqual([]);
    });
  });

  describe('Cache Management', () => {
    it('should clear cache', () => {
      service.getDashboardStats();
      const statusBefore = service.getCacheStatus();

      expect(statusBefore.size).toBeGreaterThan(0);

      service.clearCache();
      const statusAfter = service.getCacheStatus();

      expect(statusAfter.size).toBe(0);
      expect(statusAfter.keys).toEqual([]);
    });

    it('should return cache status', () => {
      service.getDashboardStats();
      const status = service.getCacheStatus();

      expect(status).toHaveProperty('size');
      expect(status).toHaveProperty('keys');
      expect(Array.isArray(status.keys)).toBe(true);
    });

    it('should invalidate cache after TTL', () => {
      vi.useFakeTimers();

      const stats1 = service.getDashboardStats();

      // Advance time beyond cache TTL (5 minutes)
      vi.advanceTimersByTime(6 * 60 * 1000);

      const stats2 = service.getDashboardStats();

      // Should fetch fresh data
      expect(dataService.getCourses).toHaveBeenCalledTimes(2);

      vi.useRealTimers();
    });

    it('should use cached data within TTL', () => {
      vi.useFakeTimers();

      service.getDashboardStats();

      // Advance time but stay within TTL
      vi.advanceTimersByTime(2 * 60 * 1000);

      service.getDashboardStats();

      // Should use cached data
      expect(dataService.getCourses).toHaveBeenCalledTimes(1);

      vi.useRealTimers();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty data gracefully', () => {
      vi.spyOn(dataService, 'getCourses').mockReturnValue([]);
      vi.spyOn(dataService, 'getBooks').mockReturnValue([]);
      vi.spyOn(dataService, 'getGraduations').mockReturnValue([]);
      vi.spyOn(dataService, 'getFormationCourses').mockReturnValue([]);
      service.clearCache();

      const stats = service.getDashboardStats();

      expect(stats.totalCourses).toBe(0);
      expect(stats.totalBooks).toBe(0);
      expect(stats.totalFormations).toBe(0);
      expect(stats.totalGraduations).toBe(0);
      expect(stats.booksProgress).toBe(0);
      expect(stats.favoriteCourses).toBe(0);
      expect(stats.completedGraduations).toBe(0);
      expect(stats.topInstitutions).toEqual([]);
      expect(stats.topTechnologies).toEqual([]);
      expect(stats.recentCourses).toEqual([]);
      expect(stats.monthlyProgress).toEqual([]);
    });

    it('should handle courses with duplicate tags', () => {
      const coursesWithDuplicates: ICourse[] = [
        {
          id: 'c1',
          title: 'Test 1',
          institution: 'Test',
          link: 'https://example.com',
          start: '2024-01-01',
          conclusion: '2024-02-01',
          tags: ['Angular', 'Angular', 'TypeScript'],
          favorite: false,
        },
      ];

      vi.spyOn(dataService, 'getCourses').mockReturnValue(coursesWithDuplicates);
      service.clearCache();

      const stats = service.getDashboardStats();

      // Each tag should be counted separately
      const angularCount = stats.topTechnologies.find(t => t.name === 'Angular');
      expect(angularCount?.count).toBe(2);
    });
  });
});
