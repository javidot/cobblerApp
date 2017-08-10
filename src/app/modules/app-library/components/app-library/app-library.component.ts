import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-library',
  templateUrl: './app-library.component.html',
  styleUrls: ['./app-library.component.css']
})
export class AppLibraryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('Initializing app-library.component');
  }
}
