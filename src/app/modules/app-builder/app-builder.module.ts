import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DndModule } from 'ng2-dnd';

import { SharedModule } from '../../shared/shared.module';
import { DataService } from '../../shared/services/data.service';
import { AppBuilderService } from './services/app-builder.service';

import { AppBuilderComponent } from './components/app-builder/app-builder.component';
import { AppBuilderActivityComponent } from './components/app-builder-activity/app-builder-activity.component';
import { AppBuilderPeopleComponent } from './components/app-builder-people/app-builder-people.component';
import { AppBuilderHistoryComponent } from './components/app-builder-history/app-builder-history.component';
import { TabContainerDirective } from './directives/tab-container.directive';
import { TabContainerComponent } from './components/tab-container/tab-container.component';
import { TextElementPropertiesComponent } from '../../shared/components/elements/text-element-properties/text-element-properties.component';
// tslint:disable-next-line:max-line-length
import { TextAreaElementPropertiesComponent } from '../../shared/components/elements/textarea-element-properties/textarea-element-properties.component';
import { RadioElementPropertiesComponent } from '../../shared/components/elements/radio-element-properties/radio-element-properties.component';
// tslint:disable-next-line:max-line-length
import { CheckboxElementPropertiesComponent } from '../../shared/components/elements/checkbox-element-properties/checkbox-element-properties.component';
import { DropdownElementPropertiesComponent } from '../../shared/components/elements/dropdown-element-properties/dropdown-element-properties.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    DndModule,
    SharedModule,
  ],
  exports: [AppBuilderComponent],
  providers: [
    DataService,
    AppBuilderService
  ],
declarations: [
    AppBuilderComponent,
    AppBuilderActivityComponent,
    AppBuilderPeopleComponent,
    AppBuilderHistoryComponent,
    TabContainerDirective,
    TabContainerComponent,
  ],
  entryComponents: [
    TabContainerComponent,
    TextElementPropertiesComponent,
    TextAreaElementPropertiesComponent,
    RadioElementPropertiesComponent,
    CheckboxElementPropertiesComponent,
    DropdownElementPropertiesComponent,
  ]
})
export class AppBuilderModule { }
