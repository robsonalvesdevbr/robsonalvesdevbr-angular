import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'sortby',
})
export class SortbyPipe implements PipeTransform {
  transform(array: any, campo?: any, order?: any): any[] {
    if (array && campo && order) {
      if (order === 'asc') {
        return array.sort((a: any, b: any) => (a[campo] > b[campo] ? 1 : -1))
      } else {
        return array.sort((a: any, b: any) => (a[campo] < b[campo] ? 1 : -1))
      }
    } else {
      return array.sort((a: any, b: any) => (a > b ? 1 : -1))
    }
  }
}
