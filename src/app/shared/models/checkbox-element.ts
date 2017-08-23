import { CheckboxProperties } from './checkbox-properties';

export class CheckboxElement {
    type = 'Checkbox';
    index: number;
    properties: CheckboxProperties;

    constructor(elementIndex?: number) {
        this.index = elementIndex;
        this.properties = new CheckboxProperties();
    }
}
