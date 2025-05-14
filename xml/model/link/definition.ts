import type { XmlElement } from '../xml/element';

export type Children = [string];

export class LinkDefinition {
  children: [string];
  element: XmlElement;

  constructor(element: XmlElement, children: [string]) {
    this.element = element;
    this.children = children;
  }

  get value(): string {
    return this.children[0];
  }
}
