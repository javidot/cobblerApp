import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'underscore';

import { ITabContainer} from './tab-container.interface';
import { Tab } from '../../models/tab';
import { AppBuilderService } from '../../services/app-builder.service';

@Component({
  selector: 'app-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['../../../../../assets/styles/dashboard.css']
})
export class TabContainerComponent implements OnInit, ITabContainer {
  @ViewChild('propTrigger') public popover: NgbPopover;
  @Input() data: any;
  @Input() tab: Tab;
  droppedElement = new BehaviorSubject<string>(null);
  showElementProperties = new BehaviorSubject<number>(null);
  showElementsPanel = new BehaviorSubject<boolean>(true);

  constructor(private appBuilderService: AppBuilderService) {
  }

  ngOnInit() {
    console.log('TabContainerComponent tab: ');
    console.log(this.tab);

    if (!this.tab) {
      this.tab.elements = new Array<any>();
    }
  }

  addElement(event) {
    console.log(event);
    const elementType = event.dragData.draggedElement;
    console.log(elementType);
    // this.tab.elements.push(element);
    this.droppedElement.next(elementType);
  }

  duplicateElement(elementIndex) {
    const dupElement = JSON.parse(JSON.stringify(this.tab.elements.find((e) => e.index === elementIndex)));
    // const dupElement = _.clone(this.tab.elements.find((e) => e.index === elementIndex));
    dupElement.index = this.tab.elements.length;
    this.tab.elements.push(dupElement);
    this.appBuilderService.saveForm(this.tab, this.appBuilderService.currentApp.id);
  }

  deleteElement(elementIndex) {
    this.tab.elements.splice(elementIndex, 1);
    let i = 0;
    this.tab.elements.forEach(element => {
      element.index = i;
      ++i;
    });
    this.appBuilderService.saveForm(this.tab, this.appBuilderService.currentApp.id);
    this.removeProperties();
  }

  showProperties(elementIndex) {
    this.showElementsPanel.next(false);
    this.showElementProperties.next(elementIndex);
  }

  removeProperties() {
    this.showElementsPanel.next(true);
    this.showElementProperties.next(-1);
  }
}
