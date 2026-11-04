import { absoluteItemIndex, toggleInSet } from './catalog.utils';

describe('toggleInSet', () => {
  it('adds a missing value without mutating the original', () => {
    const original = new Set(['a']);
    const result = toggleInSet(original, 'b');
    expect([...result]).toEqual(['a', 'b']);
    expect([...original]).toEqual(['a']);
  });

  it('removes a present value without mutating the original', () => {
    const original = new Set(['a', 'b']);
    const result = toggleInSet(original, 'a');
    expect([...result]).toEqual(['b']);
    expect([...original]).toEqual(['a', 'b']);
  });
});

describe('absoluteItemIndex', () => {
  it('is 1-based across pages', () => {
    expect(absoluteItemIndex({ itemsPerPage: 8, currentPage: 1 }, 0)).toBe(1);
    expect(absoluteItemIndex({ itemsPerPage: 8, currentPage: 3 }, 2)).toBe(19);
  });
});
