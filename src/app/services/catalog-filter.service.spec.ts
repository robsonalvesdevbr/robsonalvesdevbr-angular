import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { CatalogFilterService } from './catalog-filter.service';

interface Item {
  category: string;
  tags: string[];
  name: string;
}

describe('CatalogFilterService', () => {
  let service: CatalogFilterService;

  const items: Item[] = [
    { category: 'A', tags: ['x', 'y'], name: 'Alpha' },
    { category: 'B', tags: ['y', 'z'], name: 'Beta' },
    { category: 'A', tags: ['z'], name: 'Gamma' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] });
    service = TestBed.inject(CatalogFilterService);
  });

  it('should collect unique sorted tags', () => {
    expect(service.collectUniqueTags(items, (i) => i.tags)).toEqual(['x', 'y', 'z']);
  });

  it('should filter by category', () => {
    const result = service.filterByCategoryAndTags(
      items,
      new Set(['A']),
      (i) => i.category,
      new Set(),
      (i) => i.tags,
      () => true
    );
    expect(result.map((i) => i.name)).toEqual(['Alpha', 'Gamma']);
  });

  it('should filter by tags', () => {
    const result = service.filterByCategoryAndTags(
      items,
      new Set(),
      (i) => i.category,
      new Set(['x']),
      (i) => i.tags,
      () => true
    );
    expect(result.map((i) => i.name)).toEqual(['Alpha']);
  });

  it('should filter by query predicate', () => {
    const result = service.filterByCategoryAndTags(
      items,
      new Set(),
      (i) => i.category,
      new Set(),
      (i) => i.tags,
      (i) => i.name.toLowerCase().includes('beta')
    );
    expect(result.map((i) => i.name)).toEqual(['Beta']);
  });
});
