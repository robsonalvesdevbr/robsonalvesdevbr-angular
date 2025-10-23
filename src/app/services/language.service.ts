import { Injectable, signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type Language = 'pt-BR' | 'en-US';
export type TranslationKeys = Record<string, string | Record<string, any>>;

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

  constructor(private http: HttpClient) {
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

  private getNestedValue(obj: any, path: string): string {
    return path.split('.').reduce((current, key) => current?.[key], obj) || '';
  }

  private isValidLanguage(lang: string): lang is Language {
    return lang === 'pt-BR' || lang === 'en-US';
  }
}
