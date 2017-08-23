import { Component, OnInit, Input } from '@angular/core';
import { DropdownElement } from '../../../models/dropdown-element';

@Component({
  selector: 'app-dropdown-element',
  templateUrl: './dropdown-element.component.html',
  styleUrls: ['./dropdown-element.component.css']
})
export class DropdownElementComponent implements OnInit {
  @Input() element: DropdownElement;

  constructor() { }

  ngOnInit() {
  }
}
