import type { XmlElement } from '../xml/element';

export type Children = unknown[];

export type Attributes = {
  source?: string;
};

export class XsAppinfo {
  source?: string;
  element: XmlElement;
  children: Children;

  constructor(element: XmlElement, children: Children, attributes: Attributes) {
    this.element = element;
    this.children = children;
    this.source = attributes.source;
  }

  getChildren<T>(cls: new (...args: any[]) => T): T[] {
    return this.children.filter((child): child is T => child instanceof cls);
  }
}
