import { ElementCache } from './performance.utils';

describe('ElementCache.get', () => {
  beforeEach(() => {
    ElementCache.clear();
    document.body.innerHTML = '';
  });

  it('returns null for a missing id', () => {
    expect(ElementCache.get('nope')).toBeNull();
    expect(ElementCache.size()).toBe(0);
  });

  it('caches an element and keeps serving it', () => {
    document.body.innerHTML = '<div id="a"></div>';
    const el = ElementCache.get('a');
    expect(el).not.toBeNull();
    expect(ElementCache.get('a')).toBe(el);
    expect(ElementCache.size()).toBe(1);
  });

  it('evicts the oldest entry when full', () => {
    const max = ElementCache.getMaxSize();
    document.body.innerHTML = Array.from({ length: max + 1 }, (_, i) => `<div id="e${i}"></div>`).join('');
    for (let i = 0; i <= max; i++) ElementCache.get(`e${i}`);
    expect(ElementCache.size()).toBe(max);
    document.getElementById('e0')!.id = 'renamed';
    expect(ElementCache.get('e0')).toBeNull(); // e0 was evicted, so the lookup hits the DOM again
  });
});
