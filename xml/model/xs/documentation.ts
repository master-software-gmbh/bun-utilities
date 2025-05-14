import type { XmlElement } from '../xml/element';

export type Children = unknown[];

export type Attributes = {
  source?: string;
  xmlLang?: string;
};

export class XsDocumentation {
  source?: string;
  xmlLang?: string;
  children: Children;
  element: XmlElement;

  constructor(element: XmlElement, children: Children, attributes: Attributes) {
    this.element = element;
    this.children = children;
    this.source = attributes.source;
    this.xmlLang = attributes.xmlLang;
  }
}
