import { ElementProperties } from './element-properties';

export class TextAreaProperties extends ElementProperties {
    showLabel: boolean;
    placeholder: string;
    isRequired: boolean;

    constructor() {
        super();
    }
}
