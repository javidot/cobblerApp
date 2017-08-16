import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DndModule } from 'ng2-dnd';

import { AppRoutingModule } from './app-routing.module';
import { NavigationModule } from './modules/navigation/navigation.module';
import { TitleBarModule } from './modules/title-bar/title-bar.module';
import { AppLibraryModule } from './modules/app-library/app-library.module';
import { AppBuilderModule } from './modules/app-builder/app-builder.module';
import { SharedModule } from './shared/shared.module';

import { MockDataBackendService } from './private/backend/mockdata-backend.service';

import { AppComponent } from './app.component';
import { DataBackendService } from './private/backend/data-backend.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    RouterModule,
    // InMemoryWebApiModule.forRoot(MockDataBackendService, { passThruUnknownUrl: true }),
    // InMemoryWebApiModule.forRoot(MockDataBackendService, { delay: 2000 }),
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
  providers: [DataBackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
