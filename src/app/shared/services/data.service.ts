import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { DataBackendService } from '../../private/backend/data-backend.service';
import { User } from '../models/user';


@Injectable()
export class DataService {
  private _userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
  public currentUser = this._userSubject.asObservable();

  constructor(private dataBackendService: DataBackendService) { }

  getUser(id: number): Observable<User> {
    return this.dataBackendService.getUser(id)
      .map(user => {
          this._userSubject.next(user);
          return user;
        });
  }
}
