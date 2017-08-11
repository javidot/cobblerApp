import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-element-container',
  templateUrl: './element-container.component.html',
  styleUrls: ['./element-container.component.css']
})
export class ElementContainerComponent implements OnInit {
  @ViewChild('propTrigger') public popover: NgbPopover;
  @Input() elementType: string;
  @Input() elementIndex: number;
  elementLabel = 'Define Label';
  outputRange = 'No output defined';
  rangeAdded = false;

  constructor() { }

  ngOnInit() {
  }

  showProperties(index: number) {
    console.log('Element #' + index);
    const isOpen = this.popover.isOpen();
    this.popover.close();
    if (!isOpen) {
      this.popover.open();
    }
  }
}
