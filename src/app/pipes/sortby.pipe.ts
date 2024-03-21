import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({
  name: 'sortby'
})
export class SortbyPipe implements PipeTransform {

  transform(array: any, campo?: any, order?: any): any[] {
      return orderBy(array, campo, order);
  }

}
