import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutthisprojectComponent } from './aboutthisproject.component';

describe('AboutthisprojectComponent', () => {
  let component: AboutthisprojectComponent;
  let fixture: ComponentFixture<AboutthisprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutthisprojectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutthisprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
