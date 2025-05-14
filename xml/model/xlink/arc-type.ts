import type { XmlElement } from '../xml/element';

export type Children = unknown[];

export type Attributes = {
  to: string;
  type: 'arc';
  from: string;
  show?: string;
  title?: string;
  order?: number;
  arcrole: string;
  actuate?: string;
  priority?: number;
  use?: 'optional' | 'prohibited';
};

export class XlinkArcType {
  to: string;
  type: 'arc';
  from: string;
  show?: string;
  title?: string;
  order?: number;
  arcrole: string;
  actuate?: string;
  priority?: number;
  children: Children;
  element: XmlElement;
  use?: 'optional' | 'prohibited';

  constructor(element: XmlElement, children: Children, attributes: Attributes) {
    this.element = element;
    this.to = attributes.to;
    this.children = children;
    this.use = attributes.use;
    this.type = attributes.type;
    this.from = attributes.from;
    this.show = attributes.show;
    this.title = attributes.title;
    this.order = attributes.order;
    this.arcrole = attributes.arcrole;
    this.actuate = attributes.actuate;
    this.priority = attributes.priority;
  }
}
