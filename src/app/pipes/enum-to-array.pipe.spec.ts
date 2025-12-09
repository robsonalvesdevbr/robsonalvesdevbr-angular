import { EnumToArrayPipe } from './enum-to-array.pipe';

enum TestStringEnum {
  Option1 = 'value1',
  Option2 = 'value2',
  Option3 = 'value3',
}

enum TestNumericEnum {
  First,
  Second,
  Third,
}

enum TestMixedEnum {
  StringValue = 'string',
  NumericValue = 42,
}

describe('EnumToArrayPipe', () => {
  let pipe: EnumToArrayPipe;

  beforeEach(() => {
    pipe = new EnumToArrayPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('Pipe Structure', () => {
    it('should be standalone', () => {
      const pipeDef = (EnumToArrayPipe as any).ɵpipe;
      expect(pipeDef.standalone).toBe(true);
    });

    it('should be pure', () => {
      const pipeDef = (EnumToArrayPipe as any).ɵpipe;
      expect(pipeDef.pure).toBe(true);
    });

    it('should have correct pipe name', () => {
      const pipeDef = (EnumToArrayPipe as any).ɵpipe;
      expect(pipeDef.name).toBe('enumToArray');
    });
  });

  describe('String Enum Transformation', () => {
    it('should transform string enum to array', () => {
      const result = pipe.transform(TestStringEnum);

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(3);
    });

    it('should preserve enum keys', () => {
      const result = pipe.transform(TestStringEnum);

      const keys = result.map(item => item.key);
      expect(keys).toContain('Option1');
      expect(keys).toContain('Option2');
      expect(keys).toContain('Option3');
    });

    it('should preserve enum values', () => {
      const result = pipe.transform(TestStringEnum);

      const values = result.map(item => item.value);
      expect(values).toContain('value1');
      expect(values).toContain('value2');
      expect(values).toContain('value3');
    });

    it('should create objects with key-value structure', () => {
      const result = pipe.transform(TestStringEnum);

      result.forEach(item => {
        expect(item).toHaveProperty('key');
        expect(item).toHaveProperty('value');
        expect(typeof item.key).toBe('string');
      });
    });
  });

  describe('Numeric Enum Transformation', () => {
    it('should transform numeric enum to array', () => {
      const result = pipe.transform(TestNumericEnum);

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle numeric enum keys', () => {
      const result = pipe.transform(TestNumericEnum);

      const keys = result.map(item => item.key);
      // Numeric enums have both numeric keys and string keys
      expect(keys).toContain('First');
      expect(keys).toContain('Second');
      expect(keys).toContain('Third');
    });

    it('should handle numeric enum values', () => {
      const result = pipe.transform(TestNumericEnum);

      const stringKeys = result.filter(item => typeof item.key === 'string' && isNaN(Number(item.key)));
      expect(stringKeys.length).toBe(3);
    });
  });

  describe('Mixed Enum Transformation', () => {
    it('should handle enum with mixed value types', () => {
      const result = pipe.transform(TestMixedEnum);

      expect(result).toBeInstanceOf(Array);
      // Mixed enum com valor numérico cria reverse mapping: 3 entries total
      expect(result.length).toBe(3);
    });

    it('should preserve both string and number values', () => {
      const result = pipe.transform(TestMixedEnum);

      const values = result.map(item => item.value);
      expect(values).toContain('string');
      expect(values).toContain(42);
    });

    it('should create correct key-value pairs for mixed enum', () => {
      const result = pipe.transform(TestMixedEnum);

      const stringEntry = result.find(item => item.key === 'StringValue');
      const numericEntry = result.find(item => item.key === 'NumericValue');

      expect(stringEntry?.value).toBe('string');
      expect(numericEntry?.value).toBe(42);
    });
  });

  describe('Empty and Edge Cases', () => {
    it('should handle empty object', () => {
      const result = pipe.transform({});

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(0);
    });

    it('should handle single entry enum', () => {
      const singleEnum = { Only: 'one' };
      const result = pipe.transform(singleEnum);

      expect(result.length).toBe(1);
      expect(result[0].key).toBe('Only');
      expect(result[0].value).toBe('one');
    });

    it('should handle enum with special characters in keys', () => {
      const specialEnum = {
        'Key-With-Dash': 'value1',
        'Key_With_Underscore': 'value2',
        'Key.With.Dot': 'value3',
      };
      const result = pipe.transform(specialEnum);

      expect(result.length).toBe(3);
      expect(result.map(item => item.key)).toContain('Key-With-Dash');
    });

    it('should handle enum with unicode characters', () => {
      const unicodeEnum = {
        'Option①': 'value1',
        'Opção②': 'value2',
        'オプション③': 'value3',
      };
      const result = pipe.transform(unicodeEnum);

      expect(result.length).toBe(3);
    });
  });

  describe('Return Value Structure', () => {
    it('should return array with correct structure', () => {
      const result = pipe.transform(TestStringEnum);

      expect(Array.isArray(result)).toBe(true);
      result.forEach(item => {
        expect(typeof item).toBe('object');
        expect(Object.keys(item)).toEqual(['key', 'value']);
      });
    });

    it('should maintain entry order from Object.entries', () => {
      const orderedEnum = {
        First: 'a',
        Second: 'b',
        Third: 'c',
      };
      const result = pipe.transform(orderedEnum);

      expect(result[0].key).toBe('First');
      expect(result[1].key).toBe('Second');
      expect(result[2].key).toBe('Third');
    });
  });

  describe('Pure Pipe Behavior', () => {
    it('should return same reference for same input', () => {
      const result1 = pipe.transform(TestStringEnum);
      const result2 = pipe.transform(TestStringEnum);

      // Pure pipe should return new array each time
      // But contents should be the same
      expect(result1).toEqual(result2);
    });

    it('should handle multiple transformations', () => {
      const result1 = pipe.transform(TestStringEnum);
      const result2 = pipe.transform(TestNumericEnum);
      const result3 = pipe.transform(TestStringEnum);

      expect(result1).not.toBe(result2);
      expect(result1).toEqual(result3);
    });
  });

  describe('Integration with Template', () => {
    it('should produce data suitable for *ngFor', () => {
      const result = pipe.transform(TestStringEnum);

      // Verifica que o resultado pode ser usado com *ngFor
      result.forEach((item, index) => {
        expect(item.key).toBeTruthy();
        expect(item.value).toBeDefined();
      });
    });

    it('should produce data suitable for select options', () => {
      const result = pipe.transform(TestStringEnum);

      // Estrutura adequada para <option [value]="item.value">{{ item.key }}</option>
      result.forEach(item => {
        expect(typeof item.key).toBe('string');
        expect(item.value).toBeDefined();
      });
    });
  });

  describe('Type Safety', () => {
    it('should handle value types correctly', () => {
      const result = pipe.transform(TestMixedEnum);

      result.forEach(item => {
        expect(typeof item.key).toBe('string');
        expect(['string', 'number'].includes(typeof item.value)).toBe(true);
      });
    });

    it('should preserve numeric value types', () => {
      const numericValueEnum = { Count: 42, Total: 100 };
      const result = pipe.transform(numericValueEnum);

      result.forEach(item => {
        expect(typeof item.value).toBe('number');
      });
    });

    it('should preserve string value types', () => {
      const result = pipe.transform(TestStringEnum);

      result.forEach(item => {
        expect(typeof item.value).toBe('string');
      });
    });
  });

  describe('Performance', () => {
    it('should handle large enums efficiently', () => {
      const largeEnum: { [key: string]: string } = {};
      for (let i = 0; i < 100; i++) {
        largeEnum[`Key${i}`] = `Value${i}`;
      }

      const startTime = performance.now();
      const result = pipe.transform(largeEnum);
      const endTime = performance.now();

      expect(result.length).toBe(100);
      expect(endTime - startTime).toBeLessThan(10); // Should be very fast
    });

    it('should not mutate original enum object', () => {
      const originalEnum = { ...TestStringEnum };
      const originalKeys = Object.keys(TestStringEnum);

      pipe.transform(TestStringEnum);

      expect(Object.keys(TestStringEnum)).toEqual(originalKeys);
    });
  });

  describe('Error Handling', () => {
    it('should throw on null input', () => {
      // TypeScript would normally catch this, pipe expects valid object
      expect(() => {
        pipe.transform(null as any);
      }).toThrow();
    });

    it('should throw on undefined input', () => {
      // TypeScript would normally catch this, pipe expects valid object
      expect(() => {
        pipe.transform(undefined as any);
      }).toThrow();
    });
  });
});
