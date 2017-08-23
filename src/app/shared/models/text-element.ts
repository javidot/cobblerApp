import { TextProperties } from './text-properties';

export class TextElement {
    type = 'Text';
    index: number;
    properties: TextProperties;

    constructor(elementIndex?: number) {
        this.index = elementIndex;
        this.properties = new TextProperties();
    }
}
