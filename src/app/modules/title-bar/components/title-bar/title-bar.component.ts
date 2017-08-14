import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NewAppComponent } from '../../../../shared/components/new-app/new-app.component';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {

  constructor(public modalService: NgbModal) { }

  ngOnInit() {
    console.log('Initializing title-bar .component');
  }

  showNewAppModal() {
    const modalRef = this.modalService.open(NewAppComponent, { size: 'lg' });
  }
}
