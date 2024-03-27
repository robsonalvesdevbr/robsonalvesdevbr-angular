import { Component, Input, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';

@Component({
  template: ''
})
export class BasePageComponent implements OnInit {

  @Input({required: false}) bglight: boolean = false;

  currentClass: Record<string, boolean> = {
    'bg-light': this.bglight
  };

  constructor(protected $gaService: GoogleAnalyticsService) { }

  ngOnInit(): void {
  }

}
