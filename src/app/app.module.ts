import { NgModule, provideExperimentalZonelessChangeDetection } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from '@path-app/app.component'
import { ComponentsModule } from '@path-app/components/components.module'
import { CommonModule } from '@angular/common'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ComponentsModule, CommonModule],
  providers: [provideExperimentalZonelessChangeDetection()],
  bootstrap: [AppComponent],
})
export class AppModule {}
