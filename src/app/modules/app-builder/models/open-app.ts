import { App } from '../../../shared/models/app';
import { AppForm } from '../../../shared/models/app-form';
import { IApp } from './app.interface';
import { Tab } from './tab';

export class OpenApp extends App implements IApp {
    tabs: Tab[];

    constructor(app: App) {
        super(app.name, app.description, app.creationDate, app.isTemplate, app.ownerFk, app.accountFk, app.id);
    }
}
