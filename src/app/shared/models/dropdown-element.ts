import { DropdownProperties } from './dropdown-properties';

export class DropdownElement {
    type = 'Dropdown';
    index: number;
    properties: DropdownProperties;

    constructor(elementIndex?: number) {
        this.index = elementIndex;
        this.properties = new DropdownProperties();
    }
}
