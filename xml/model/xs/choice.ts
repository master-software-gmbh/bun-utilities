import type { XmlElement } from '../xml/element';
import type { XsAnnotation } from './annotation';
import type { XsElement } from './element';
import type { XsSequence } from './sequence';

export type Children = (XsAnnotation | XsElement | XsSequence | XsChoice | unknown)[];

export type Attributes = {
  id?: string;
  minOccurs: number;
  maxOccurs: number | 'unbounded';
};

export class XsChoice {
  id?: string;
  minOccurs: number;
  children: Children;
  element: XmlElement;
  maxOccurs: number | 'unbounded';

  constructor(element: XmlElement, children: Children, attributes: Attributes) {
    this.element = element;
    this.id = attributes.id;
    this.children = children;
    this.minOccurs = attributes.minOccurs;
    this.maxOccurs = attributes.maxOccurs;
  }
}
