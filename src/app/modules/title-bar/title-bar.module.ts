import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleBarComponent } from './components/title-bar/title-bar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    TitleBarComponent,
  ],
  declarations: [TitleBarComponent]
})
export class TitleBarModule { }
