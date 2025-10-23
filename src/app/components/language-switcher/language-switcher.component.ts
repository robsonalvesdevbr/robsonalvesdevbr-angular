import { Component, inject, computed, ChangeDetectionStrategy, signal, HostListener, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService, Language } from '@path-services/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSwitcherComponent {
  private languageService = inject(LanguageService);

  // Signal para controlar o estado aberto/fechado do dropdown
  isOpen = signal(false);

  // Evita toggle duplo quando mousedown e click disparam em sequência
  private lastToggleAt: number | null = null;

  // Emite quando um idioma é selecionado (para o pai poder reagir, ex.: fechar navbar)
  @Output() languageSelected = new EventEmitter<void>();

  currentLanguage = this.languageService.currentLanguage;

  // Computed para informações do idioma
  languageInfo = computed(() => {
    const lang = this.currentLanguage();
    return {
      code: lang === 'pt-BR' ? 'PT-BR' : 'EN-US',
      flag: lang === 'pt-BR' ? '🇧🇷' : '🇺🇸',
      label: lang === 'pt-BR' ? 'Português' : 'English',
      ariaLabel: lang === 'pt-BR'
        ? 'Selecionar idioma'
        : 'Select language'
    };
  });

  // Fecha o dropdown ao clicar fora
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    // Não faz nada se o dropdown já está fechado
    if (!this.isOpen()) {
      return;
    }

    const target = event.target as HTMLElement;
    const clickedInside = target.closest('[data-testid="language-switcher"]');

    // Se clicou fora E o dropdown está aberto, fecha
    if (!clickedInside) {
      this.isOpen.set(false);
    }
  }

  toggleDropdown(event: Event): void {
    // Para a propagação para evitar que o HostListener capture imediatamente
    event.stopPropagation();
    event.preventDefault();

    // Evita toggle duplo se mousedown já alternou recentemente
    const now = performance.now();
    if (this.lastToggleAt && now - this.lastToggleAt < 180) {
      return;
    }

    this.isOpen.update(value => !value);
  }

  onButtonMouseDown(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.isOpen.update(value => !value);
    this.lastToggleAt = performance.now();
  }

  selectLanguage(lang: Language): void {
    // Fecha o dropdown IMEDIATAMENTE antes de qualquer outra ação
    this.isOpen.set(false);

    // Define o novo idioma
    this.languageService.setLanguage(lang);

    // Notifica interessados (ex.: NavigationComponent) para ações adicionais
    this.languageSelected.emit();
  }
}
