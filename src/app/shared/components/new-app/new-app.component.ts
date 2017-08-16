import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
  appName = '';

  constructor(private dataService: DataService, private router: Router, private activeModal: NgbActiveModal) { }

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
    if (this.appName) {
      this.dataService.createApp(this.appName)
        .then(
          (app) => {
            this.activeModal.close();
            this.router.navigate(['/appbuilder/' + app.id]);
          }
        );
    } else {
      console.log('No name added.');
    }
  }
}
