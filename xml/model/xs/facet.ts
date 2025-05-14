import type { XmlElement } from '../xml/element';
import type { XsAnnotation } from './annotation';

export type Children = (XsAnnotation | unknown)[];

export type Attributes = {
  id?: string;
  value: string;
  fixed: boolean;
};

export class XsFacet {
  id?: string;
  value: string;
  fixed: boolean;
  children: Children;
  element: XmlElement;

  constructor(element: XmlElement, children: Children, attributes: Attributes) {
    this.element = element;
    this.id = attributes.id;
    this.children = children;
    this.value = attributes.value;
    this.fixed = attributes.fixed;
  }
}
