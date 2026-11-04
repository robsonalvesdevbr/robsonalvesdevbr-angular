import { nextScrollMilestone } from './engagement.utils';

describe('nextScrollMilestone', () => {
  const none = new Set<number>();

  it('is undefined when the page fits in the window', () => {
    expect(nextScrollMilestone(0, 800, 800, none)).toBeUndefined();
  });

  it('is undefined below the first milestone', () => {
    expect(nextScrollMilestone(100, 2000, 1000, none)).toBeUndefined(); // 10%
  });

  it('returns the lowest untracked milestone reached', () => {
    expect(nextScrollMilestone(600, 2000, 1000, none)).toBe(25); // 60% -> 25 first
    expect(nextScrollMilestone(600, 2000, 1000, new Set([25]))).toBe(50);
  });

  it('is undefined once every reached milestone was tracked', () => {
    expect(nextScrollMilestone(600, 2000, 1000, new Set([25, 50]))).toBeUndefined();
  });

  it('reaches 100 at the bottom', () => {
    expect(nextScrollMilestone(1000, 2000, 1000, new Set([25, 50, 75, 90]))).toBe(100);
  });
});
