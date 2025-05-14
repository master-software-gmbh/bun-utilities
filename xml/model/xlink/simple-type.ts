import type { XmlElement } from '../xml/element';

export type Children = never[];

export type Attributes = {
  href: string;
  role?: string;
  show?: string;
  type: 'simple';
  title?: string;
  arcrole?: string;
  actuate?: string;
};

export class XlinkSimpleType {
  href: string;
  role?: string;
  show?: string;
  type: 'simple';
  title?: string;
  arcrole?: string;
  actuate?: string;
  element: XmlElement;

  constructor(element: XmlElement, attributes: Attributes) {
    this.element = element;
    this.href = attributes.href;
    this.role = attributes.role;
    this.show = attributes.show;
    this.type = attributes.type;
    this.title = attributes.title;
    this.arcrole = attributes.arcrole;
    this.actuate = attributes.actuate;
  }
}
