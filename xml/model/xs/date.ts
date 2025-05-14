import type { XmlElement } from '../xml/element';

export type Children = [string];

export class XsDate {
  element: XmlElement;
  children: Children;

  constructor(element: XmlElement, children: Children) {
    this.element = element;
    this.children = children;
  }

  get value(): Date {
    return new Date(this.children[0]);
  }
}
