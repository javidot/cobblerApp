import { Component, OnInit, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-text-element',
  templateUrl: './text-element.component.html',
  styleUrls: ['./text-element.component.css']
})
export class TextElementComponent implements OnInit {
  @Input() elementIndex: number;

  constructor() { }

  ngOnInit() {
  }
}
