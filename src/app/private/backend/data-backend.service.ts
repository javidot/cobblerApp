import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../../shared/models/user';
import { App } from '../../shared/models/app';

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

  getAllTemplateApps() {
    return this.http.get('api/templateApps/')
      .map(res => {
        console.log(res.json());
        return res.json().data;
      });
  }

  createApp(app: App) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    
    // return this.http.post('api/users', app, options)
    //   .map(newApp => {
        
    //   })
  }
}
