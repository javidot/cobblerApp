import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DndModule } from 'ng2-dnd';
import { SharedModule } from '../../shared/shared.module';

import { AppBuilderComponent } from './components/app-builder/app-builder.component';
import { AppBuilderCanvasComponent } from './components/app-builder-canvas/app-builder-canvas.component';
import { AppBuilderActivityComponent } from './components/app-builder-activity/app-builder-activity.component';
import { AppBuilderPeopleComponent } from './components/app-builder-people/app-builder-people.component';
import { AppBuilderHistoryComponent } from './components/app-builder-history/app-builder-history.component';
import { AppBuilderElementsComponent } from './components/app-builder-elements/app-builder-elements.component';
import { TabContainerDirective } from './directives/tab-container.directive';
import { TabContainerComponent } from './components/tab-container/tab-container.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    DndModule,
    SharedModule,
  ],
  exports: [AppBuilderComponent],
  declarations: [
    AppBuilderComponent,
    AppBuilderCanvasComponent,
    AppBuilderActivityComponent,
    AppBuilderPeopleComponent,
    AppBuilderHistoryComponent,
    AppBuilderElementsComponent,
    TabContainerDirective,
    TabContainerComponent
  ],
  entryComponents: [
    TabContainerComponent
  ]
})
export class AppBuilderModule { }
