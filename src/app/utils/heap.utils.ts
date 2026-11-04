const MB = 1024 * 1024;
const SIGNIFICANT_CHANGE_MB = 5;

export interface HeapSnapshot {
  readonly usedMB: number;
  readonly totalMB: number;
}

export function heapSnapshot(
  memory: { readonly usedJSHeapSize: number; readonly totalJSHeapSize: number },
  lastUsedMB: number,
): HeapSnapshot | undefined {
  const usedMB = memory.usedJSHeapSize / MB;
  if (Math.abs(usedMB - lastUsedMB) <= SIGNIFICANT_CHANGE_MB) return undefined;
  return { usedMB, totalMB: memory.totalJSHeapSize / MB };
}
