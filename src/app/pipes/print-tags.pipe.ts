import { Pipe, PipeTransform } from '@angular/core';
import { slugToLabel } from './tag-label.pipe';

@Pipe({
  name: 'printTags',
  standalone: true,
})
export class PrintTagsPipe implements PipeTransform {
  transform(tags: string[], applyLabels = false): string {
    if (applyLabels) {
      return tags.map(t => slugToLabel(t)).join(' , ');
    }
    return tags.join(' , ');
  }
}
