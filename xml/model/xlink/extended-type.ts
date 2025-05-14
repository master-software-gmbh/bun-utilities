import { LinkLoc } from '../link/loc';
import type { XmlElement } from '../xml/element';

export type Children = unknown[];

export type Attributes = {
  id?: string;
  role: string;
  title?: string;
  type: 'extended';
};

export class XlinkExtendedType {
  id?: string;
  role: string;
  title?: string;
  type: 'extended';
  children: Children;
  element: XmlElement;

  constructor(element: XmlElement, children: Children, attributes: Attributes) {
    this.element = element;
    this.id = attributes.id;
    this.children = children;
    this.role = attributes.role;
    this.type = attributes.type;
    this.title = attributes.title;
  }

  get locs(): LinkLoc[] {
    return this.children.filter((child) => child instanceof LinkLoc);
  }
}
