import { Component, OnInit, ComponentFactoryResolver, ViewChild, AfterViewInit, ComponentRef } from '@angular/core';
import * as _ from 'underscore';

import { Tab } from './tab';
import { TabContainer } from './tab-container';
import { TabContainerDirective } from '../../directives/tab-container.directive';
import { TabContainerComponent } from '../../components/tab-container/tab-container.component';
import { ITabContainer} from '../../components/tab-container/tab-container.interface';

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

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
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
