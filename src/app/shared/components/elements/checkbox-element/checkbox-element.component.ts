import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox-element',
  templateUrl: './checkbox-element.component.html',
  styleUrls: ['./checkbox-element.component.css']
})
export class CheckboxElementComponent implements OnInit {
  @Input() elementIndex: number;
  options: Array<string> = ['Option 1', 'Option 2', 'Option 3'];

  constructor() { }

  ngOnInit() {
  }

}
