import { Type } from '@angular/core';
import { TabContainerComponent } from '../components/tab-container/tab-container.component';

export class TabContainer {
  constructor(public component: Type<TabContainerComponent>, public data: any) {}
}
