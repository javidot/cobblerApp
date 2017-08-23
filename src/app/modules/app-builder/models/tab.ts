import { TabContainer } from './tab-container';
import { AppForm } from '../../../shared/models/app-form';

export class Tab {
    tabName: string;
    isActive: boolean;
    isSelected: boolean;
    tabContainer: TabContainer;
    isUpdating: boolean;
    elements: Array<any>;
    form: AppForm;

    constructor(tabName: string, isActive: boolean, isSelected: boolean, tabContainer?: TabContainer, form?: AppForm) {
        this.tabName = tabName;
        this.isActive = isActive;
        this.isSelected = isSelected;
        this.tabContainer = tabContainer;
        this.isUpdating = false;
        this.elements = new Array<any>();
        this.form = form;
    }
}
