export function firstIntersectingId(
  entries: readonly { readonly isIntersecting: boolean; readonly target: { readonly id: string } }[],
): string | undefined {
  return entries.find((entry) => entry.isIntersecting)?.target.id;
}
