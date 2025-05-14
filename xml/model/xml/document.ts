import type { XmlElement } from './element';

export class XmlDocument {
  root: XmlElement;

  constructor(root: XmlElement) {
    this.root = root;
  }
}
