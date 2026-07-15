import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CatalogFilterService {
  collectUniqueTags<T>(items: readonly T[], getTags: (item: T) => readonly string[]): string[] {
    const uniqueTags = new Set<string>();
    items.forEach((item) => getTags(item).forEach((tag) => uniqueTags.add(tag.trim())));
    return Array.from(uniqueTags).sort();
  }

  availableTags<T, C>(
    items: readonly T[],
    categoryFilter: ReadonlySet<C>,
    getCategory: (item: T) => C,
    getTags: (item: T) => readonly string[]
  ): string[] {
    if (categoryFilter.size === 0) {
      return this.collectUniqueTags(items, getTags);
    }
    const filtered = items.filter((item) => categoryFilter.has(getCategory(item)));
    return this.collectUniqueTags(filtered, getTags);
  }

  filterByCategoryAndTags<T, C>(
    items: readonly T[],
    categoryFilter: ReadonlySet<C>,
    getCategory: (item: T) => C,
    tagFilters: ReadonlySet<string>,
    getTags: (item: T) => readonly string[],
    matchesQuery: (item: T) => boolean
  ): T[] {
    return items.filter((item) => {
      if (categoryFilter.size > 0 && !categoryFilter.has(getCategory(item))) return false;
      if (tagFilters.size > 0 && !getTags(item).some((tag) => tagFilters.has(tag))) return false;
      return matchesQuery(item);
    });
  }

  reconcileTagFilters(
    availableTags: readonly string[],
    currentTagFilters: ReadonlySet<string>
  ): Set<string> | null {
    const available = new Set(availableTags);
    const valid = new Set([...currentTagFilters].filter((tag) => available.has(tag)));
    return valid.size !== currentTagFilters.size ? valid : null;
  }
}
