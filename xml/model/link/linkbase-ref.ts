import {
  XlinkSimpleType,
  type Attributes as XlinkSimpleTypeAttributes,
  type Children as XlinkSimpleTypeChildren,
} from '../xlink/simple-type';
import type { XmlElement } from '../xml/element';

export type Attributes = XlinkSimpleTypeAttributes & {
  arcrole: 'http://www.w3.org/1999/xlink/properties/linkbase';
};

export type Children = XlinkSimpleTypeChildren;

export class LinkLinkbaseRef extends XlinkSimpleType {
  override arcrole: 'http://www.w3.org/1999/xlink/properties/linkbase';

  constructor(element: XmlElement, attributes: Attributes) {
    super(element, attributes);
    this.arcrole = attributes.arcrole;
  }
}
