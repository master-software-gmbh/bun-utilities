import type { XmlElement } from '../xml/element';
import type { XsAnnotation } from './annotation';
import type { XsElement } from './element';

export type Children = (XsAnnotation | XsElement | XsSequence | unknown)[];

export type Attributes = {
  id?: string;
  minOccurs: number;
  maxOccurs: 'unbounded' | number;
};

export class XsSequence {
  id?: string;
  minOccurs: number;
  children: Children;
  element: XmlElement;
  maxOccurs: 'unbounded' | number;

  constructor(element: XmlElement, children: Children, attributes: Attributes) {
    this.element = element;
    this.id = attributes.id;
    this.children = children;
    this.minOccurs = attributes.minOccurs;
    this.maxOccurs = attributes.maxOccurs;
  }
}
