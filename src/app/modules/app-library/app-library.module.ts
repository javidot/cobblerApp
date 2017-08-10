import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLibraryComponent } from './components/app-library/app-library.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [AppLibraryComponent],
  declarations: [
    AppLibraryComponent,
  ],
  entryComponents: [
  ]
})
export class AppLibraryModule { }
