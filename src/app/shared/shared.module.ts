import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CheckboxElementComponent } from './components/elements/checkbox-element/checkbox-element.component';
import { RadioElementComponent } from './components/elements/radio-element/radio-element.component';
import { TextElementComponent } from './components/elements/text-element/text-element.component';
import { TextareaElementComponent } from './components/elements/textarea-element/textarea-element.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
  ],
  exports: [
    CheckboxElementComponent,
    RadioElementComponent,
    TextElementComponent,
    TextareaElementComponent,
  ],
  declarations: [
    CheckboxElementComponent,
    RadioElementComponent,
    TextElementComponent,
    TextareaElementComponent,
  ]
})
export class SharedModule { }
