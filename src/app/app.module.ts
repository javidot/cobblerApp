import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NavigationModule } from './modules/navigation/navigation.module';
import { TitleBarModule } from './modules/title-bar/title-bar.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavigationModule,
    TitleBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
