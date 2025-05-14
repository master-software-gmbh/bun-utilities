import type { XmlElement } from '../xml/element';

export type Children = unknown[];

export type Attributes = {
  type: 'locator';
  href: string;
  label: string;
  role?: string;
  title?: string;
};

export class LinkLoc {
  type: 'locator';
  href: string;
  label: string;
  role?: string;
  title?: string;
  children: Children;
  element: XmlElement;

  constructor(element: XmlElement, children: Children, attributes: Attributes) {
    this.element = element;
    this.type = attributes.type;
    this.href = attributes.href;
    this.label = attributes.label;
    this.role = attributes.role;
    this.title = attributes.title;
    this.children = children;
  }
}
