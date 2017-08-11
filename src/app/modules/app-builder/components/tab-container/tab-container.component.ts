import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { ITabContainer} from './tab-container.interface';

@Component({
  selector: 'app-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['../../../../../assets/styles/dashboard.css']
})
export class TabContainerComponent implements OnInit, ITabContainer {
  @ViewChild('propTrigger') public popover: NgbPopover;
  @Input() data: any;
  droppedElements: Array<Element> = new Array<Element>();

  constructor() {
  }

  ngOnInit() {
    console.log('TabContainerComponent data: ');
    console.log(this.data);
    console.log(this.droppedElements.length);
  }

  addElement(event) {
    console.log(event);
    const element: Element = event.dragData.draggedElement;
    this.droppedElements.push(element);
  }
}
