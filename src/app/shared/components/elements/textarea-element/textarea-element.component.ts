import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TextAreaElement } from '../../../models/textarea-element';

@Component({
  selector: 'app-textarea-element',
  templateUrl: './textarea-element.component.html',
  styleUrls: ['./textarea-element.component.css']
})
export class TextAreaElementComponent implements OnInit {
@Input() element: TextAreaElement;

  constructor() { }

  ngOnInit() {
  }
}
