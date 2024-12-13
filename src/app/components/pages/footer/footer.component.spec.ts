import { TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();
  });

  it('should create the CourseComponent', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render titles', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    //fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div.container')?.textContent).toContain(
      'Terms of Use',
    );
  });
});
