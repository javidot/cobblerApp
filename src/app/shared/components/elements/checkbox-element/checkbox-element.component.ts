import { Component, OnInit, Input } from '@angular/core';
import { CheckboxElement } from '../../../models/checkbox-element';

@Component({
  selector: 'app-checkbox-element',
  templateUrl: './checkbox-element.component.html',
  styleUrls: ['./checkbox-element.component.css']
})
export class CheckboxElementComponent implements OnInit {
  @Input() element: CheckboxElement;

  constructor() { }

  ngOnInit() {
  }

}
