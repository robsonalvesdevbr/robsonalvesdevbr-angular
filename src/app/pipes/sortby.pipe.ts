import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortby',
})
export class SortbyPipe implements PipeTransform {
  transform<T>(array: T[], field?: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
    if (!Array.isArray(array)) {
      return array;
    }

    return array.sort(this.getSortFn(field, order));
  }

  private getSortFn<T>(field?: keyof T, order: 'asc' | 'desc' = 'asc'): (a: T, b: T) => number {
    return (a: T, b: T): number => {
      const comparison = this.compareValues(a, b, field);
      return order === 'asc' ? comparison : -comparison;
    };
  }

  private compareValues<T>(a: T, b: T, field?: keyof T): number {
    const valueA = field ? a[field] : a;
    const valueB = field ? b[field] : b;

    if (valueA > valueB) {
      return 1;
    } else if (valueA < valueB) {
      return -1;
    } else {
      return 0;
    }
  }
}
