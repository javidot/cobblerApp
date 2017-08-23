import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { RadioElement } from '../../../models/radio-element';

@Component({
  selector: 'app-radio-element',
  templateUrl: './radio-element.component.html',
  styleUrls: ['./radio-element.component.css']
})
export class RadioElementComponent implements OnInit {
  @Input() element: RadioElement;

  constructor() { }

  ngOnInit() {
  }
}
