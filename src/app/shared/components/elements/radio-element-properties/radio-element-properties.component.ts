import { Component, Input, Output, EventEmitter, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { RadioProperties } from '../../../models/radio-properties';
import { RadioElement } from '../../../models/radio-element';

@Component({
  selector: 'app-radio-element-properties',
  templateUrl: './radio-element-properties.component.html',
  styleUrls: ['./radio-element-properties.component.css', '../../../../../assets/styles/dashboard.css']
})
export class RadioElementPropertiesComponent implements OnInit, AfterViewInit {
  @ViewChild('propertiesForm') propForm: FormGroup;
  @Input() element: RadioElement;
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
