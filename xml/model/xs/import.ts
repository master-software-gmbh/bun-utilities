import type { XmlElement } from '../xml/element';
import type { XsAnnotation } from './annotation';

export type Children = [XsAnnotation?];

export type Attributes = {
  id?: string;
  namespace?: string;
  schemaLocation?: string;
};

export class XsImport {
  id?: string;
  namespace?: string;
  element: XmlElement;
  schemaLocation?: string;
  children: Children;

  constructor(element: XmlElement, children: Children, attributes: Attributes) {
    this.element = element;
    this.children = children;
    this.id = attributes.id;
    this.namespace = attributes.namespace;
    this.schemaLocation = attributes.schemaLocation;
  }
}
