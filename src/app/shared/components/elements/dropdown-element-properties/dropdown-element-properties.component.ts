import { Component, Input, Output, EventEmitter, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { DropdownProperties } from '../../../models/dropdown-properties';
import { DropdownElement } from '../../../models/dropdown-element';

@Component({
  selector: 'app-dropdown-element-properties',
  templateUrl: './dropdown-element-properties.component.html',
  styleUrls: ['./dropdown-element-properties.component.css', '../../../../../assets/styles/dashboard.css']
})
export class DropdownElementPropertiesComponent implements OnInit, AfterViewInit {
  @ViewChild('propertiesForm') propForm: FormGroup;
  @Input() element: DropdownElement;
  propertiesChange = new BehaviorSubject<boolean>(false);
  destroyProperties = new BehaviorSubject<boolean>(false);

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const self = this;
    this.propForm.valueChanges
      .debounceTime(1000)
      .subscribe(value => {
          this.propertiesChange.next(true);
          console.log(value);
        });
  }

  closePanel() {
    this.destroyProperties.next(true);
  }

  addOption() {
    this.element.properties.options.push(
      { text: 'New Option', value: 'Option_' + this.element.properties.options.length }
    );
  }

  deleteOption(index) {
    if (this.element.properties.options.length > 1) {
      this.element.properties.options.splice(index, 1);
    }
  }
}
