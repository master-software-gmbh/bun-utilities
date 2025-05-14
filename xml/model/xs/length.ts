import type { XmlElement } from '../xml/element';
import type { XsAnnotation } from './annotation';

export type Children = (XsAnnotation | unknown)[];

export type Attributes = {
  id?: string;
  value: number;
  fixed: boolean;
};

export class XsLength {
  id?: string;
  value: number;
  fixed: boolean;
  element: XmlElement;
  children: Children;

  constructor(element: XmlElement, children: Children, attributes: Attributes) {
    this.element = element;
    this.children = children;
    this.value = attributes.value;
    this.fixed = attributes.fixed;
  }
}
