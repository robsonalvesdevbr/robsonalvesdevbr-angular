/**
 * Memoization utilities for performance optimization
 */

/**
 * Simple memoization for computed signals with single primitive argument
 */
export function memoize<T, R>(fn: (arg: T) => R): (arg: T) => R {
  const cache = new Map<T, R>();

  return (arg: T): R => {
    if (cache.has(arg)) {
      return cache.get(arg)!;
    }

    const result = fn(arg);
    cache.set(arg, result);

    // Limit cache size to prevent memory leaks
    if (cache.size > 100) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    return result;
  };
}

/**
 * Memoization for functions with multiple arguments
 * Uses JSON.stringify for cache key (be cautious with large objects)
 */
export function memoizeMulti<T extends any[], R>(fn: (...args: T) => R): (...args: T) => R {
  const cache = new Map<string, R>();

  return (...args: T): R => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn(...args);
    cache.set(key, result);

    // Limit cache size
    if (cache.size > 50) {
      const firstKey = cache.keys().next().value;
      if (firstKey) {
        cache.delete(firstKey);
      }
    }

    return result;
  };
}

/**
 * Memoization with custom key generator
 */
export function memoizeWithKey<T extends any[], R>(
  fn: (...args: T) => R,
  keyGenerator: (...args: T) => string
): (...args: T) => R {
  const cache = new Map<string, R>();

  return (...args: T): R => {
    const key = keyGenerator(...args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn(...args);
    cache.set(key, result);

    // Limit cache size
    if (cache.size > 50) {
      const firstKey = cache.keys().next().value;
      if (firstKey) {
        cache.delete(firstKey);
      }
    }

    return result;
  };
}

/**
 * Memoization for array filtering operations
 * Optimized for filter operations with Set-based lookups
 */
export function memoizeFilter<T>(
  items: readonly T[],
  filterFn: (item: T) => boolean
): T[] {
  const cache = new WeakMap<typeof items, T[]>();

  if (cache.has(items)) {
    return cache.get(items)!;
  }

  const result = items.filter(filterFn);
  cache.set(items, result);

  return result;
}

/**
 * Creates a stable reference for Set/Map values to optimize computed signals
 * Returns the same instance if content hasn't changed
 */
export function stabilizeSet<T>(newSet: Set<T>, previousSet?: Set<T>): Set<T> {
  if (!previousSet) {
    return newSet;
  }

  // Check if sets are equal
  if (newSet.size === previousSet.size) {
    let isEqual = true;
    for (const item of newSet) {
      if (!previousSet.has(item)) {
        isEqual = false;
        break;
      }
    }

    if (isEqual) {
      return previousSet; // Return same reference if content is equal
    }
  }

  return newSet;
}
