import { Component, Input, Output, EventEmitter, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Form, FormGroup } from '@angular/forms';

import { TextAreaProperties } from '../../../models/textarea-properties';
import { TextAreaElement } from '../../../models/textarea-element';

@Component({
  selector: 'app-textarea-element-properties',
  templateUrl: './textarea-element-properties.component.html',
  styleUrls: ['./textarea-element-properties.component.css', '../../../../../assets/styles/dashboard.css']
})
export class TextAreaElementPropertiesComponent implements OnInit, AfterViewInit {
  @ViewChild('propertiesForm') propForm: FormGroup;
  @Input() element: TextAreaElement;
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
}
