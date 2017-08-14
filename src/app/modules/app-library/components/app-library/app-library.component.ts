import { Component, OnInit } from '@angular/core';

import { DataService } from '../../../../shared/services/data.service';
import { User } from '../../../../shared/models/user';

@Component({
  selector: 'app-app-library',
  templateUrl: './app-library.component.html',
  styleUrls: ['./app-library.component.css']
})
export class AppLibraryComponent implements OnInit {
  currentUser: User;
  loading = true;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    console.log('Initializing app-library.component');
    this.dataService.getUser(1)
      .subscribe(
        user => {
          console.log('User retrieved');
          this.loading = false;
        },
        err => {
          console.log('Error retrieving User');
        }
      );
    this.dataService.currentUser
      .subscribe(
        (user: User) => {
          this.currentUser = user;
          console.log(this.currentUser);
        }
      );
  }
}
