import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { GoogleAnalyticsService } from '@path-services/google-analytics.service'
import { GoogleAnalyticsDirective } from './google-analytics.directive'
import { AnalyticsOption } from '@path-interfaces/IAnalyticsOption'

@Component({
    template: `<button [appGoogleAnalytics]="option">Test Button</button>`,
    standalone: false
})
class TestComponent {
  option: AnalyticsOption = {
    event: 'click_event',
    category: 'button',
    label: 'test_button',
    logType: 'page_view',
    title: 'Test Page View',
  }
}

describe('GoogleAnalyticsDirective', () => {
  let fixture: ComponentFixture<TestComponent>
  let gaService: GoogleAnalyticsService
  let buttonElement: HTMLButtonElement

  beforeEach(() => {
    const gaServiceSpy = jasmine.createSpyObj('GoogleAnalyticsService', ['logEvent', 'logPageView', 'logSet'])

    TestBed.configureTestingModule({
      imports: [GoogleAnalyticsDirective], // Mudança para 'imports' ao invés de 'declarations'
      declarations: [TestComponent],
      providers: [{ provide: GoogleAnalyticsService, useValue: gaServiceSpy }],
    })

    fixture = TestBed.createComponent(TestComponent)
    gaService = TestBed.inject(GoogleAnalyticsService)
    fixture.detectChanges()

    buttonElement = fixture.debugElement.query(By.css('button')).nativeElement
  })

  it('should call logEvent with correct parameters on click', () => {
    buttonElement.click()
    fixture.detectChanges()

    expect(gaService.logEvent).toHaveBeenCalledWith('click_event', 'button', 'test_button')
  })

  it('should call logPageView with correct title if logType is page_view', () => {
    buttonElement.click()
    fixture.detectChanges()

    expect(gaService.logPageView).toHaveBeenCalledWith('Test Page View')
  })

  it('should call logSet with correct parameters if logType is set', () => {
    fixture.componentInstance.option.logType = 'set'
    fixture.detectChanges()

    buttonElement.click()

    expect(gaService.logSet).toHaveBeenCalledWith('campaign', 'robsonalves', 'azure', 'black_friday_promotion', 'button+test_button')
  })

  it('should not call logPageView if title is undefined and logType is page_view', () => {
    fixture.componentInstance.option.title = undefined
    fixture.detectChanges()

    buttonElement.click()

    expect(gaService.logPageView).not.toHaveBeenCalled()
  })
})
