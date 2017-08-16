import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'angular2-moment';


import { CheckboxElementComponent } from './components/elements/checkbox-element/checkbox-element.component';
import { RadioElementComponent } from './components/elements/radio-element/radio-element.component';
import { TextElementComponent } from './components/elements/text-element/text-element.component';
import { TextareaElementComponent } from './components/elements/textarea-element/textarea-element.component';
import { ElementContainerComponent } from './components/element-container/element-container.component';
import { DropdownElementComponent } from './components/elements/dropdown-element/dropdown-element.component';
import { DataService } from './services/data.service';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    MomentModule,
  ],
  exports: [
    CheckboxElementComponent,
    RadioElementComponent,
    TextElementComponent,
    TextareaElementComponent,
    ElementContainerComponent,
  ],
  declarations: [
    CheckboxElementComponent,
    RadioElementComponent,
    TextElementComponent,
    TextareaElementComponent,
    ElementContainerComponent,
    DropdownElementComponent,
  ],
  providers: [DataService]
})
export class SharedModule { }
