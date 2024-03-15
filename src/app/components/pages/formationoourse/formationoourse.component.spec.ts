import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationoourseComponent } from './formationoourse.component';

describe('FormationoourseComponent', () => {
  let component: FormationoourseComponent;
  let fixture: ComponentFixture<FormationoourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormationoourseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormationoourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
