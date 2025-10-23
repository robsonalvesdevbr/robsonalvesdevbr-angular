import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService } from '@path-services/language.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false // Necessário para reagir a mudanças de Signal
})
export class TranslatePipe implements PipeTransform {
  private languageService = inject(LanguageService);

  transform(key: string, params?: Record<string, string>): string {
    return this.languageService.translate(key, params);
  }
}
