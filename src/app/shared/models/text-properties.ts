import { ElementProperties } from './element-properties';

export class TextProperties extends ElementProperties {
    showLabel: boolean;
    placeholder: string;
    isRequired: boolean;

    constructor() {
        super();
    }
}
