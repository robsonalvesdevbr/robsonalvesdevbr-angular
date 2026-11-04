import { heapSnapshot } from './heap.utils';

const MB = 1024 * 1024;

describe('heapSnapshot', () => {
  it('reports used and total in MB when used changed by more than 5MB', () => {
    expect(heapSnapshot({ usedJSHeapSize: 20 * MB, totalJSHeapSize: 40 * MB }, 10)).toEqual({
      usedMB: 20,
      totalMB: 40,
    });
  });

  it('works for a decrease too', () => {
    expect(heapSnapshot({ usedJSHeapSize: 4 * MB, totalJSHeapSize: 40 * MB }, 20)).toBeDefined();
  });

  it('is undefined when the change is exactly 5MB or less', () => {
    expect(heapSnapshot({ usedJSHeapSize: 15 * MB, totalJSHeapSize: 40 * MB }, 10)).toBeUndefined();
  });
});
