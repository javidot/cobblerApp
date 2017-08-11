import { Component, OnInit, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-textarea-element',
  templateUrl: './textarea-element.component.html',
  styleUrls: ['./textarea-element.component.css']
})
export class TextareaElementComponent implements OnInit {
  @Input() elementIndex: number;

  constructor() { }

  ngOnInit() {
  }
}
