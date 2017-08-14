import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { DataBackendService } from '../../private/backend/data-backend.service';
import { User } from '../models/user';
import { App } from '../models/app';


@Injectable()
export class DataService {
  private _userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
  private _templateAppsSubject: BehaviorSubject<App[]> = new BehaviorSubject<App[]>(new Array<App>());
  public currentUser = this._userSubject.asObservable();
  public templateApps = this._templateAppsSubject.asObservable();

  constructor(private dataBackendService: DataBackendService) { }

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

  // createApp(name: string) {
  //   return this.dataBackendService.createApp(name)
  //     .map(user => {
  //         this._userSubject.next(user);
  //         return user;
  //       });
  // }
}
