import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TitleBarComponent } from './components/title-bar/title-bar.component';
import { NewAppComponent } from '../../shared/components/new-app/new-app.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [
    TitleBarComponent,
  ],
  declarations: [
    TitleBarComponent,
    NewAppComponent,
  ],
  entryComponents: [
    NewAppComponent
  ]
})
export class TitleBarModule { }
