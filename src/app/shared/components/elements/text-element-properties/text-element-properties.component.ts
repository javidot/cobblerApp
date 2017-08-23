import { Component, Input, Output, EventEmitter, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { TextProperties } from '../../../models/text-properties';
import { TextElement } from '../../../models/text-element';

@Component({
  selector: 'app-text-element-properties',
  templateUrl: './text-element-properties.component.html',
  styleUrls: ['./text-element-properties.component.css', '../../../../../assets/styles/dashboard.css']
})
export class TextElementPropertiesComponent implements OnInit, AfterViewInit {
  @ViewChild('propertiesForm') propForm: FormGroup;
  @Input() element: TextElement;
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
