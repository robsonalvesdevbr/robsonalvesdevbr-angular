import { Pipe, PipeTransform } from '@angular/core';

type FilterableValue = string | string[];

@Pipe({
  name: 'filter',
  standalone: true,
  pure: true,
})
export class FilterPipe implements PipeTransform {
  transform<T extends Record<string, unknown>>(
    data: readonly T[] | T[] | null | undefined,
    typeField: 'string' | 'array',
    filterProperty: keyof T,
    filter: string
  ): T[] {
    if (!data) return [];

    const filterLowerCase = filter.toLowerCase().split(',');

    const filterField = (field: FilterableValue): boolean => {
      if (typeField === 'string') {
        return filterLowerCase.includes((field as string).toLowerCase());
      } else {
        return (field as string[]).some((f) =>
          filterLowerCase.includes(f.toLowerCase())
        );
      }
    };

    return filter
      ? [...data].filter((item) => filterField(item[filterProperty] as FilterableValue))
      : [...data];
  }
}
