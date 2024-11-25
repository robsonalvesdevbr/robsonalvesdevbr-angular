import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToArray',
})
export class EnumToArrayPipe implements PipeTransform {
  transform(enumObj: object): { key: string; value: string | number }[] {
    return Object.entries(enumObj).map(([key, value]) => ({ key, value }));
  }
}
