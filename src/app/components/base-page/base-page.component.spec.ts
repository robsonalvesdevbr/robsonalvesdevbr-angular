import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BasePageComponent } from './base-page.component'
import { CommonModule } from '@angular/common'

describe('BasePageComponent', () => {
  let component: BasePageComponent
  let fixture: ComponentFixture<BasePageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, BasePageComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(BasePageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should have bglight input property set to false by default', () => {
    expect(component.bglight).toBeFalse()
  })

  it('should allow setting bglight input property to true', () => {
    component.bglight = true
    fixture.detectChanges()
    expect(component.bglight).toBeTrue()
  })

  it('currentClass should return correct class object when bglight is false', () => {
    component.bglight = false
    fixture.detectChanges()
    expect(component.currentClass()).toEqual({ 'bg-light': false })
  })

  it('currentClass should return correct class object when bglight is true', () => {
    component.bglight = true
    fixture.detectChanges()
    expect(component.currentClass()).toEqual({ 'bg-light': true })
  })
})
