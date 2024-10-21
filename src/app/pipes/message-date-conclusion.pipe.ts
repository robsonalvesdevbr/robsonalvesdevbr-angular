import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messageDateConclusion',
  standalone: true,
})
export class MessageDateConclusionPipe implements PipeTransform {
  transform(conclusionStatus: 'completed' | 'locked' | 'inprogress'): string {
    if (conclusionStatus === 'completed') {
      return this.getCompletedMessage();
    } else if (conclusionStatus === 'locked') {
      return this.getLockedMessage();
    } else if (conclusionStatus === 'inprogress') {
      return this.getInProgressMessage();
    } else {
      return this.getDefaultMessage();
    }
  }

  private getCompletedMessage(): string {
    return 'Concluído';
  }

  private getLockedMessage(): string {
    return 'Trancado';
  }

  private getInProgressMessage(): string {
    return 'Em andamento';
  }

  private getDefaultMessage(): string {
    return 'Estado desconhecido';
  }
}
