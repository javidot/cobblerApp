import { User } from './user';

export class App {
    id: number;
    name: string;
    description: string;
    creationDate: Date;
    owner: User;

    constructor(id: number, name: string, description: string, creationDate: Date, owner: User) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.creationDate = creationDate;
        this.owner = owner;
    }
}
