import { TextAreaProperties } from './textarea-properties';

export class TextAreaElement {
    type = 'TextArea';
    index: number;
    properties: TextAreaProperties;

    constructor(elementIndex?: number) {
        this.index = elementIndex;
        this.properties = new TextAreaProperties();
    }
}
