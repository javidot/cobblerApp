import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TextElement } from '../../../models/text-element';

@Component({
  selector: 'app-text-element',
  templateUrl: './text-element.component.html',
  styleUrls: ['./text-element.component.css']
})
export class TextElementComponent implements OnInit {
  @Input() element: TextElement;

  constructor() { }

  ngOnInit() {
  }
}
