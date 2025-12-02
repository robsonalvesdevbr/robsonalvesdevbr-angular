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
