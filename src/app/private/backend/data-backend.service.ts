import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../../shared/models/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataBackendService {

  constructor(private http: Http) { }

  getUser(id: number): Observable<any> {
    return this.http.get('api/users/' + id)
      .map(res => {
        console.log(res.json());
        return res.json().data;
      });
  }

  getUserApps(id: number) {
  }
}
