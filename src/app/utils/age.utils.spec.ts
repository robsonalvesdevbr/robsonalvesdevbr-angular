import { calculateAge } from './age.utils';

describe('calculateAge', () => {
  const today = new Date(2024, 5, 15);

  it('should calculate age when birthday already occurred this year', () => {
    expect(calculateAge(new Date(1990, 1, 1), today)).toBe(34);
  });

  it('should calculate age when birthday has not occurred yet this year', () => {
    expect(calculateAge(new Date(1990, 11, 25), today)).toBe(33);
  });

  it('should calculate age on the exact birthday', () => {
    expect(calculateAge(new Date(1990, 5, 15), today)).toBe(34);
  });
});
