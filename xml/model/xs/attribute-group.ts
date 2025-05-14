import type { XmlElement } from '../xml/element';
import type { XsAnnotation } from './annotation';
import type { XsAttribute } from './attribute';

export type Children = (XsAnnotation | XsAttribute | XsAttributeGroup | unknown)[];

export type Attributes = {
  id?: string;
  ref?: string;
  name?: string;
};

export class XsAttributeGroup {
  id?: string;
  ref?: string;
  name?: string;
  element: XmlElement;
  children: Children;

  constructor(element: XmlElement, children: Children, attributes: Attributes) {
    this.element = element;
    this.id = attributes.id;
    this.children = children;
    this.ref = attributes.ref;
    this.name = attributes.name;
  }
}
