import type { XmlElement } from '../xml/element';
import type { XsAnnotation } from './annotation';

export type Children = (XsAnnotation | unknown)[];

export type Attributes = {
  id?: string;
  processContents: 'strict' | 'lax' | 'skip';
  namespace: '##any' | '##other' | (string | '##targetNamespace' | '##local')[];
};

export class XsAnyAttribute {
  id?: string;
  children: Children;
  element: XmlElement;
  namespace: '##any' | '##other' | (string | '##targetNamespace' | '##local')[];
  processContents: 'strict' | 'lax' | 'skip';

  constructor(element: XmlElement, children: Children, attributes: Attributes) {
    this.element = element;
    this.id = attributes.id;
    this.children = children;
    this.namespace = attributes.namespace;
    this.processContents = attributes.processContents;
  }
}
