import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { DataService } from '../../../shared/services/data.service';
import { App } from '../../../shared/models/app';

@Component({
  selector: 'app-new-app',
  templateUrl: './new-app.component.html',
  styleUrls: ['./new-app.component.css']
})
export class NewAppComponent implements OnInit {
  templateApps: App[];
  loading = true;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    console.log('Initializing new-app.component');
    this.dataService.getAllTemplateApps()
      .subscribe(
        apps => {
          console.log('Template Apps retrieved');
          this.loading = false;
        },
        err => {
          console.log('Error retrieving Template Apps');
        }
      );
    this.dataService.templateApps
      .subscribe(
        (apps: App[]) => {
          console.log('Template Apps: ', apps);
          this.templateApps = apps;
          console.log(this.templateApps);
        }
      );
  }

  createApp() {
    // this.dataService.createApp()
  }
}
