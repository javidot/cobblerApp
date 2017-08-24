import { TabContainer } from './tab-container';

export class Tab {
    tabName: string;
    isActive: boolean;
    tabContainer: TabContainer;
    isUpdating: boolean;

    constructor(private tName: string, private is_Active: boolean, private tContainer?: TabContainer) {
        this.tabName = tName;
        this.isActive = is_Active;
        this.tabContainer = tContainer;
        this.isUpdating = false;
    }
}
