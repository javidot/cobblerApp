import { RadioProperties } from './radio-properties';

export class RadioElement {
    type = 'Radio';
    index: number;
    properties: RadioProperties;

    constructor(elementIndex?: number) {
        this.index = elementIndex;
        this.properties = new RadioProperties();
    }
}
