import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { CommonModule } from '@angular/common';
import { GoogleAnalyticsService } from './services/google-analytics.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    CommonModule
  ],
  providers: [
    GoogleAnalyticsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
