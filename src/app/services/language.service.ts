import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type Language = 'pt-BR' | 'en-US';
export type NestedTranslations = { [key: string]: string | NestedTranslations };
export type TranslationKeys = NestedTranslations;

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly STORAGE_KEY = 'app-language';
  private readonly DEFAULT_LANGUAGE: Language = 'pt-BR';

  // Signal para idioma atual
  currentLanguage = signal<Language>(this.getInitialLanguage());

  // Signals para traduções carregadas
  private ptBRTranslations = signal<TranslationKeys>({});
  private enUSTranslations = signal<TranslationKeys>({});

  // Computed signal para traduções do idioma atual
  currentTranslations = computed(() => {
    const lang = this.currentLanguage();
    return lang === 'pt-BR'
      ? this.ptBRTranslations()
      : this.enUSTranslations();
  });

  private readonly http = inject(HttpClient);

  constructor() {
    this.loadTranslations();

    // Effect para persistir mudanças
    effect(() => {
      const lang = this.currentLanguage();
      localStorage.setItem(this.STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    });
  }

  private getInitialLanguage(): Language {
    // 1. Verifica localStorage
    const stored = localStorage.getItem(this.STORAGE_KEY) as Language;
    if (stored && this.isValidLanguage(stored)) {
      return stored;
    }

    // 2. Sempre retorna PT-BR como padrão (conforme requisito)
    return this.DEFAULT_LANGUAGE;
  }

  private loadTranslations(): void {
    // Carrega PT-BR
    this.http.get<TranslationKeys>('/assets/i18n/pt-BR.json')
      .subscribe({
        next: translations => this.ptBRTranslations.set(translations),
        error: err => console.error('Error loading PT-BR translations:', err)
      });

    // Carrega EN-US
    this.http.get<TranslationKeys>('/assets/i18n/en-US.json')
      .subscribe({
        next: translations => this.enUSTranslations.set(translations),
        error: err => console.error('Error loading EN-US translations:', err)
      });
  }

  setLanguage(lang: Language): void {
    if (this.isValidLanguage(lang)) {
      this.currentLanguage.set(lang);
      // Persist immediately to ensure deterministic behavior (tests and runtime)
      try {
        localStorage.setItem(this.STORAGE_KEY, lang);
      } catch {
        // ignore storage errors (e.g., storage disabled)
      }
      document.documentElement.lang = lang;
    }
  }

  toggleLanguage(): void {
    const current = this.currentLanguage();
    this.setLanguage(current === 'pt-BR' ? 'en-US' : 'pt-BR');
  }

  translate(key: string, params?: Record<string, string>): string {
    const translations = this.currentTranslations();
    let value = this.getNestedValue(translations, key);

    if (!value) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }

    // Substituição de parâmetros (ex: "Hello {{name}}")
    if (params) {
      Object.keys(params).forEach(param => {
        value = value.replace(new RegExp(`{{${param}}}`, 'g'), params[param]);
      });
    }

    return value;
  }

  private getNestedValue(obj: NestedTranslations, path: string): string {
    const parts = path.split('.');
    let current: string | NestedTranslations | undefined = obj;
    for (const p of parts) {
      if (current && typeof current === 'object' && p in current) {
        current = (current as NestedTranslations)[p];
      } else {
        return '';
      }
    }
    return typeof current === 'string' ? current : '';
  }

  private isValidLanguage(lang: string): lang is Language {
    return lang === 'pt-BR' || lang === 'en-US';
  }
}
