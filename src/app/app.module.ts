import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DndModule } from 'ng2-dnd';

import { AppRoutingModule } from './app-routing.module';
import { NavigationModule } from './modules/navigation/navigation.module';
import { TitleBarModule } from './modules/title-bar/title-bar.module';
import { AppLibraryModule } from './modules/app-library/app-library.module';
import { AppBuilderModule } from './modules/app-builder/app-builder.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavigationModule,
    TitleBarModule,
    AppLibraryModule,
    AppBuilderModule,
    SharedModule,
    NgbModule.forRoot(),
    DndModule.forRoot(),
  ],
  exports: [
    DndModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
