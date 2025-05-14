import {
  XlinkSimpleType,
  type Attributes as XlinkSimpleTypeAttributes,
  type Children as XlinkSimpleTypeChildren,
} from '../xlink/simple-type';
import type { XmlElement } from '../xml/element';

export type Attributes = XlinkSimpleTypeAttributes & {
  roleURI: string;
};

export type Children = XlinkSimpleTypeChildren;

export class LinkRoleRef extends XlinkSimpleType {
  roleURI: string;

  constructor(element: XmlElement, attributes: Attributes) {
    super(element, attributes);
    this.roleURI = attributes.roleURI;
  }
}
