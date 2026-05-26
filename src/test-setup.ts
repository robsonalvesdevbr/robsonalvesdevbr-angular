import 'zone.js';
import 'zone.js/testing';
import './vitest-jasmine-shim';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// Suprimir warning NG0914 (esperado em testes com Zone.js + zoneless)
const originalConsoleWarn = console.warn;
console.warn = (...args: unknown[]) => {
  if (typeof args[0] === 'string' && args[0].includes('NG0914')) {
    return; // Ignora warning NG0914
  }
  originalConsoleWarn.apply(console, args);
};

// Setup do ambiente de testes Angular (com Zone.js para TestBed)
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

// Garante localStorage funcional após inicialização do ambiente Angular
const _localStore: Record<string, string> = {};
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: (key: string): string | null => key in _localStore ? _localStore[key] : null,
    setItem: (key: string, value: string): void => { _localStore[key] = String(value); },
    removeItem: (key: string): void => { delete _localStore[key]; },
    clear: (): void => { Object.keys(_localStore).forEach(k => delete _localStore[k]); },
    key: (index: number): string | null => Object.keys(_localStore)[index] ?? null,
    get length(): number { return Object.keys(_localStore).length; },
  },
  writable: true,
  configurable: true,
});
