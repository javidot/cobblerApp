import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../app-routing.module';

import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadersCssModule } from 'angular2-loaders-css';

import { TitleBarComponent } from './components/title-bar/title-bar.component';
import { NewAppComponent } from '../../shared/components/new-app/new-app.component';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    LoadersCssModule,
    FormsModule,
    AppRoutingModule
  ],
  exports: [
    TitleBarComponent,
  ],
  declarations: [
    TitleBarComponent,
    NewAppComponent,
    FileDropDirective,
    FileSelectDirective,
  ],
  entryComponents: [
    NewAppComponent
  ]
})
export class TitleBarModule { }
