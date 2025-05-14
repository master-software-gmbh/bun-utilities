import type { XmlElement } from '../xml/element';
import type { XsAnnotation } from './annotation';

export type Children = (XsAnnotation | unknown)[];

export type Attributes = {
  id?: string;
  minOccurs: number;
  maxOccurs: 'unbounded' | number;
  namespace: '##any' | '##other' | (string | '##targetNamespace' | '##local')[];
  processContents: 'strict' | 'lax' | 'skip';
};

export class XsAny {
  id?: string;
  minOccurs: number;
  children: Children;
  element: XmlElement;
  maxOccurs: 'unbounded' | number;
  namespace: '##any' | '##other' | (string | '##targetNamespace' | '##local')[];
  processContents: 'strict' | 'lax' | 'skip';

  constructor(element: XmlElement, children: Children, attributes: Attributes) {
    this.element = element;
    this.id = attributes.id;
    this.children = children;
    this.maxOccurs = attributes.maxOccurs;
    this.namespace = attributes.namespace;
    this.minOccurs = attributes.minOccurs;
    this.processContents = attributes.processContents;
  }
}
