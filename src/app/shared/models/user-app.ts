import { User } from './user';
import { App } from './app';

export class UserApp {
    app: App;
    addedBy: User;
    addedOn: Date;
    lastVisited: Date;
    userStatus: string;
    role: string;

    constructor(addedBy: User, addedOn: Date, lastVisited: Date, userStatus: string, role: string, app?: App) {
        this.addedBy = addedBy;
        this.addedOn = addedOn;
        this.lastVisited = lastVisited;
        this.role = role;
        this.userStatus = userStatus;
        this.app = app;
    }
}
