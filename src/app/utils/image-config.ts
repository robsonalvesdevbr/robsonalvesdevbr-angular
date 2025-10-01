/**
 * Image optimization configuration for NgOptimizedImage
 * Provides centralized configuration for priority images and responsive sizes
 */

export interface ImageConfig {
  priority?: boolean;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  fill?: boolean;
  width?: number;
  height?: number;
}

/**
 * Image configurations for different sections
 */
export const IMAGE_CONFIGS = {
  // Critical images (above the fold)
  hero: {
    priority: true,
    loading: 'eager',
    decoding: 'async',
    sizes: '100vw'
  } as ImageConfig,

  // Profile/Avatar images
  avatar: {
    priority: false,
    loading: 'lazy',
    decoding: 'async',
    sizes: '(max-width: 768px) 100px, 150px'
  } as ImageConfig,

  // Course/Book thumbnail images
  thumbnail: {
    priority: false,
    loading: 'lazy',
    decoding: 'async',
    sizes: '(max-width: 768px) 50px, 80px'
  } as ImageConfig,

  // Timeline images
  timeline: {
    priority: false,
    loading: 'lazy',
    decoding: 'async',
    fill: true
  } as ImageConfig,

  // Large content images
  content: {
    priority: false,
    loading: 'lazy',
    decoding: 'async',
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
  } as ImageConfig
};

/**
 * Helper function to get responsive sizes string for images
 */
export function getResponsiveSizes(type: keyof typeof IMAGE_CONFIGS): string {
  return IMAGE_CONFIGS[type].sizes || '100vw';
}

/**
 * Helper to determine if image should be priority loaded
 */
export function isPriorityImage(index: number, threshold = 3): boolean {
  return index < threshold;
}
