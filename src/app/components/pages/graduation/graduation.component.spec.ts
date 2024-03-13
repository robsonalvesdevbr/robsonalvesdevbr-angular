import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduationComponent } from './graduation.component';

describe('GraduationComponent', () => {
  let component: GraduationComponent;
  let fixture: ComponentFixture<GraduationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraduationComponent]
    });
    fixture = TestBed.createComponent(GraduationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
