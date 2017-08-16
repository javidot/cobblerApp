import { Component, OnInit } from '@angular/core';
import { DataService } from './shared/services/data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // this.dataService.getAllApps().subscribe(apps => {
    //   console.log('Apps retrieved.', apps);
    // });
  }
}
