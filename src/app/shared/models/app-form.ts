import { Tab } from '../../modules/app-builder/models/tab';

export class AppForm {
    id: number;
    name: string;
    description: string;
    updatedOn: string;
    appFk: number;
    formTypeFk: number;
    formType: string;
    ownerFk: number;
    createdOn: string;
    formSchema: string;

    constructor() {
    }

    mapToTab(): Tab {
        return JSON.parse(this.formSchema);
    }
}
