import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  input,
  signal,
  effect,
  computed, OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-animated-counter',
  imports: [CommonModule],
  template: `
    <span [class]="cssClass()">{{ formattedValue() }}</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimatedCounterComponent implements OnInit, OnDestroy {
  targetValue = input.required<number>();
  duration = input(2000); // Animation duration in milliseconds
  cssClass = input('');
  prefix = input('');
  suffix = input('');

  displayValue = signal(0);
  private animationId: number | null = null;

  formattedValue = computed(() => 
    `${this.prefix()}${this.displayValue()}${this.suffix()}`
  );

  constructor() {
    // React to changes in target value
    effect(() => {
      this.animateToValue(this.targetValue());
    });
  }

  ngOnInit(): void {
    // Start animation after component initialization
    setTimeout(() => {
      this.animateToValue(this.targetValue());
    }, 100);
  }

  private animateToValue(targetValue: number): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    const startValue = this.displayValue();
    const startTime = performance.now();
    const duration = this.duration();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Use easing function for smooth animation
      const easedProgress = this.easeOutQuart(progress);
      
      const currentValue = Math.round(
        startValue + (targetValue - startValue) * easedProgress
      );

      this.displayValue.set(currentValue);

      if (progress < 1) {
        this.animationId = requestAnimationFrame(animate);
      } else {
        this.animationId = null;
      }
    };

    this.animationId = requestAnimationFrame(animate);
  }

  private easeOutQuart(t: number): number {
    return 1 - Math.pow(1 - t, 4);
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}