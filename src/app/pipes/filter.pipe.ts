import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
  pure: true,
})
export class FilterPipe implements PipeTransform {
  transform(
    data: readonly any[] | any[] | null | undefined,
    typeField: 'string' | 'array',
    filterProperty: any,
    filter: string
  ): any[] {
    if (!data) return [];
    
    const filterLowerCase = filter.toLowerCase().split(',');

    const filterField = (field: any) => {
      if (typeField === 'string') {
        return filterLowerCase.includes(field.toLowerCase());
      } else {
        return (field as string[]).some((f) =>
          filterLowerCase.includes(f.toLowerCase())
        );
      }
    };

    return filter
      ? [...data].filter((item) => filterField(item[filterProperty]))
      : [...data];
  }
}
