import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { User } from '../../shared/models/user';
import { App } from '../../shared/models/app';
import { UserApp } from '../../shared/models/user-app';

@Injectable()
export class MockDataBackendService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const user1 = new User(1, 'Javier', 'Cintron', 'jcintron@coralfire.com', true);
    const user2 = new User(2, 'James', 'Ring-Howell', 'james.ring-howell@coralfire.com', true);

    const apps: App[] = new Array<App>();
    apps.push(new App(1, 'Test App 01', 'Testing Cobbler 01', new Date(), user1));
    apps.push(new App(2, 'Test App 02', 'Testing Cobbler 02', new Date(), user1));

    const users: User[] = new Array<User>();
    users.push(new User(1, 'Javier', 'Cintron', 'jcintron@coralfire.com', true));
    users.push(new User(2, 'James', 'Ring-Howell', 'james.ring-howell@coralfire.com', true));

    users[0].apps = new Array<UserApp>();
    users[1].apps = new Array<UserApp>();

    users[0].apps.push(new UserApp(user1, new Date(), null, 'Active', 'Developer', apps[0]));
    users[0].apps.push(new UserApp(user1, new Date(), null, 'Active', 'Developer', apps[1]));

    const templateApps: App[] = new Array<App>();
    templateApps.push(new App(3, 'Template 1', 'Template App 1', new Date(), user1));
    templateApps.push(new App(4, 'Template 2', 'Template App 2', new Date(), user1));
    templateApps.push(new App(5, 'Template 3', 'Template App 3', new Date(), user1));
    templateApps.push(new App(6, 'Template 4', 'Template App 4', new Date(), user1));

    return { users, apps, templateApps };
  }
}
