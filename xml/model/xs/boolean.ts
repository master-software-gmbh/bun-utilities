import type { XmlElement } from '../xml/element';

export type Children = ['true' | 'false'];

export class XsBoolean {
  element: XmlElement;
  children: Children;

  constructor(element: XmlElement, children: Children) {
    this.element = element;
    this.children = children;
  }

  get value(): boolean {
    return Boolean(this.children[0]);
  }
}
