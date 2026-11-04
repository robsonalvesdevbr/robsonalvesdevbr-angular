import { firstIntersectingId } from './scroll-spy.utils';

const entry = (id: string, isIntersecting: boolean) => ({ isIntersecting, target: { id } });

describe('firstIntersectingId', () => {
  it('returns the first intersecting entry, ignoring later ones', () => {
    expect(firstIntersectingId([entry('about', false), entry('skills', true), entry('books', true)])).toBe('skills');
  });

  it('returns undefined when nothing intersects', () => {
    expect(firstIntersectingId([entry('about', false)])).toBeUndefined();
    expect(firstIntersectingId([])).toBeUndefined();
  });
});
