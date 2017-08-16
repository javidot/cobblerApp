import { User } from './user';

export class App {
    id: number;
    name: string;
    description: string;
    creationDate: Date;
    ownerFk: number;
    ownerName: string;
    accountFk: number;
    isTemplate: number;

    constructor(name: string, description: string, creationDate: Date,
        isTemplate: number, ownerFk: number, accountFk: number) {
        this.id = null;
        this.name = name;
        this.description = description;
        this.creationDate = creationDate;
        this.isTemplate = isTemplate;
        this.ownerFk = ownerFk;
        this.accountFk = accountFk;
    }
}
