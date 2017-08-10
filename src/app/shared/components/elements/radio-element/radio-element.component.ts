import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-radio-element',
  templateUrl: './radio-element.component.html',
  styleUrls: ['./radio-element.component.css']
})
export class RadioElementComponent implements OnInit {
  @ViewChild('propTrigger') public popover: NgbPopover;
  @Input() elementIndex: number;

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
