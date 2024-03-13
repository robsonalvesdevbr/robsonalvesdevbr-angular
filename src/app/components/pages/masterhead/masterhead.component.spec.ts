import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterheadComponent } from './masterhead.component';

describe('MasterheadComponent', () => {
  let component: MasterheadComponent;
  let fixture: ComponentFixture<MasterheadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MasterheadComponent]
    });
    fixture = TestBed.createComponent(MasterheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
