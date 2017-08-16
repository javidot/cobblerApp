import { Component, OnInit, ComponentFactoryResolver, ViewChild, AfterViewInit, ComponentRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'underscore';

import { Tab } from './tab';
import { TabContainer } from './tab-container';
import { TabContainerDirective } from '../../directives/tab-container.directive';
import { TabContainerComponent } from '../../components/tab-container/tab-container.component';
import { ITabContainer } from '../../components/tab-container/tab-container.interface';
import { DataService } from '../../../../shared/services/data.service';
import { App } from '../../../../shared/models/app';

@Component({
  selector: 'app-app-builder',
  templateUrl: './app-builder.component.html',
  styleUrls: ['../../../../../assets/styles/dashboard.css']
})
export class AppBuilderComponent implements OnInit, AfterViewInit {
  @ViewChild(TabContainerDirective) tabHost: TabContainerDirective;
  simpleDrop: any = null;
  newTabName = '';
  tabs: Tab[];
  activeTab: Tab;
  tabComponentRef: ComponentRef<{}>;
  appId: string;
  currentApp: App;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private route: ActivatedRoute,
    private dataService: DataService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.appId = params['id'];
      this.dataService.apps.subscribe((apps) => {
        this.currentApp = apps.find(a => a.id === +this.appId);
        console.log('Current app is: ', this.currentApp);
      });
    });

    this.tabs = new Array<Tab>();
    this.tabs.push(new Tab('Tab_1', true, null));
    this.activeTab = this.tabs[0];
  }

  ngAfterViewInit() {
    console.log('running ngAfterViewInit...');
    const activeTab = this.tabs.find((t) => t.isActive);
    activeTab.tabContainer = new TabContainer(TabContainerComponent, {tabName: activeTab.tabName});
    this.loadTabContainer(activeTab);
  }

  loadTabContainer(tab: Tab) {
    const tabComponentFactory = this.componentFactoryResolver.resolveComponentFactory(tab.tabContainer.component);
    const viewContainerRef = this.tabHost.viewContainerRef;
    viewContainerRef.clear();
    this.tabComponentRef = viewContainerRef.createComponent(tabComponentFactory);
    (<ITabContainer>this.tabComponentRef.instance).data = tab.tabContainer.data;
  }

  selectTab(tab: Tab) {
    this.tabs.find((t) => t.isActive).isActive = false;
    tab.isActive = true;
    tab.tabContainer = new TabContainer(TabContainerComponent, {tabName: tab.tabName});
    this.loadTabContainer(tab);
  }

  renameTab(tab: Tab) {
    tab.tabName = this.newTabName;
    (<ITabContainer>this.tabComponentRef.instance).data.tabName = tab.tabName;
    tab.isUpdating = false;
  }

  addTab(tab?: Tab) {
    if (tab) {
      const newTab = _.clone(tab);
      newTab.isActive = false;
      this.tabs.push(newTab);
      return;
    }
    const newLength = this.tabs.length + 1;
    this.tabs.push(new Tab('Tab_' + newLength, false, null));
  }

  deleteTab(tab: Tab) {
    this.tabs.splice(this.tabs.indexOf(tab), 1);
  }
}
