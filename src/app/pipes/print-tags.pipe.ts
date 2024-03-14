import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'printTags'
})
export class PrintTagsPipe implements PipeTransform {

  transform(tags: string[]): string {
    return tags.join(' , ');
  }

}
