import type { MinLength } from '../../../array';
import type { XmlElement } from '../xml/element';

export type Children = MinLength<string[], 1>;

export class LinkUsedOn {
  children: Children;
  element: XmlElement;

  constructor(element: XmlElement, children: Children) {
    this.element = element;
    this.children = children;
  }

  get value(): string {
    return this.children[0];
  }
}
