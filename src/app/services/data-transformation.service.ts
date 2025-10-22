import { Injectable, computed, Signal } from '@angular/core';

export interface SortOptions {
  key: string;
  direction: 'asc' | 'desc';
}

@Injectable({
  providedIn: 'root'
})
export class DataTransformationService {

  createSortedSignal<T>(
    data: Signal<T[]>,
    sortOptions: Signal<SortOptions>
  ): Signal<T[]> {
    return computed(() => {
      const items = data();
      const options = sortOptions();
      
      if (!options.key) return items;
      
      return [...items].sort((a: T, b: T) => {
        const aValue = this.getNestedProperty(a, options.key);
        const bValue = this.getNestedProperty(b, options.key);

        let comparison = 0;
        if (aValue > bValue) comparison = 1;
        if (aValue < bValue) comparison = -1;

        return options.direction === 'desc' ? -comparison : comparison;
      });
    });
  }

  createFilteredSignal<T>(
    data: Signal<T[]>,
    filterFn: Signal<(item: T) => boolean>
  ): Signal<T[]> {
    return computed(() => {
      const items = data();
      const filter = filterFn();
      return items.filter(filter);
    });
  }

  createPaginatedSignal<T>(
    data: Signal<T[]>,
    page: Signal<number>,
    itemsPerPage: Signal<number>
  ): Signal<T[]> {
    return computed(() => {
      const items = data();
      const currentPage = page();
      const perPage = itemsPerPage();
      
      const startIndex = (currentPage - 1) * perPage;
      const endIndex = startIndex + perPage;
      
      return items.slice(startIndex, endIndex);
    });
  }

  createSearchSignal<T>(
    data: Signal<T[]>,
    searchTerm: Signal<string>,
    searchFields: string[]
  ): Signal<T[]> {
    return computed(() => {
      const items = data();
      const term = searchTerm().toLowerCase().trim();
      
      if (!term) return items;
      
      return items.filter(item => 
        searchFields.some(field => {
          const value = this.getNestedProperty(item, field);
          return value && value.toString().toLowerCase().includes(term);
        })
      );
    });
  }

  createEnumToArraySignal<T extends Record<string, string | number>>(
    enumObject: T
  ): Signal<Array<{ key: keyof T; value: T[keyof T] }>> {
    return computed(() => {
      return Object.keys(enumObject)
        .filter(key => isNaN(Number(key)))
        .map(key => ({
          key: key as keyof T,
          value: enumObject[key as keyof T]
        }));
    });
  }

  createTagsArraySignal(
    tags: Signal<Set<string>>
  ): Signal<string[]> {
    return computed(() => {
      return Array.from(tags().values()).sort();
    });
  }

  private getNestedProperty(obj: unknown, path: string): unknown {
    return path.split('.').reduce((current: unknown, prop: string) => {
      if (current && typeof current === 'object' && prop in current) {
        return (current as Record<string, unknown>)[prop];
      }
      return undefined;
    }, obj);
  }

  formatDate(date: string | Date, format: 'short' | 'medium' | 'long' = 'medium'): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    switch (format) {
      case 'short':
        return dateObj.toLocaleDateString('pt-BR');
      case 'medium':
        return dateObj.toLocaleDateString('pt-BR', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      case 'long':
        return dateObj.toLocaleDateString('pt-BR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      default:
        return dateObj.toLocaleDateString('pt-BR');
    }
  }

  formatTags(tags: string[], separator: string = ', '): string {
    return tags.join(separator);
  }

  truncateText(text: string, maxLength: number, suffix: string = '...'): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - suffix.length) + suffix;
  }
}