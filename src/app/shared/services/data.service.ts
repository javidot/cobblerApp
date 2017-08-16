import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import { Subscriber } from 'rxjs/Subscriber';
import 'rxjs/add/operator/map';

import { DataBackendService } from '../../private/backend/data-backend.service';
import { User } from '../models/user';
import { App } from '../models/app';
import { UserApp } from '../models/user-app';

@Injectable()
export class DataService {
  private _userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private _templateAppsSubject: BehaviorSubject<App[]> = new BehaviorSubject<App[]>(new Array<App>());
  private _appsSubject: BehaviorSubject<App[]> = new BehaviorSubject<App[]>(new Array<App>());
  private _userAppsSubject: BehaviorSubject<UserApp[]> = new BehaviorSubject<UserApp[]>(new Array<UserApp>());
  public currentUser = this._userSubject.asObservable();
  public templateApps = this._templateAppsSubject.asObservable();
  public apps = this._appsSubject.asObservable();
  public userApps = this._userAppsSubject.asObservable();

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

  getUserApps(userId: number): Observable<App[]> {
    return new Observable<App[]>((subscriber: Subscriber<App[]>) => {
      subscriber.next(this._appsSubject.getValue().filter((a) => a.ownerFk === userId));
    });
  }

  createApp(name: string): Promise<App> {
    const newApp = new App(name, '', new Date(), 0, this._userSubject.getValue().id, this._userSubject.getValue().accountsFk);
    return this.dataBackendService.createApp(newApp)
      .then((app) => {
          const tmpApps = this._appsSubject.getValue();
          tmpApps.push(app);
          this._appsSubject.next(tmpApps);
          return app;
        });
  }
}
