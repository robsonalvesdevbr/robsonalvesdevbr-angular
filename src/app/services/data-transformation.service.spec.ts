import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { DataTransformationService, SortOptions } from './data-transformation.service';

describe('DataTransformationService', () => {
  let service: DataTransformationService;

  interface TestItem {
    id: number;
    name: string;
    category: string;
    date: string;
    nested?: {
      value: number;
    };
  }

  const mockData: TestItem[] = [
    { id: 1, name: 'Angular', category: 'Frontend', date: '2024-01-15', nested: { value: 100 } },
    { id: 2, name: 'React', category: 'Frontend', date: '2024-02-20', nested: { value: 200 } },
    { id: 3, name: 'Vue', category: 'Frontend', date: '2023-12-10', nested: { value: 150 } },
    { id: 4, name: 'Node.js', category: 'Backend', date: '2024-03-05', nested: { value: 300 } },
    { id: 5, name: 'Django', category: 'Backend', date: '2024-01-20', nested: { value: 250 } },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        DataTransformationService,
      ],
    });

    service = TestBed.inject(DataTransformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createSortedSignal', () => {
    it('should sort data in ascending order', () => {
      const data = signal<TestItem[]>(mockData);
      const sortOptions = signal<SortOptions>({ key: 'name', direction: 'asc' });

      const sortedSignal = service.createSortedSignal(data, sortOptions);
      const result = sortedSignal();

      expect(result[0].name).toBe('Angular');
      expect(result[4].name).toBe('Vue');
    });

    it('should sort data in descending order', () => {
      const data = signal<TestItem[]>(mockData);
      const sortOptions = signal<SortOptions>({ key: 'name', direction: 'desc' });

      const sortedSignal = service.createSortedSignal(data, sortOptions);
      const result = sortedSignal();

      expect(result[0].name).toBe('Vue');
      expect(result[4].name).toBe('Angular');
    });

    it('should sort by numeric field', () => {
      const data = signal<TestItem[]>(mockData);
      const sortOptions = signal<SortOptions>({ key: 'id', direction: 'desc' });

      const sortedSignal = service.createSortedSignal(data, sortOptions);
      const result = sortedSignal();

      expect(result[0].id).toBe(5);
      expect(result[4].id).toBe(1);
    });

    it('should sort by nested property', () => {
      const data = signal<TestItem[]>(mockData);
      const sortOptions = signal<SortOptions>({ key: 'nested.value', direction: 'asc' });

      const sortedSignal = service.createSortedSignal(data, sortOptions);
      const result = sortedSignal();

      expect(result[0].nested?.value).toBe(100);
      expect(result[4].nested?.value).toBe(300);
    });

    it('should return original data when key is empty', () => {
      const data = signal<TestItem[]>(mockData);
      const sortOptions = signal<SortOptions>({ key: '', direction: 'asc' });

      const sortedSignal = service.createSortedSignal(data, sortOptions);
      const result = sortedSignal();

      expect(result).toEqual(mockData);
    });

    it('should reactively update when sort options change', () => {
      const data = signal<TestItem[]>(mockData);
      const sortOptions = signal<SortOptions>({ key: 'name', direction: 'asc' });

      const sortedSignal = service.createSortedSignal(data, sortOptions);

      expect(sortedSignal()[0].name).toBe('Angular');

      sortOptions.set({ key: 'name', direction: 'desc' });

      expect(sortedSignal()[0].name).toBe('Vue');
    });

    it('should not mutate original data', () => {
      const data = signal<TestItem[]>(mockData);
      const sortOptions = signal<SortOptions>({ key: 'name', direction: 'asc' });

      service.createSortedSignal(data, sortOptions);

      expect(data()[0]).toEqual(mockData[0]);
    });
  });

  describe('createFilteredSignal', () => {
    it('should filter data based on predicate', () => {
      const data = signal<TestItem[]>(mockData);
      const filterFn = signal<(item: TestItem) => boolean>(
        (item) => item.category === 'Frontend'
      );

      const filteredSignal = service.createFilteredSignal(data, filterFn);
      const result = filteredSignal();

      expect(result.length).toBe(3);
      expect(result.every(item => item.category === 'Frontend')).toBe(true);
    });

    it('should reactively update when filter function changes', () => {
      const data = signal<TestItem[]>(mockData);
      const filterFn = signal<(item: TestItem) => boolean>(
        (item) => item.category === 'Frontend'
      );

      const filteredSignal = service.createFilteredSignal(data, filterFn);

      expect(filteredSignal().length).toBe(3);

      filterFn.set((item) => item.category === 'Backend');

      expect(filteredSignal().length).toBe(2);
    });

    it('should return empty array when no items match', () => {
      const data = signal<TestItem[]>(mockData);
      const filterFn = signal<(item: TestItem) => boolean>(
        (item) => item.category === 'NonExistent'
      );

      const filteredSignal = service.createFilteredSignal(data, filterFn);
      const result = filteredSignal();

      expect(result).toEqual([]);
    });

    it('should return all items when filter always returns true', () => {
      const data = signal<TestItem[]>(mockData);
      const filterFn = signal<(item: TestItem) => boolean>(() => true);

      const filteredSignal = service.createFilteredSignal(data, filterFn);
      const result = filteredSignal();

      expect(result.length).toBe(mockData.length);
    });
  });

  describe('createPaginatedSignal', () => {
    it('should return first page correctly', () => {
      const data = signal<TestItem[]>(mockData);
      const page = signal(1);
      const itemsPerPage = signal(2);

      const paginatedSignal = service.createPaginatedSignal(data, page, itemsPerPage);
      const result = paginatedSignal();

      expect(result.length).toBe(2);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
    });

    it('should return second page correctly', () => {
      const data = signal<TestItem[]>(mockData);
      const page = signal(2);
      const itemsPerPage = signal(2);

      const paginatedSignal = service.createPaginatedSignal(data, page, itemsPerPage);
      const result = paginatedSignal();

      expect(result.length).toBe(2);
      expect(result[0].id).toBe(3);
      expect(result[1].id).toBe(4);
    });

    it('should return partial last page', () => {
      const data = signal<TestItem[]>(mockData);
      const page = signal(3);
      const itemsPerPage = signal(2);

      const paginatedSignal = service.createPaginatedSignal(data, page, itemsPerPage);
      const result = paginatedSignal();

      expect(result.length).toBe(1);
      expect(result[0].id).toBe(5);
    });

    it('should reactively update when page changes', () => {
      const data = signal<TestItem[]>(mockData);
      const page = signal(1);
      const itemsPerPage = signal(2);

      const paginatedSignal = service.createPaginatedSignal(data, page, itemsPerPage);

      expect(paginatedSignal()[0].id).toBe(1);

      page.set(2);

      expect(paginatedSignal()[0].id).toBe(3);
    });

    it('should reactively update when items per page changes', () => {
      const data = signal<TestItem[]>(mockData);
      const page = signal(1);
      const itemsPerPage = signal(2);

      const paginatedSignal = service.createPaginatedSignal(data, page, itemsPerPage);

      expect(paginatedSignal().length).toBe(2);

      itemsPerPage.set(3);

      expect(paginatedSignal().length).toBe(3);
    });

    it('should return empty array for out of bounds page', () => {
      const data = signal<TestItem[]>(mockData);
      const page = signal(10);
      const itemsPerPage = signal(2);

      const paginatedSignal = service.createPaginatedSignal(data, page, itemsPerPage);
      const result = paginatedSignal();

      expect(result).toEqual([]);
    });
  });

  describe('createSearchSignal', () => {
    it('should search in single field', () => {
      const data = signal<TestItem[]>(mockData);
      const searchTerm = signal('Angular');
      const searchFields = ['name'];

      const searchSignal = service.createSearchSignal(data, searchTerm, searchFields);
      const result = searchSignal();

      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Angular');
    });

    it('should search in multiple fields', () => {
      const data = signal<TestItem[]>(mockData);
      const searchTerm = signal('Backend');
      const searchFields = ['name', 'category'];

      const searchSignal = service.createSearchSignal(data, searchTerm, searchFields);
      const result = searchSignal();

      expect(result.length).toBe(2);
      expect(result.every(item => item.category === 'Backend')).toBe(true);
    });

    it('should be case insensitive', () => {
      const data = signal<TestItem[]>(mockData);
      const searchTerm = signal('ANGULAR');
      const searchFields = ['name'];

      const searchSignal = service.createSearchSignal(data, searchTerm, searchFields);
      const result = searchSignal();

      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Angular');
    });

    it('should return all items when search term is empty', () => {
      const data = signal<TestItem[]>(mockData);
      const searchTerm = signal('');
      const searchFields = ['name'];

      const searchSignal = service.createSearchSignal(data, searchTerm, searchFields);
      const result = searchSignal();

      expect(result.length).toBe(mockData.length);
    });

    it('should trim search term', () => {
      const data = signal<TestItem[]>(mockData);
      const searchTerm = signal('  Angular  ');
      const searchFields = ['name'];

      const searchSignal = service.createSearchSignal(data, searchTerm, searchFields);
      const result = searchSignal();

      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Angular');
    });

    it('should search in nested properties', () => {
      const data = signal<TestItem[]>(mockData);
      const searchTerm = signal('100');
      const searchFields = ['nested.value'];

      const searchSignal = service.createSearchSignal(data, searchTerm, searchFields);
      const result = searchSignal();

      expect(result.length).toBe(1);
      expect(result[0].nested?.value).toBe(100);
    });

    it('should return empty array when no matches found', () => {
      const data = signal<TestItem[]>(mockData);
      const searchTerm = signal('NonExistent');
      const searchFields = ['name'];

      const searchSignal = service.createSearchSignal(data, searchTerm, searchFields);
      const result = searchSignal();

      expect(result).toEqual([]);
    });

    it('should reactively update when search term changes', () => {
      const data = signal<TestItem[]>(mockData);
      const searchTerm = signal('Angular');
      const searchFields = ['name'];

      const searchSignal = service.createSearchSignal(data, searchTerm, searchFields);

      expect(searchSignal().length).toBe(1);

      searchTerm.set('React');

      expect(searchSignal().length).toBe(1);
      expect(searchSignal()[0].name).toBe('React');
    });
  });

  describe('createEnumToArraySignal', () => {
    enum TestEnum {
      First = 'first_value',
      Second = 'second_value',
      Third = 'third_value',
    }

    it('should convert enum to array of key-value pairs', () => {
      const enumSignal = service.createEnumToArraySignal(TestEnum);
      const result = enumSignal();

      expect(result.length).toBe(3);
      expect(result[0]).toEqual({ key: 'First', value: 'first_value' });
    });

    it('should handle numeric enums', () => {
      enum NumericEnum {
        One = 1,
        Two = 2,
        Three = 3,
      }

      const enumSignal = service.createEnumToArraySignal(NumericEnum);
      const result = enumSignal();

      expect(result.length).toBe(3);
      expect(result.some(item => item.key === 'One')).toBe(true);
    });

    it('should filter out numeric keys from enum', () => {
      enum MixedEnum {
        First = 0,
        Second = 1,
      }

      const enumSignal = service.createEnumToArraySignal(MixedEnum);
      const result = enumSignal();

      // Should only have string keys (First, Second), not numeric (0, 1)
      expect(result.every(item => isNaN(Number(item.key)))).toBe(true);
    });
  });

  describe('createTagsArraySignal', () => {
    it('should convert Set to sorted array', () => {
      const tags = signal(new Set(['TypeScript', 'Angular', 'RxJS']));

      const tagsSignal = service.createTagsArraySignal(tags);
      const result = tagsSignal();

      expect(result).toEqual(['Angular', 'RxJS', 'TypeScript']);
    });

    it('should return empty array for empty Set', () => {
      const tags = signal(new Set<string>());

      const tagsSignal = service.createTagsArraySignal(tags);
      const result = tagsSignal();

      expect(result).toEqual([]);
    });

    it('should reactively update when Set changes', () => {
      const tags = signal(new Set(['TypeScript']));

      const tagsSignal = service.createTagsArraySignal(tags);

      expect(tagsSignal()).toEqual(['TypeScript']);

      tags.set(new Set(['TypeScript', 'Angular']));

      expect(tagsSignal()).toEqual(['Angular', 'TypeScript']);
    });

    it('should handle Set with single item', () => {
      const tags = signal(new Set(['Vitest']));

      const tagsSignal = service.createTagsArraySignal(tags);
      const result = tagsSignal();

      expect(result).toEqual(['Vitest']);
    });
  });

  describe('formatDate', () => {
    const testDate = new Date(2024, 0, 15, 12, 0, 0); // January 15, 2024, 12:00 (local time)

    it('should format date in short format', () => {
      const result = service.formatDate(testDate, 'short');

      expect(result).toContain('15');
      expect(result).toContain('01');
      expect(result).toContain('2024');
    });

    it('should format date in medium format', () => {
      const result = service.formatDate(testDate, 'medium');

      expect(result).toContain('15');
      expect(result).toContain('2024');
    });

    it('should format date in long format', () => {
      const result = service.formatDate(testDate, 'long');

      expect(result).toContain('15');
      expect(result).toContain('2024');
    });

    it('should default to medium format', () => {
      const result = service.formatDate(testDate);

      expect(result).toBeTruthy();
    });

    it('should handle Date object', () => {
      const dateObj = new Date(2024, 0, 15, 12, 0, 0);
      const result = service.formatDate(dateObj, 'short');

      expect(result).toContain('15');
    });

    it('should handle string date', () => {
      const dateStr = '2024-01-15T12:00:00';
      const result = service.formatDate(dateStr, 'short');

      expect(result).toContain('2024');
    });
  });

  describe('formatTags', () => {
    it('should join tags with default separator', () => {
      const tags = ['Angular', 'TypeScript', 'RxJS'];
      const result = service.formatTags(tags);

      expect(result).toBe('Angular, TypeScript, RxJS');
    });

    it('should join tags with custom separator', () => {
      const tags = ['Angular', 'TypeScript', 'RxJS'];
      const result = service.formatTags(tags, ' | ');

      expect(result).toBe('Angular | TypeScript | RxJS');
    });

    it('should handle single tag', () => {
      const tags = ['Angular'];
      const result = service.formatTags(tags);

      expect(result).toBe('Angular');
    });

    it('should handle empty array', () => {
      const tags: string[] = [];
      const result = service.formatTags(tags);

      expect(result).toBe('');
    });
  });

  describe('truncateText', () => {
    it('should truncate text longer than max length', () => {
      const text = 'This is a very long text that needs to be truncated';
      const result = service.truncateText(text, 20);

      expect(result.length).toBe(20);
      expect(result).toContain('...');
    });

    it('should not truncate text shorter than max length', () => {
      const text = 'Short text';
      const result = service.truncateText(text, 20);

      expect(result).toBe('Short text');
    });

    it('should use custom suffix', () => {
      const text = 'This is a very long text';
      const result = service.truncateText(text, 15, '…');

      expect(result).toContain('…');
      expect(result.length).toBe(15);
    });

    it('should handle text exactly at max length', () => {
      const text = 'Exactly20Characters!';
      const result = service.truncateText(text, 20);

      expect(result).toBe(text);
    });

    it('should handle empty text', () => {
      const text = '';
      const result = service.truncateText(text, 10);

      expect(result).toBe('');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty data arrays', () => {
      const data = signal<TestItem[]>([]);
      const sortOptions = signal<SortOptions>({ key: 'name', direction: 'asc' });

      const sortedSignal = service.createSortedSignal(data, sortOptions);

      expect(sortedSignal()).toEqual([]);
    });

    it('should handle undefined nested properties in search', () => {
      const dataWithMissingNested: TestItem[] = [
        { id: 1, name: 'Test', category: 'A', date: '2024-01-01' },
      ];
      const data = signal(dataWithMissingNested);
      const searchTerm = signal('100');
      const searchFields = ['nested.value'];

      const searchSignal = service.createSearchSignal(data, searchTerm, searchFields);

      expect(searchSignal()).toEqual([]);
    });

    it('should handle null values in getNestedProperty', () => {
      const data = signal<TestItem[]>([
        { id: 1, name: 'Test', category: 'A', date: '2024-01-01', nested: undefined },
      ]);
      const sortOptions = signal<SortOptions>({ key: 'nested.value', direction: 'asc' });

      const sortedSignal = service.createSortedSignal(data, sortOptions);

      expect(() => sortedSignal()).not.toThrow();
    });
  });
});
