import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { TextElement } from '../../../shared/models/text-element';
import { TextAreaElement } from '../../../shared/models/textarea-element';
import { RadioElement } from '../../../shared/models/radio-element';
import { CheckboxElement } from '../../../shared/models/checkbox-element';
import { DropdownElement } from '../../../shared/models/dropdown-element';
import { App } from '../../../shared/models/app';
import { AppForm } from '../../../shared/models/app-form';
import { Tab } from '../models/tab';
import { OpenApp } from '../models/open-app';
import { DataService } from '../../../shared/services/data.service';

@Injectable()
export class AppBuilderService {
  currentApp: App;

  constructor(private dataService: DataService) { }

  saveForm(activeTab: Tab, appId: number) {
    const appForm = this.createAppForm(activeTab, appId);
    this.dataService.saveForm(appForm)
      .subscribe((result) => {
        console.log(result);
        if (result.commandType === 'insert') {
          activeTab.form.id = result.result;
        }
      });
  }

  deleteForm(appId: number, tabId: number) {
    this.dataService.deleteForm(appId, tabId)
      .subscribe((result) => {
        console.log(result);
        if (result.commandType === 'delete') {
          console.log('Tab deleted from db. Id = ' + tabId);
        }
      });
  }

  createNewTab(): Tab {
    const newTab = new Tab('Dashboard', true, true, null);
    return newTab;
  }

  createAppForm(tab: Tab, appIndex: number): AppForm {
    let tmpForm: AppForm;
    if (tab.form) {
      tmpForm = tab.form;
      tmpForm.name = tab.tabName;
    } else {
      tmpForm = new AppForm();
      tmpForm.id = 0;
      tmpForm.name = 'Dashboard';
      tmpForm.appFk = appIndex;
    }
    tab.form = null;
    // tmpForm.formSchema = JSON.stringify(tab, ['tabName', 'isActive', 'isSelected', 'tabContainer', 'isUpdating', 'elements']);
    tmpForm.formSchema = JSON.stringify(tab, (k, v) => {
      if (k === 'form') {
        return undefined;
      }
      return v;
    });
    tab.form = tmpForm;
    return tmpForm;
  }

  createNewElement(type: string, index: number): any {
    switch (type) {
      case 'textElement':
        return new TextElement(index);
      case 'textAreaElement':
        return new TextAreaElement(index);
      case 'radioElement':
        return new RadioElement(index);
      case 'checkboxElement':
        return new CheckboxElement(index);
      case 'dropdownElement':
        return new DropdownElement(index);
      default:
        break;
    }
  }
}
