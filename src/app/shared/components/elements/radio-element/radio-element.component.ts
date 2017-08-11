import { Component, OnInit, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-radio-element',
  templateUrl: './radio-element.component.html',
  styleUrls: ['./radio-element.component.css']
})
export class RadioElementComponent implements OnInit {
  @Input() elementIndex: number;
  options: Array<string> = ['Option 1', 'Option 2', 'Option 3'];

  constructor() { }

  ngOnInit() {
  }
}
