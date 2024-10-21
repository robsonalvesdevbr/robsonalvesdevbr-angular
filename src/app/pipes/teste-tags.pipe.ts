import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'testeTags',
  standalone: true
})
export class TesteTagsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
