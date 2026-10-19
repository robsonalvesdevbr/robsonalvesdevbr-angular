// Primeira entrada da timeline de "Sobre" (instrutor, 2001).
export const CAREER_START_YEAR = 2001;

export function yearsSince(startYear: number, now: Date = new Date()): number {
  return Math.max(0, now.getFullYear() - startYear);
}
