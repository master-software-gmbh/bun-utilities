import type { XmlElement } from '../xml/element';

export type Children = [
  'handelsrechtlich' | 'handelsrechtlicher Einzelabschluss' | 'handelsrechtlicher Konzernabschluss',
];

export class HgbrefTradeAccountingNotPermittedFor {
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
