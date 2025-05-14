import type { XmlElement } from '../xml/element';

export type Children = unknown[];

export type Attributes = {
  id?: string;
  role?: string;
  label: string;
  title?: string;
  type: 'resource';
};

export class XlinkResourceType {
  id?: string;
  role?: string;
  label: string;
  title?: string;
  type: 'resource';
  children: Children;
  element: XmlElement;

  constructor(element: XmlElement, children: Children, attributes: Attributes) {
    this.element = element;
    this.id = attributes.id;
    this.children = children;
    this.role = attributes.role;
    this.type = attributes.type;
    this.label = attributes.label;
    this.title = attributes.title;
  }
}
