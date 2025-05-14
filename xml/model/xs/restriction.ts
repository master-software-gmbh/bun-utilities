import type { XmlElement } from '../xml/element';
import type { XsAnnotation } from './annotation';
import type { XsSimpleType } from './simple-type';

export type Children = (XsAnnotation | XsSimpleType | unknown)[];

export type Attributes = {
  id?: string;
  base?: string;
};

export class XsRestriction {
  id?: string;
  base?: string;
  children: Children;
  element: XmlElement;

  constructor(element: XmlElement, children: Children, attributes: Attributes) {
    this.element = element;
    this.id = attributes.id;
    this.children = children;
    this.base = attributes.base;
  }
}
