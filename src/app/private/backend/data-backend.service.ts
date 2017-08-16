import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { User } from '../../shared/models/user';
import { App } from '../../shared/models/app';
import { UserApp } from '../../shared/models/user-app';

@Injectable()
export class DataBackendService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private apiUrl = 'http://cobbler-app.us-west-2.elasticbeanstalk.com/api/';
  // private apiUrl = 'http://localhost:3000/api/';

  constructor(private http: Http) { }

  getUser(id: number): Observable<User> {
    return this.http.get(this.apiUrl + 'users/' + id)
      .map(res => {
        console.log('User: ', res.text());
        return res.json();
      });
  }

  getAllTemplateApps() {
    return this.http.get(this.apiUrl + 'apps')
      .map(res => {
        let tmpApps: App[] = res.json();
        tmpApps = tmpApps.filter((a) => {
          return a.isTemplate === 1;
        });
        console.log('Template Apps: ', tmpApps);
        return tmpApps;
      });
  }

  getAllApps() {
    return this.http.get(this.apiUrl + 'apps')
      .map(res => {
        console.log('All Apps: ', res.json());
        return res.json();
      });
  }

  getUserAppsData(id: number): Observable<UserApp[]> {
    return this.http.get(this.apiUrl + 'users/' + id + '/getUserApps')
      .map(res => {
        console.log('User Apps: ', res.json());
        return res.json();
      });
  }

  getApp(id: number): Observable<App> {
    return this.http.get(this.apiUrl + 'apps/' + id)
      .map(res => {
        console.log('App from user id ' + id + ': ', res.json());
        return res.json().data;
      });
  }

  createApp(app: App): Promise<App> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiUrl + 'apps', JSON.stringify(app), options).toPromise()
      .then(
        (res) => {
          const body = res.text();
          return res.json()[0];
        }
      );
  }

  // private extractData(res: Response): App {
  //   const body = res.json();
  //   return body.data || {};
  // }
}
