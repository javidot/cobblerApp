import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../../environments/environment';
import { FileUploader } from 'ng2-file-upload';

import { User } from '../../shared/models/user';
import { App } from '../../shared/models/app';
import { AppSheet } from '../../shared/models/app-sheet';
import { UserApp } from '../../shared/models/user-app';
import { AppForm } from '../../shared/models/app-form';
import { Tab } from '../../modules/app-builder/models/tab';

@Injectable()
export class DataBackendService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions();
  private apiUrl = environment.apiUrl;
  // private apiUrl = environment.apiUrlLocal;

  constructor(private http: Http) {
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    this.headers.append('Access-Control-Allow-Headers', '*');
  }

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

  getAppForms(id: number): Observable<AppForm[]> {
    return this.http.get(this.apiUrl + 'apps/' + id + '/getAppForms')
      .map(res => {
        console.log('App Forms: ', res.json());
        return res.json();
      });
  }

  deleteAppForm(appId: number, formId: number): Observable<{ commandType: string, result: any }> {
    const headers = new Headers({ 'Content-Type': 'application/json' });

    // tslint:disable-next-line:max-line-length
    return this.http.delete(this.apiUrl + 'apps/' + appId + '/deleteForm/' + formId, { headers: this.headers, body: JSON.stringify({ id: formId }) })
      .map(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return { error: 'Error saving form', status: res.status };
        }
      });

  }

  saveAppForm(appForm: AppForm): Observable<{ commandType: string, result: any }> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    appForm.description = null;
    appForm.formTypeFk = 3;
    // let regExp = new RegExp('"', 'g');
    // form.formSchema = form.formSchema.replace(regExp, '\'');
    const data = { form: appForm, formSchema: JSON.parse(appForm.formSchema) };
    // regExp = new RegExp('\\\\', 'g');
    // jsonForm = jsonForm.replace(regExp, '');

    return this.http.put(this.apiUrl + 'apps/' + appForm.appFk + '/saveForm/' + appForm.id, JSON.stringify(data), {headers: this.headers})
      .map(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return { error: 'Error saving form', status: res.status };
        }
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

    return this.http.post(this.apiUrl + 'apps', JSON.stringify(app), { headers: this.headers }).toPromise()
      .then(
        (res) => {
          const body = res.text();
          return res.json()[0];
        }
      );
  }

  insertAppSpreadsheet(sheet: AppSheet): Observable<{ commandType: string, result: any }> {
    const headers = new Headers({ 'Content-Type': 'application/json' });

    // tslint:disable-next-line:max-line-length
    return this.http.post(this.apiUrl + 'apps/' + sheet.appFk, JSON.stringify(sheet), { headers: this.headers })
      .map(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return { error: 'Error inserting sheet', status: res.status };
        }
      });
  }

  // private extractData(res: Response): App {
  //   const body = res.json();
  //   return body.data || {};
  // }
}
