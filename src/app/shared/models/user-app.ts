import { User } from './user';
import { App } from './app';

export class UserApp {
    appFk?: number;
    app?: App;
    addedBy: User;
    addedOn: Date;
    lastVisited: Date;
    userStatus: string;
    role: string;

    constructor(addedBy?: User, addedOn?: Date, lastVisited?: Date, userStatus?: string, role?: string, appFk?: number, app?: App) {
        this.addedBy = addedBy;
        this.addedOn = addedOn;
        this.lastVisited = lastVisited;
        this.role = role;
        this.userStatus = userStatus;
        this.appFk = appFk;
        this.app = app;
    }
}
