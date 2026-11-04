export interface PageWindow {
  readonly itemsPerPage: number;
  readonly currentPage: number;
}

export function toggleInSet<T>(source: ReadonlySet<T>, value: T): Set<T> {
  const next = new Set(source);
  if (!next.delete(value)) next.add(value);
  return next;
}

export function absoluteItemIndex(page: PageWindow, indexOnPage: number): number {
  return page.itemsPerPage * (page.currentPage - 1) + indexOnPage + 1;
}
