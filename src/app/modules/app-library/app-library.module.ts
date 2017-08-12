import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { DataService } from '../../shared/services/data.service';

import { AppLibraryComponent } from './components/app-library/app-library.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [AppLibraryComponent],
  providers: [
    DataService
  ],
  declarations: [
    AppLibraryComponent,
  ],
  entryComponents: [
  ]
})
export class AppLibraryModule { }
