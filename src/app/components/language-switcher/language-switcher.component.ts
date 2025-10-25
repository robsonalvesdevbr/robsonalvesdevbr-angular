import { Component, inject, computed, ChangeDetectionStrategy, signal, HostListener, Output, EventEmitter, ViewChild, ElementRef, effect } from '@angular/core';
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

  // ViewChild para acessar o botão e calcular posição do dropdown
  @ViewChild('dropdownButton', { read: ElementRef }) dropdownButton?: ElementRef<HTMLButtonElement>;

  // Signal para controlar o estado aberto/fechado do dropdown
  isOpen = signal(false);

  // Signals para controlar a posição e alinhamento do dropdown
  dropdownAlignRight = signal<boolean>(true);
  dropdownTop = signal<string>('100%');

  // Evita toggle duplo quando mousedown e click disparam em sequência
  private lastToggleAt: number | null = null;

  // Emite quando um idioma é selecionado (para o pai poder reagir, ex.: fechar navbar)
  @Output() languageSelected = new EventEmitter<void>();

  currentLanguage = this.languageService.currentLanguage;

  constructor() {
    // Atualiza o alinhamento do dropdown quando ele abre
    effect(() => {
      if (this.isOpen() && this.dropdownButton) {
        this.updateDropdownPosition();
      }
    });
  }

  private updateDropdownPosition(): void {
    if (!this.dropdownButton) return;

    const buttonRect = this.dropdownButton.nativeElement.getBoundingClientRect();
    const dropdownWidth = 180;
    const viewportWidth = window.innerWidth;

    // Em telas muito estreitas (<400px), usa position fixed
    if (viewportWidth < 400) {
      // Calcula a posição top logo abaixo do botão
      const topPosition = buttonRect.bottom + 2;
      this.dropdownTop.set(`${topPosition}px`);
      // Não importa o alinhamento, pois vai ocupar quase toda a largura
      this.dropdownAlignRight.set(false);
    } else {
      // Comportamento normal: verifica espaço à direita
      this.dropdownTop.set('100%'); // Posição relativa padrão
      const spaceOnRight = viewportWidth - buttonRect.right;

      if (spaceOnRight < dropdownWidth + 16) {
        this.dropdownAlignRight.set(false);
      } else {
        this.dropdownAlignRight.set(true);
      }
    }
  }

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

    const target = event.target as EventTarget | null;
    let clickedInside = false;
    if (target && target instanceof Element) {
      clickedInside = !!target.closest('[data-testid="language-switcher"]');
    }

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
