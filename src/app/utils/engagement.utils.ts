export const SCROLL_MILESTONES: readonly number[] = [25, 50, 75, 90, 100];

export function nextScrollMilestone(
  scrollY: number,
  documentHeight: number,
  windowHeight: number,
  tracked: ReadonlySet<number>,
): number | undefined {
  if (documentHeight <= windowHeight) return undefined;
  const percent = Math.round((scrollY / (documentHeight - windowHeight)) * 100);
  return SCROLL_MILESTONES.find((m) => percent >= m && !tracked.has(m));
}
