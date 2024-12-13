import { TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';

describe('AbountComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
    }).compileComponents();
  });

  it('should create the AboutComponent', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    //fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector(
        'div.container div.text-center h3.section-subheading.text-muted',
      )?.textContent,
    ).toBe(' Saiba mais sobre minha carreira. ');
  });
});
