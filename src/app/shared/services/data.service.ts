import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import { Subscriber } from 'rxjs/Subscriber';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import * as AWS from 'aws-sdk';

import * as moment from 'moment';
import { FileUploader } from 'ng2-file-upload';

import { DataBackendService } from '../../private/backend/data-backend.service';
import { User } from '../models/user';
import { App } from '../models/app';
import { Tab } from '../../modules/app-builder/models/tab';
import { UserApp } from '../models/user-app';
import { AppForm } from '../models/app-form';
import { AppSheet } from '../models/app-sheet';

@Injectable()
export class DataService {
  private _userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private _templateAppsSubject: BehaviorSubject<App[]> = new BehaviorSubject<App[]>(new Array<App>());
  private _appsSubject: BehaviorSubject<App[]> = new BehaviorSubject<App[]>(new Array<App>());
  private _userAppsSubject: BehaviorSubject<UserApp[]> = new BehaviorSubject<UserApp[]>(new Array<UserApp>());
  private _uploadResponse = { error: null, response: null, progress: 0 };
  public currentUser = this._userSubject.asObservable();
  public templateApps = this._templateAppsSubject.asObservable();
  public apps = this._appsSubject.asObservable();
  public userApps = this._userAppsSubject.asObservable();
  public uploadedFile = new BehaviorSubject<{ error: any, response: any, progress: number }>(this._uploadResponse);

  constructor(private dataBackendService: DataBackendService) {}

  getUser(id: number): Observable<User> {
    return this.dataBackendService.getUser(id)
      .map(user => {
          this._userSubject.next(user);
          return user;
        });
  }

  getAllTemplateApps(): Observable<App[]> {
    return this.dataBackendService.getAllTemplateApps()
      .map(apps => {
          this._templateAppsSubject.next(apps);
          return apps;
        });
  }

  getAllApps(): Observable<App[]> {
    return this.dataBackendService.getAllApps()
      .map(apps => {
          this._appsSubject.next(apps);
          return apps;
        });
  }

  getUserAppsData(userId: number): Observable<UserApp[]> {
    return this.dataBackendService.getUserAppsData(userId)
      .map(userApps => {
        this._userAppsSubject.next(userApps);
        return userApps;
      });
  }

  getAppForms(appId: number): Observable<AppForm[]> {
    return this.dataBackendService.getAppForms(appId)
      .map(appsForm => {
        if (appsForm) {
          return appsForm;
        } else {
          return new Array<AppForm>();
        }
      });
  }

  getUserApps(userId: number): Observable<App[]> {
    return new Observable<App[]>((subscriber: Subscriber<App[]>) => {
      subscriber.next(this._appsSubject.getValue().filter((a) => a.ownerFk === userId));
    });
  }

  deleteForm(appId: number, formId: number): Observable<{ commandType: string, result: any }> {
    return this.dataBackendService.deleteAppForm(appId, formId);
  }

  saveForm(form: AppForm): Observable<{ commandType: string, result: any }> {
    return this.dataBackendService.saveAppForm(form);
  }

  uploadSpreadsheet(appId, file: any) {
    const awsService = AWS;
    awsService.config.accessKeyId = environment.awsAccessKey;
    awsService.config.secretAccessKey = environment.awsSecretAccessKey;
    const bucket = new awsService.S3({ params: { Bucket: 'elasticbeanstalk-us-west-2-094547820668'}});
    const params = { Key: 'uploads/' + file.name, Body: file, Bucket: 'elasticbeanstalk-us-west-2-094547820668', ACL: 'public-read-write' };
    this._uploadResponse.error = null;
    this._uploadResponse.response = null;
    this._uploadResponse.progress = 0;
    bucket.upload(params, (err, res) => {
      this._uploadResponse.error = err;
      this._uploadResponse.response = res;
      this.uploadedFile.next(this._uploadResponse);
    }).on('httpUploadProgress', (event) => {
      this._uploadResponse.progress = parseInt(((event.loaded * 100) / event.total).toString(), 10);
      console.log('Uploaded :: ' + this._uploadResponse.progress + '%');
      this.uploadedFile.next(this._uploadResponse);
    });
  }

  createApp(name: string): Promise<App> {
    const newApp = new App(name, '', moment(new Date()).format('YYYY-MM-DD HH:mm:ss'), 0,
      this._userSubject.getValue().id, this._userSubject.getValue().accountsFk);
    return this.dataBackendService.createApp(newApp)
      .then((app) => {
        this.getUserAppsData(3).subscribe();
        const tmpApps: App[] = this._appsSubject.getValue();
        tmpApps.push(app);
        this._appsSubject.next(tmpApps);
        return app;
      });
  }

  insertSpreadsheet(sheet: AppSheet): Observable<{ commandType: string, result: any }> {
    return this.dataBackendService.insertAppSpreadsheet(sheet);
  }
}
