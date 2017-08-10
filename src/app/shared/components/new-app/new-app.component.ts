import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-app',
  templateUrl: './new-app.component.html',
  styleUrls: ['./new-app.component.css']
})
export class NewAppComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

   buscar()
 {
    var str = "lenin";
        alert("TextBox Value is " +str);

 }

}
