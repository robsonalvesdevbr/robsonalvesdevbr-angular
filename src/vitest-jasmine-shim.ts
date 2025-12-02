/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi, expect } from 'vitest';

// Shimspara compatibilidade entre Jasmine e Vitest
globalThis.spyOn = vi.spyOn;
globalThis.jasmine = {
  createSpy: vi.fn,
  createSpyObj: (_baseName: string, methodNames: string[], properties?: any) => {
    const obj: any = {};
    methodNames.forEach(method => {
      const spy = vi.fn();
      spy.and = {
        returnValue: (value: any) => {
          spy.mockReturnValue(value);
          return spy;
        },
        callFake: (fn: any) => {
          spy.mockImplementation(fn);
          return spy;
        },
      };
      obj[method] = spy;
    });
    if (properties) {
      Object.assign(obj, properties);
    }
    return obj;
  },
  any: (constructor: any) => expect.any(constructor),
  anything: () => expect.anything(),
  objectContaining: (obj: any) => expect.objectContaining(obj),
  arrayContaining: (arr: any[]) => expect.arrayContaining(arr),
  stringContaining: (str: string) => expect.stringContaining(str),
  stringMatching: (pattern: string | RegExp) => expect.stringMatching(pattern),
} as any;

// Adicionar matchers do Jasmine ao expect do Vitest
expect.extend({
  toBeTrue(received: any) {
    const pass = received === true;
    return {
      pass,
      message: () => pass
        ? `expected ${received} not to be true`
        : `expected ${received} to be true`,
    };
  },
  toBeFalse(received: any) {
    const pass = received === false;
    return {
      pass,
      message: () => pass
        ? `expected ${received} not to be false`
        : `expected ${received} to be false`,
    };
  },
});
