import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-element-container',
  templateUrl: './element-container.component.html',
  styleUrls: ['./element-container.component.css']
})
export class ElementContainerComponent implements OnInit {
  @Input() element: any;
  @Output() onEdit = new EventEmitter<number>();
  @Output() onDuplicate = new EventEmitter<number>();
  @Output() onDelete = new EventEmitter<number>();

  elementLabel = 'Define Label';
  outputRange = '';
  rangeAdded = false;

  constructor() { }

  ngOnInit() {
    console.log('Element: ', this.element);
  }

  edit(elementIndex: number) {
    this.onEdit.emit(elementIndex);
  }

  duplicate(elementIndex: number) {
    this.onDuplicate.emit(elementIndex);
  }

  delete(elementIndex: number) {
    this.onDelete.emit(elementIndex);
  }
}
