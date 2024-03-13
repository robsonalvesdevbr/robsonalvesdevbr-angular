import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortifoliogridComponent } from './portifoliogrid.component';

describe('PortifoliogridComponent', () => {
  let component: PortifoliogridComponent;
  let fixture: ComponentFixture<PortifoliogridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortifoliogridComponent]
    });
    fixture = TestBed.createComponent(PortifoliogridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
