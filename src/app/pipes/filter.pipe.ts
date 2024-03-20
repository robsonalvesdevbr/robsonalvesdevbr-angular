import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(data: any[], typeField: 'string' | 'array', filterProperty: any, filter: string): any[] {
    const filterLowerCase = filter.toLowerCase();

    const filterField = (field: any) => {
      let locate = false;

      if (typeField === 'string') {
        filterLowerCase.split(',').forEach((x) => {
          if (x == field.toLowerCase()) {
            locate = true;
            return;
          }
        });
      }
      else {
        filterLowerCase.split(',').forEach((x) => {
          if ((field as string[]).findIndex(f => f.toLowerCase() === x.toLowerCase()) != -1) {
            locate = true;
            return;
          }
        });
      }

      return locate;
    };

    return filterLowerCase
      ? data.filter((item) =>
        filterField(item[filterProperty])
      )
      : data;
  }
}
