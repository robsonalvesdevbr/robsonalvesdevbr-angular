
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  input,
  signal,
  effect,
  computed,
  ElementRef,
  inject,
  afterNextRender
} from '@angular/core';

@Component({
  selector: 'app-animated-counter',
  imports: [],
  template: `
    <span [class]="cssClass()">{{ formattedValue() }}</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimatedCounterComponent implements OnInit, OnDestroy {
  targetValue = input.required<number>();
  duration = input(2000);
  cssClass = input('');
  prefix = input('');
  suffix = input('');

  // Optional: Intersection Observer for performance
  animateOnVisible = input(true);

  displayValue = signal(0);
  private animationId: number | null = null;
  private intersectionObserver?: IntersectionObserver;
  private readonly elementRef = inject(ElementRef);
  private hasStartedAnimation = false;

  formattedValue = computed(() =>
    `${this.prefix()}${this.displayValue().toLocaleString()}${this.suffix()}`
  );

  constructor() {
    effect(() => {
      const target = this.targetValue();
      if (this.animateOnVisible()) {
        this.setupVisibilityObserver();
      } else {
        this.animateToValue(target);
      }
    });
  }

  ngOnInit(): void {
    if (!this.animateOnVisible()) {
      afterNextRender(() => {
        this.animateToValue(this.targetValue());
      });
    }
  }

  private setupVisibilityObserver(): void {
    if (this.intersectionObserver || this.hasStartedAnimation) return;

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !this.hasStartedAnimation) {
          this.hasStartedAnimation = true;
          this.animateToValue(this.targetValue());
          this.intersectionObserver?.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    this.intersectionObserver.observe(this.elementRef.nativeElement);
  }

  private animateToValue(targetValue: number): void {
    // Cancel previous animation
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    const startValue = this.displayValue();
    const difference = targetValue - startValue;

    // Skip animation for small differences
    if (Math.abs(difference) < 2) {
      this.displayValue.set(targetValue);
      return;
    }

    const startTime = performance.now();
    const duration = this.duration();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Use optimized easing function
      const easedProgress = this.easeOutCubic(progress);

      const currentValue = Math.round(startValue + difference * easedProgress);
      this.displayValue.set(currentValue);

      if (progress < 1) {
        this.animationId = requestAnimationFrame(animate);
      } else {
        this.animationId = null;
        // Ensure exact final value
        this.displayValue.set(targetValue);
      }
    };

    this.animationId = requestAnimationFrame(animate);
  }

  // Optimized easing function
  private easeOutCubic(t: number): number {
    const t1 = t - 1;
    return t1 * t1 * t1 + 1;
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.intersectionObserver?.disconnect();
  }
}
