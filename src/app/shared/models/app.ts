import { User } from './user';

export class App {
    id: number;
    name: string;
    description: string;
    creationDate: string;
    ownerFk: number;
    ownerName: string;
    accountFk: number;
    isTemplate: number;

    constructor(name: string, description: string, creationDate: string,
        isTemplate: number, ownerFk: number, accountFk: number, id?) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.creationDate = creationDate;
        this.isTemplate = isTemplate;
        this.ownerFk = ownerFk;
        this.accountFk = accountFk;
    }
}
