import { Component, OnInit, ComponentFactoryResolver, ViewChild, AfterViewInit,
         ComponentRef, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'underscore';

import { Tab } from '../../models/tab';
import { TabContainer } from '../../models/tab-container';
import { TabContainerDirective } from '../../directives/tab-container.directive';
import { TabContainerComponent } from '../../components/tab-container/tab-container.component';
import { ITabContainer } from '../../components/tab-container/tab-container.interface';
import { DataService } from '../../../../shared/services/data.service';
import { AppBuilderService } from '../../services/app-builder.service';
import { App } from '../../../../shared/models/app';
import { AppForm } from '../../../../shared/models/app-form';
import { OpenApp } from '../../models/open-app';
// tslint:disable-next-line:max-line-length
import { TextElementPropertiesComponent } from '../../../../shared/components/elements/text-element-properties/text-element-properties.component';
import { TextAreaElementPropertiesComponent } from '../../../../shared/components/elements/textarea-element-properties/textarea-element-properties.component';
// tslint:disable-next-line:max-line-length
import { RadioElementPropertiesComponent } from '../../../../shared/components/elements/radio-element-properties/radio-element-properties.component';
import { CheckboxElementPropertiesComponent } from '../../../../shared/components/elements/checkbox-element-properties/checkbox-element-properties.component';
// tslint:disable-next-line:max-line-length
import { DropdownElementPropertiesComponent } from '../../../../shared/components/elements/dropdown-element-properties/dropdown-element-properties.component';

@Component({
  selector: 'app-app-builder',
  templateUrl: './app-builder.component.html',
  styleUrls: ['../../../../../assets/styles/dashboard.css']
})
export class AppBuilderComponent implements OnInit {
  @ViewChild('appTabContainer', { read: ViewContainerRef }) tabHost: ViewContainerRef;
  @ViewChild('propertiesContainer', { read: ViewContainerRef }) propertiesHost: ViewContainerRef;
  newTabName = '';
  tabs: Tab[];
  // activeTab: Tab;
  tabComponentRef: ComponentRef<TabContainerComponent>;
  propComponentRef: ComponentRef<any>;
  appId: string;
  currentApp: OpenApp;
  showElementsPanel = true;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private route: ActivatedRoute,
    private dataService: DataService,
    private appBuilderService: AppBuilderService,
    private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    const self = this;
    self.route.params.subscribe((params) => {
      self.appId = params['id'];
      self.dataService.apps.subscribe((apps) => {
        self.currentApp = new OpenApp(apps.find(a => a.id === +self.appId));
        self.dataService.getAppForms(self.currentApp.id)
          .subscribe((forms) => {
            self.currentApp.tabs = new Array<Tab>();
            if (forms) {
              if (forms.length > 0) {
                let idx = 0;
                forms.forEach(form => {
                  const tmpTab = JSON.parse(form.formSchema);
                  (idx === 0 ) ? tmpTab.isSelected = true : tmpTab.isSelected = false;
                  ++idx;
                  tmpTab.form = form;
                  self.currentApp.tabs.push(tmpTab);
                });
              } else {
                self.currentApp.tabs.push(this.appBuilderService.createNewTab());
              }
            } else {
              self.currentApp.tabs.push(this.appBuilderService.createNewTab());
            }
            console.log('Current app is: ', this.currentApp);
            this.appBuilderService.currentApp = this.currentApp;
            self.showTabContainer();
        });
      });
    });

    // this.tabs = new Array<Tab>();
    // this.tabs.push(new Tab('Tab_1', true, null));
    // this.activeTab = this.tabs[0];
  }

  showTabContainer() {
    console.log('running ngAfterViewInit...');
    const activeTab = this.activeTab();
    activeTab.tabContainer = new TabContainer(TabContainerComponent, {tabName: activeTab.tabName});
    this.loadTabContainer(activeTab);
    this.changeDetectorRef.detectChanges();
    if (!activeTab.form) {
      this.appBuilderService.saveForm(activeTab, this.currentApp.id);
    }
  }

  loadTabContainer(tab: Tab) {
    const tabComponentFactory = this.componentFactoryResolver.resolveComponentFactory(tab.tabContainer.component);
    const viewContainerRef = this.tabHost;
    viewContainerRef.clear();
    this.tabComponentRef = viewContainerRef.createComponent(tabComponentFactory);
    this.tabComponentRef.instance.tab = tab;
    this.tabComponentRef.instance.showElementsPanel.subscribe(
      (showElement) => {
        this.showElementsPanel = showElement;
      });
    this.tabComponentRef.instance.showElementProperties.subscribe(
      (elementIndex) => {
        if (elementIndex != null && elementIndex >= 0) {
          const selectedElement = tab.elements[elementIndex];
          this.showProperties(selectedElement);
        } else if (elementIndex < 0) {
          if (this.propComponentRef) {
            this.propComponentRef.destroy();
          }
        }
      });
    this.tabComponentRef.instance.droppedElement.subscribe(
      (dropElement) => {
        if (dropElement) {
          const newElement = this.appBuilderService.createNewElement(dropElement, this.activeTab().elements.length);
          const activeTab = this.activeTab();
          activeTab.elements.push(newElement);
          this.appBuilderService.saveForm(activeTab, this.currentApp.id);
        }
      });
  }

  showProperties(element: any) {
    switch (element.type) {
      case 'Text':
        this.loadPropertiesPanel(TextElementPropertiesComponent, element);
        break;
      case 'TextArea':
        this.loadPropertiesPanel(TextAreaElementPropertiesComponent, element);
        break;
      case 'Radio':
        this.loadPropertiesPanel(RadioElementPropertiesComponent, element);
        break;
      case 'Checkbox':
        this.loadPropertiesPanel(CheckboxElementPropertiesComponent, element);
        break;
      case 'Dropdown':
        this.loadPropertiesPanel(DropdownElementPropertiesComponent, element);
        break;
      default:
        break;
    }
  }

  loadPropertiesPanel(componentToLoad: any, element: any) {
    const propComponentFactory = this.componentFactoryResolver.resolveComponentFactory(componentToLoad);
    const viewContainerRef = this.propertiesHost;
    viewContainerRef.clear();
    this.propComponentRef = viewContainerRef.createComponent(propComponentFactory);
    this.propComponentRef.instance.element = element;
    this.showElementsPanel = false;
    this.propComponentRef.instance.destroyProperties.subscribe(
      (destroy) => {
        if (destroy) {
          this.propComponentRef.destroy();
          this.tabComponentRef.instance.showElementsPanel.next(true);
        }
      });
    this.propComponentRef.instance.propertiesChange.subscribe(
      (changed) => {
        if (changed) {
          this.appBuilderService.saveForm(this.activeTab(), this.currentApp.id);
        }
      });
  }

  // closePropertiesPanels() {
  //   this.tabComponentRef.instance.showElementsPanel.next(!this.tabComponentRef.instance.showElementsPanel.getValue());
  //   this.tabComponentRef.instance.showTextProperties.next(!this.tabComponentRef.instance.showTextProperties.getValue());
  // }

  activeTab(): Tab {
    return this.currentApp.tabs.find((t) => t.isSelected);
  }

  selectTab(tab: Tab) {
    const selectedTab = this.currentApp.tabs.find((t) => t.isSelected);
    if (selectedTab) {
      selectedTab.isSelected = false;
    }
    tab.isSelected = true;
    if (!tab.tabContainer || !tab.tabContainer.component) {
      tab.tabContainer = new TabContainer(TabContainerComponent, {tabName: tab.tabName});
    }
    if (this.propComponentRef) {
      this.propComponentRef.destroy();
      this.tabComponentRef.instance.showElementsPanel.next(true);
    }
    this.loadTabContainer(tab);
  }

  renameTab(tab: Tab) {
    tab.tabName = this.newTabName;
    // (<ITabContainer>this.tabComponentRef.instance).data.tabName = tab.tabName;
    tab.isUpdating = false;
    this.appBuilderService.saveForm(tab, this.currentApp.id);
  }

  addTab(tab?: Tab) {
    let newTab: Tab;
    if (tab) {
      // const newTab = JSON.parse(JSON.stringify(tab));
      newTab = new Tab(tab.tabName, false, tab.isSelected);
      newTab.elements = _.clone(tab.elements);
      newTab.isSelected = false;
      this.currentApp.tabs.push(newTab);
    } else {
      newTab = new Tab('New Tab', false, false, null);
      this.currentApp.tabs.push(newTab);
    }
    this.appBuilderService.saveForm(newTab, this.currentApp.id);
  }

  deleteTab(tab: Tab) {
    const index = this.currentApp.tabs.indexOf(tab);
    this.currentApp.tabs.splice(index, 1);
    if (this.currentApp.tabs.length <= 0) {
      this.currentApp.tabs.push(new Tab('Dashboard', true, true, null));
      this.currentApp.tabs[0].tabContainer = new TabContainer(TabContainerComponent, {tabName: this.currentApp.tabs[0].tabName});
      // if (!this.currentApp.tabs[0].tabContainer) {
      //   this.currentApp.tabs[0].tabContainer = new TabContainer(TabContainerComponent, {tabName: this.currentApp.tabs[0].tabName});
      // }
    }
    this.appBuilderService.deleteForm(this.currentApp.id, tab.form.id);
    if (tab.isSelected) {
      this.selectTab(this.currentApp.tabs[0]);
    }
  }
}
