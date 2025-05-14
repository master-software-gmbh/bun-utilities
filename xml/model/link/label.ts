import {
  type Attributes as XlinkResourceAttributes,
  type Children as XlinkResourceChildren,
  XlinkResourceType,
} from '../xlink/resource-type';

export type Children = XlinkResourceChildren;

export type Attributes = XlinkResourceAttributes;

export class LinkLabel extends XlinkResourceType {
  get value(): string {
    let value = '';

    for (const child of this.children) {
      if (typeof child === 'string') {
        value += child;
      }
    }

    return value;
  }
}
