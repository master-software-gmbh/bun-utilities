import {
  XlinkSimpleType,
  type Attributes as XlinkSimpleTypeAttributes,
  type Children as XlinkSimpleTypeChildren,
} from '../xlink/simple-type';
import type { XmlElement } from '../xml/element';

export type Attributes = XlinkSimpleTypeAttributes & {
  arcroleURI: string;
};

export type Children = XlinkSimpleTypeChildren;

export class LinkArcroleRef extends XlinkSimpleType {
  arcroleURI: string;

  constructor(element: XmlElement, attributes: Attributes) {
    super(element, attributes);
    this.arcroleURI = attributes.arcroleURI;
  }
}
