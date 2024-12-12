import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { GoogleAnalyticsService } from './google-analytics.service';

declare let gtag: any;

describe('GoogleAnalyticsService', () => {
  let service: GoogleAnalyticsService;
  let titleService: Title;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: { events: { pipe: () => ({ subscribe: () => {} }) } },
        },
        { provide: Title, useValue: { getTitle: () => 'Test Title' } },
      ],
    });
    service = TestBed.inject(GoogleAnalyticsService);
    titleService = TestBed.inject(Title);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have _title property set', () => {
    expect(service['_title']).toBeTruthy();
  });

  // TODO: Add more tests
});
