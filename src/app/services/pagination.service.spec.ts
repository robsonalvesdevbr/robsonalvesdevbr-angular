import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { PaginationService } from './pagination.service';

describe('PaginationService', () => {
  let service: PaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        PaginationService,
      ],
    });

    service = TestBed.inject(PaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createPaginationConfig', () => {
    it('should create new pagination config with default itemsPerPage', () => {
      const config = service.createPaginationConfig('test-pagination');

      expect(config).toBeTruthy();
      expect(config().id).toBe('test-pagination');
      expect(config().itemsPerPage).toBe(5);
      expect(config().currentPage).toBe(1);
    });

    it('should create new pagination config with custom itemsPerPage', () => {
      const config = service.createPaginationConfig('test-pagination', 10);

      expect(config().id).toBe('test-pagination');
      expect(config().itemsPerPage).toBe(10);
      expect(config().currentPage).toBe(1);
    });

    it('should return existing config if id already exists', () => {
      const config1 = service.createPaginationConfig('test-pagination', 5);
      const config2 = service.createPaginationConfig('test-pagination', 10);

      expect(config1).toBe(config2);
      expect(config2().itemsPerPage).toBe(5); // Should keep original value
    });

    it('should create multiple configs with different ids', () => {
      const config1 = service.createPaginationConfig('pagination-1', 5);
      const config2 = service.createPaginationConfig('pagination-2', 10);

      expect(config1).not.toBe(config2);
      expect(config1().id).toBe('pagination-1');
      expect(config2().id).toBe('pagination-2');
      expect(config1().itemsPerPage).toBe(5);
      expect(config2().itemsPerPage).toBe(10);
    });

    it('should create signal that is reactive', () => {
      const config = service.createPaginationConfig('test-pagination');

      expect(config().currentPage).toBe(1);

      config().currentPage = 2;

      expect(config().currentPage).toBe(2);
    });
  });

  describe('getPaginationConfig', () => {
    it('should return existing config', () => {
      const createdConfig = service.createPaginationConfig('test-pagination');
      const retrievedConfig = service.getPaginationConfig('test-pagination');

      expect(retrievedConfig).toBe(createdConfig);
    });

    it('should return undefined for non-existent config', () => {
      const config = service.getPaginationConfig('non-existent');

      expect(config).toBeUndefined();
    });

    it('should retrieve correct config when multiple exist', () => {
      service.createPaginationConfig('pagination-1', 5);
      service.createPaginationConfig('pagination-2', 10);

      const config = service.getPaginationConfig('pagination-2');

      expect(config).toBeTruthy();
      expect(config!().id).toBe('pagination-2');
      expect(config!().itemsPerPage).toBe(10);
    });
  });

  describe('setCurrentPage', () => {
    it('should update current page for existing config', () => {
      const config = service.createPaginationConfig('test-pagination');

      expect(config().currentPage).toBe(1);

      service.setCurrentPage('test-pagination', 3);

      expect(config().currentPage).toBe(3);
    });

    it('should not throw error for non-existent config', () => {
      expect(() => {
        service.setCurrentPage('non-existent', 2);
      }).not.toThrow();
    });

    it('should update correct config when multiple exist', () => {
      const config1 = service.createPaginationConfig('pagination-1');
      const config2 = service.createPaginationConfig('pagination-2');

      service.setCurrentPage('pagination-2', 5);

      expect(config1().currentPage).toBe(1); // Should not change
      expect(config2().currentPage).toBe(5); // Should change
    });

    it('should allow setting page to 0', () => {
      const config = service.createPaginationConfig('test-pagination');

      service.setCurrentPage('test-pagination', 0);

      expect(config().currentPage).toBe(0);
    });

    it('should allow setting page to large numbers', () => {
      const config = service.createPaginationConfig('test-pagination');

      service.setCurrentPage('test-pagination', 999);

      expect(config().currentPage).toBe(999);
    });
  });

  describe('resetPage', () => {
    it('should reset current page to 1', () => {
      const config = service.createPaginationConfig('test-pagination');
      service.setCurrentPage('test-pagination', 5);

      expect(config().currentPage).toBe(5);

      service.resetPage('test-pagination');

      expect(config().currentPage).toBe(1);
    });

    it('should not throw error for non-existent config', () => {
      expect(() => {
        service.resetPage('non-existent');
      }).not.toThrow();
    });

    it('should reset correct config when multiple exist', () => {
      const config1 = service.createPaginationConfig('pagination-1');
      const config2 = service.createPaginationConfig('pagination-2');

      service.setCurrentPage('pagination-1', 3);
      service.setCurrentPage('pagination-2', 5);

      service.resetPage('pagination-2');

      expect(config1().currentPage).toBe(3); // Should not change
      expect(config2().currentPage).toBe(1); // Should reset
    });

    it('should be idempotent', () => {
      const config = service.createPaginationConfig('test-pagination');
      service.setCurrentPage('test-pagination', 5);

      service.resetPage('test-pagination');
      service.resetPage('test-pagination');
      service.resetPage('test-pagination');

      expect(config().currentPage).toBe(1);
    });
  });

  describe('getAbsoluteIndex', () => {
    it('should calculate correct absolute index on page 1', () => {
      service.createPaginationConfig('test-pagination', 5);

      expect(service.getAbsoluteIndex('test-pagination', 0)).toBe(1);
      expect(service.getAbsoluteIndex('test-pagination', 1)).toBe(2);
      expect(service.getAbsoluteIndex('test-pagination', 4)).toBe(5);
    });

    it('should calculate correct absolute index on page 2', () => {
      const config = service.createPaginationConfig('test-pagination', 5);
      service.setCurrentPage('test-pagination', 2);

      expect(service.getAbsoluteIndex('test-pagination', 0)).toBe(6);
      expect(service.getAbsoluteIndex('test-pagination', 1)).toBe(7);
      expect(service.getAbsoluteIndex('test-pagination', 4)).toBe(10);
    });

    it('should calculate correct absolute index on page 3', () => {
      const config = service.createPaginationConfig('test-pagination', 10);
      service.setCurrentPage('test-pagination', 3);

      expect(service.getAbsoluteIndex('test-pagination', 0)).toBe(21);
      expect(service.getAbsoluteIndex('test-pagination', 5)).toBe(26);
      expect(service.getAbsoluteIndex('test-pagination', 9)).toBe(30);
    });

    it('should return index + 1 for non-existent config', () => {
      expect(service.getAbsoluteIndex('non-existent', 0)).toBe(1);
      expect(service.getAbsoluteIndex('non-existent', 5)).toBe(6);
      expect(service.getAbsoluteIndex('non-existent', 10)).toBe(11);
    });

    it('should handle different itemsPerPage values', () => {
      const config1 = service.createPaginationConfig('pagination-1', 10);
      const config2 = service.createPaginationConfig('pagination-2', 20);

      service.setCurrentPage('pagination-1', 2);
      service.setCurrentPage('pagination-2', 2);

      expect(service.getAbsoluteIndex('pagination-1', 0)).toBe(11);
      expect(service.getAbsoluteIndex('pagination-2', 0)).toBe(21);
    });

    it('should work with page 0 (edge case)', () => {
      const config = service.createPaginationConfig('test-pagination', 5);
      service.setCurrentPage('test-pagination', 0);

      // Page 0 with 5 items per page: (5 * (0 - 1)) + indexOnPage + 1
      expect(service.getAbsoluteIndex('test-pagination', 0)).toBe(-4);
      expect(service.getAbsoluteIndex('test-pagination', 4)).toBe(0);
    });
  });

  describe('createComputedAbsoluteIndex', () => {
    it('should return computed function that calculates absolute index', () => {
      const config = service.createPaginationConfig('test-pagination', 5);
      const computedFn = service.createComputedAbsoluteIndex(config);

      expect(computedFn()(0)).toBe(1);
      expect(computedFn()(1)).toBe(2);
      expect(computedFn()(4)).toBe(5);
    });

    it('should reactively update when currentPage changes', () => {
      const config = service.createPaginationConfig('test-pagination', 5);
      const computedFn = service.createComputedAbsoluteIndex(config);

      expect(computedFn()(0)).toBe(1);

      service.setCurrentPage('test-pagination', 2);

      expect(computedFn()(0)).toBe(6);
    });

    it('should reactively update when itemsPerPage changes', () => {
      const config = service.createPaginationConfig('test-pagination', 5);
      const computedFn = service.createComputedAbsoluteIndex(config);

      service.setCurrentPage('test-pagination', 2);

      expect(computedFn()(0)).toBe(6);

      // Manually update itemsPerPage
      config().itemsPerPage = 10;

      expect(computedFn()(0)).toBe(11);
    });

    it('should work with different configs', () => {
      const config1 = service.createPaginationConfig('pagination-1', 5);
      const config2 = service.createPaginationConfig('pagination-2', 10);

      const computedFn1 = service.createComputedAbsoluteIndex(config1);
      const computedFn2 = service.createComputedAbsoluteIndex(config2);

      service.setCurrentPage('pagination-1', 2);
      service.setCurrentPage('pagination-2', 3);

      expect(computedFn1()(0)).toBe(6);
      expect(computedFn2()(0)).toBe(21);
    });

    it('should match results from getAbsoluteIndex', () => {
      const config = service.createPaginationConfig('test-pagination', 5);
      const computedFn = service.createComputedAbsoluteIndex(config);

      service.setCurrentPage('test-pagination', 3);

      for (let i = 0; i < 10; i++) {
        expect(computedFn()(i)).toBe(service.getAbsoluteIndex('test-pagination', i));
      }
    });
  });

  describe('Integration Tests', () => {
    it('should manage complete pagination lifecycle', () => {
      const config = service.createPaginationConfig('test-pagination', 10);

      expect(config().currentPage).toBe(1);

      service.setCurrentPage('test-pagination', 2);
      expect(config().currentPage).toBe(2);
      expect(service.getAbsoluteIndex('test-pagination', 0)).toBe(11);

      service.setCurrentPage('test-pagination', 3);
      expect(config().currentPage).toBe(3);
      expect(service.getAbsoluteIndex('test-pagination', 5)).toBe(26);

      service.resetPage('test-pagination');
      expect(config().currentPage).toBe(1);
      expect(service.getAbsoluteIndex('test-pagination', 0)).toBe(1);
    });

    it('should handle multiple pagination instances independently', () => {
      const config1 = service.createPaginationConfig('books-pagination', 5);
      const config2 = service.createPaginationConfig('courses-pagination', 10);

      service.setCurrentPage('books-pagination', 2);
      service.setCurrentPage('courses-pagination', 3);

      expect(config1().currentPage).toBe(2);
      expect(config2().currentPage).toBe(3);

      expect(service.getAbsoluteIndex('books-pagination', 0)).toBe(6);
      expect(service.getAbsoluteIndex('courses-pagination', 0)).toBe(21);

      service.resetPage('books-pagination');

      expect(config1().currentPage).toBe(1);
      expect(config2().currentPage).toBe(3); // Should not change
    });

    it('should work correctly with createComputedAbsoluteIndex throughout lifecycle', () => {
      const config = service.createPaginationConfig('test-pagination', 5);
      const computedFn = service.createComputedAbsoluteIndex(config);

      expect(computedFn()(0)).toBe(1);

      service.setCurrentPage('test-pagination', 4);
      expect(computedFn()(0)).toBe(16);

      service.resetPage('test-pagination');
      expect(computedFn()(0)).toBe(1);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string id', () => {
      const config = service.createPaginationConfig('', 5);

      expect(config().id).toBe('');
      expect(service.getPaginationConfig('')).toBe(config);
    });

    it('should handle special characters in id', () => {
      const config = service.createPaginationConfig('test-pagination_#@!', 5);

      expect(config().id).toBe('test-pagination_#@!');
      expect(service.getPaginationConfig('test-pagination_#@!')).toBe(config);
    });

    it('should handle negative itemsPerPage (edge case)', () => {
      const config = service.createPaginationConfig('test-pagination', -5);

      expect(config().itemsPerPage).toBe(-5);

      service.setCurrentPage('test-pagination', 2);

      // Negative itemsPerPage causes negative absolute index
      expect(service.getAbsoluteIndex('test-pagination', 0)).toBe(-4);
    });

    it('should handle zero itemsPerPage (edge case)', () => {
      const config = service.createPaginationConfig('test-pagination', 0);

      expect(config().itemsPerPage).toBe(0);

      service.setCurrentPage('test-pagination', 2);

      // Zero itemsPerPage: 0 * (2 - 1) + 0 + 1 = 1
      expect(service.getAbsoluteIndex('test-pagination', 0)).toBe(1);
    });

    it('should handle negative page numbers (edge case)', () => {
      const config = service.createPaginationConfig('test-pagination', 5);

      service.setCurrentPage('test-pagination', -2);

      expect(config().currentPage).toBe(-2);

      // 5 * (-2 - 1) + 0 + 1 = 5 * -3 + 1 = -14
      expect(service.getAbsoluteIndex('test-pagination', 0)).toBe(-14);
    });

    it('should not lose configs after many operations', () => {
      service.createPaginationConfig('test-pagination', 5);

      for (let i = 0; i < 100; i++) {
        service.setCurrentPage('test-pagination', i);
        service.getAbsoluteIndex('test-pagination', 0);
      }

      const config = service.getPaginationConfig('test-pagination');

      expect(config).toBeTruthy();
      expect(config!().id).toBe('test-pagination');
    });
  });
});
