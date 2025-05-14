import type { XmlElement } from '../xml/element';

export type Children = [string?];

export class XsString {
  element: XmlElement;
  children: Children;

  constructor(element: XmlElement, children: Children) {
    this.element = element;
    this.children = children;
  }

  get value(): string | undefined {
    return this.children[0];
  }
}
