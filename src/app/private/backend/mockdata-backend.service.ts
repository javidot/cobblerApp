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
    apps.push(new App('Test App 01', 'Testing Cobbler 01', new Date().toString(), 0, 1, 1));
    apps[0].id = 1;
    apps.push(new App('Test App 02', 'Testing Cobbler 02', new Date().toString(), 0, 1, 1));
    apps[1].id = 2;
    apps.push(new App('Template 01', 'Testing Template 01', new Date().toString(), 0, 1, 1));
    apps[2].id = 3;

    const users: User[] = new Array<User>();
    users.push(new User(1, 'Javier', 'Cintron', 'jcintron@coralfire.com', true, 1));

    users[0].apps = new Array<UserApp>();

    users[0].apps.push(new UserApp(user1, new Date(), null, 'Active', 'Developer', apps[0].id, apps[0]));
    users[0].apps.push(new UserApp(user1, new Date(), null, 'Active', 'Developer', apps[1].id, apps[1]));

    return { users, apps };
  }
}
