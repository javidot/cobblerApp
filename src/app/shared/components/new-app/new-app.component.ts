import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';

import { DataService } from '../../../shared/services/data.service';
import { App } from '../../../shared/models/app';
import { AppSheet } from '../../../shared/models/app-sheet';

@Component({
  selector: 'app-new-app',
  templateUrl: './new-app.component.html',
  styleUrls: ['./new-app.component.css', '../../../../assets/styles/dashboard.css']
})
export class NewAppComponent implements OnInit {
  uploader: FileUploader = new FileUploader({});
  templateApps: App[];
  loading = true;
  appName = '';
  showNext = false;
  newApp: App;
  fileUploaded = 0; // 0 = false; 1 = uploading; 2 = true; 3 = error
  fileUploadProgress = 0;
  errorFileType = false;
  errorUploadingFile = false;
  sheet: AppSheet;

  constructor(private dataService: DataService, private router: Router, private activeModal: NgbActiveModal) { }

  ngOnInit() {
    console.log('Initializing new-app.component');
    const self = this;
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      console.log('File added to queue: ', file);
      self.uploadFile(file._file);
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('File Uploaded: ', item, status, response);
    };
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

  uploadFile(file: File) {
    this.errorUploadingFile = false;
    this.errorFileType = false;
    if (file.type === '.csv' ||
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel') {
        const self = this;
        self.sheet = new AppSheet(self.newApp.id + '_Sheet', file.name, Date().toString(), '/uploads', self.newApp.id);
        this.fileUploaded = 1;
        this.dataService.uploadSpreadsheet(self.newApp.id, file);
        this.dataService.uploadedFile.subscribe(
          (result) => {
            if (result.error) {
              console.log(result.error);
              self.fileUploaded = 0;
              this.errorUploadingFile = true;
            } else if (result.response) {
              console.log(result.response);
              self.dataService.insertSpreadsheet(self.sheet).subscribe(
                (response) => {
                  console.log(response);
                  self.fileUploaded = 2;
                }
              );
            } else {
              this.fileUploadProgress = result.progress;
            }
          }
        );
    } else {
      this.errorFileType = true;
    }
  }

  createApp() {
    if (this.appName) {
      this.dataService.createApp(this.appName)
        .then(
          (app) => {
            this.newApp = app;
            this.showNext = true;
            this.dataService.getUserAppsData(3).subscribe();
            // this.activeModal.close();
            // this.router.navigate(['/appbuilder/' + app.id]);
          }
        );
    } else {
      console.log('No name added.');
    }
  }

  closeModal() {
    this.activeModal.close();
  }

  openNewApp() {
    this.closeModal();
    this.router.navigate(['/appbuilder/' + this.newApp.id]);
  }
}
