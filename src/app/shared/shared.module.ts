import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'angular2-moment';

import { ElementContainerComponent } from './components/element-container/element-container.component';
import { CheckboxElementComponent } from './components/elements/checkbox-element/checkbox-element.component';
import { RadioElementComponent } from './components/elements/radio-element/radio-element.component';
import { TextElementComponent } from './components/elements/text-element/text-element.component';
import { TextAreaElementComponent } from './components/elements/textarea-element/textarea-element.component';
import { DropdownElementComponent } from './components/elements/dropdown-element/dropdown-element.component';
import { TextElementPropertiesComponent } from './components/elements/text-element-properties/text-element-properties.component';
// tslint:disable-next-line:max-line-length
import { TextAreaElementPropertiesComponent } from './components/elements/textarea-element-properties/textarea-element-properties.component';
import { RadioElementPropertiesComponent } from './components/elements/radio-element-properties/radio-element-properties.component';
// tslint:disable-next-line:max-line-length
import { CheckboxElementPropertiesComponent } from './components/elements/checkbox-element-properties/checkbox-element-properties.component';
import { DropdownElementPropertiesComponent } from './components/elements/dropdown-element-properties/dropdown-element-properties.component';
import { DataService } from './services/data.service';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    MomentModule,
  ],
  exports: [
    TextElementComponent,
    TextAreaElementComponent,
    RadioElementComponent,
    CheckboxElementComponent,
    DropdownElementComponent,
    ElementContainerComponent,
  ],
  declarations: [
    CheckboxElementComponent,
    RadioElementComponent,
    TextElementComponent,
    TextAreaElementComponent,
    ElementContainerComponent,
    DropdownElementComponent,
    TextElementPropertiesComponent,
    TextAreaElementPropertiesComponent,
    RadioElementPropertiesComponent,
    CheckboxElementPropertiesComponent,
    DropdownElementPropertiesComponent,
  ],
  providers: [DataService]
})
export class SharedModule { }
