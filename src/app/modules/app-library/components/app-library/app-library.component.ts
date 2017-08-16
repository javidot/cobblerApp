import { Component, OnInit } from '@angular/core';

import { DataService } from '../../../../shared/services/data.service';
import { User } from '../../../../shared/models/user';
import { UserApp } from '../../../../shared/models/user-app';

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
    const self = this;
    console.log('Initializing app-library.component');
    self.dataService.currentUser.subscribe((cu) => {
      self.currentUser = cu;
    });

    self.dataService.getUser(2)
      .subscribe(
        user => {
          console.log('User retrieved from app-library');
        },
        err => {
          console.log('Error retrieving User from app-library', err);
        }
      );
    self.dataService.currentUser
      .subscribe(
        (user: User) => {
          if (user) {
            self.currentUser = user;
            console.log('1 - Current User retrieved: ', self.currentUser);
            self.dataService.getUserAppsData(2)
              .subscribe(
                userApps => {
                  console.log('2 - User Apps retrieved from app-library');
                  self.currentUser.apps = userApps;
                  self.dataService.getAllApps()
                    .subscribe(
                      apps => {
                        console.log('3 - All Apps retrieved from app-library');
                        self.currentUser.apps.forEach(userApp => {
                          userApp.app = apps.find(a => a.id === userApp.appFk);
                        });
                        self.loading = false;
                      },
                      err => {
                        console.log('Error retrieving Apps from app-library');
                      }
                    );
                },
                err => {
                  console.log('Error retrieving User Apps from app-library');
                }
              );
          } else {
              self.currentUser = new User(null, null, null, null, null, null, new Array<UserApp>());
          }
        }
      );
  }
}
