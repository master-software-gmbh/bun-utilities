import type { XmlElement } from '../xml/element';

export type Children = ['GKV' | 'neutral' | 'UKV'];

export class HgbrefTypeOperatingResult {
  element: XmlElement;
  children: Children;

  constructor(element: XmlElement, children: Children) {
    this.element = element;
    this.children = children;
  }

  get value() {
    return this.children[0];
  }
}
