import type { XmlElement } from '../xml/element';
import type { XsAnnotation } from './annotation';
import type { XsSimpleType } from './simple-type';

export type Children = (XsAnnotation | XsSimpleType | unknown)[];

export type Attributes = {
  id?: string;
  memberTypes: string[];
};

export class XsUnion {
  id?: string;
  children: Children;
  element: XmlElement;
  memberTypes: string[];

  constructor(element: XmlElement, children: Children, attributes: Attributes) {
    this.element = element;
    this.id = attributes.id;
    this.children = children;
    this.memberTypes = attributes.memberTypes;
  }
}
