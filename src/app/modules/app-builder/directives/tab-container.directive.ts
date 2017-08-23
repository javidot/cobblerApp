import { Directive, ViewContainerRef, Input } from '@angular/core';
import { Tab } from '../models/tab';

@Directive({
  selector: '[appTabContainer]'
})
export class TabContainerDirective {
  @Input() activeTab: Tab;

  constructor(public viewContainerRef: ViewContainerRef) { }

}
