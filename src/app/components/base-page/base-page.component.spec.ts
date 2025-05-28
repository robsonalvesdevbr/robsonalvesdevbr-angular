import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasePageComponent } from './base-page.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('BasePageComponent', () => {
  let component: BasePageComponent;
  let fixture: ComponentFixture<BasePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, BasePageComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(BasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have bglight input property set to false by default', () => {
    expect(component.bglight()).toBeFalse();
  });
});
