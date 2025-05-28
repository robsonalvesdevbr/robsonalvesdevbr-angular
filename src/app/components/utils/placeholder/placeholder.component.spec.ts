import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { PlaceholderComponent } from './placeholder.component';

describe('PlaceholderComponent', () => {
  let component: PlaceholderComponent;
  let fixture: ComponentFixture<PlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [PlaceholderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
