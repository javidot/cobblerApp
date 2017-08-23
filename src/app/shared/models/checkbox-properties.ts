import { ElementProperties } from './element-properties';

export class CheckboxProperties extends ElementProperties {
    showLabel: boolean;
    isRequired: boolean;
    options: Array<any>;

    constructor() {
        super();
        this.showLabel = true;
        this.isRequired = true;
        this.options = [
            { text: 'Option 1', value: 'Option 1' },
            { text: 'Option 2', value: 'Option_2' },
            { text: 'Option 3', value: 'Option_3' }
        ];
    }
}
