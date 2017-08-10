import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appTabContainer]'
})
export class TabContainerDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
