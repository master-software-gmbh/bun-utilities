import type { XmlElement } from '../xml/element';

export type Children = [string];

export class LinkDocumentation {
  children: Children;
  element: XmlElement;

  constructor(element: XmlElement, children: Children) {
    this.element = element;
    this.children = children;
  }
}
