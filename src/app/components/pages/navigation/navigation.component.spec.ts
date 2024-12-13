import { TestBed } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationComponent],
    }).compileComponents();
  });

  it('should create the CourseComponent', () => {
    const fixture = TestBed.createComponent(NavigationComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render titles', () => {
    const fixture = TestBed.createComponent(NavigationComponent);
    //fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#navbarResponsive')?.textContent).toContain(
      'Sobre'
    );
    expect(compiled.querySelector('#navbarResponsive')?.textContent).toContain(
      '(Pós)Graduação'
    );
    expect(compiled.querySelector('#navbarResponsive')?.textContent).toContain(
      'Cursos'
    );
    expect(compiled.querySelector('#navbarResponsive')?.textContent).toContain(
      'Formação'
    );
    expect(compiled.querySelector('#navbarResponsive')?.textContent).toContain(
      'Leituras'
    );
    expect(compiled.querySelector('#navbarResponsive')?.textContent).toContain(
      'Contato'
    );
  });
});
