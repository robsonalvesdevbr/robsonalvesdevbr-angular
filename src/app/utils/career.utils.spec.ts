import { yearsSince } from './career.utils';

describe('yearsSince', () => {
  it('counts calendar years elapsed since the start year', () => {
    expect(yearsSince(2001, new Date('2026-10-18'))).toBe(25);
  });

  it('returns 0 in the start year', () => {
    expect(yearsSince(2001, new Date('2001-06-01'))).toBe(0);
  });

  it('never returns a negative number for a future start year', () => {
    expect(yearsSince(2030, new Date('2026-10-18'))).toBe(0);
  });
});
