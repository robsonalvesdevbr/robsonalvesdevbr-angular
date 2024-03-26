import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';

@Component({
  template: ''
})
export class BasePageComponent implements OnInit {

  constructor(protected $gaService: GoogleAnalyticsService) { }

  ngOnInit(): void {
  }

}
