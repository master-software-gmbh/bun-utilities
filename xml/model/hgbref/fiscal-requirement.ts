import type { XmlElement } from '../xml/element';

export type Children = [
  'Mussfeld' | 'Mussfeld, Kontennachweis erwünscht' | 'Rechnerisch notwendig, soweit vorhanden' | 'Summenmussfeld',
];

export class HgbrefFiscalRequirement {
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
