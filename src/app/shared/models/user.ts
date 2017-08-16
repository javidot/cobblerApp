import { UserApp } from './user-app';

export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    confirmed: boolean;
    accountsFk: number;
    apps?: Array<UserApp>;

    constructor(
        id?: number,
        firstName?: string,
        lastName?: string,
        email?: string,
        confirmed?: boolean,
        accountsFk?: number,
        apps?: Array<UserApp>
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.confirmed = confirmed;
        this.accountsFk = accountsFk;
        this.apps = apps;
    }
}
