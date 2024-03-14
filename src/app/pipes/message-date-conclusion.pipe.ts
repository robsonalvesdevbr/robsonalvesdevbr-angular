import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messageDateConclusion'
})
export class MessageDateConclusionPipe implements PipeTransform {

  transform(conclusion: boolean): string {
    return conclusion ? 'Concluído' : 'Trancado';
  }

}
