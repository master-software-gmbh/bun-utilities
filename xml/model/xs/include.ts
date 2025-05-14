import type { XmlElement } from '../xml/element';
import { XsAnnotation } from './annotation';

export type Children = (XsAnnotation | unknown)[];

export type Attributes = {
  id?: string;
  schemaLocation: string;
};

export class XsInclude {
  id?: string;
  children: Children;
  element: XmlElement;
  schemaLocation: string;

  constructor(element: XmlElement, children: Children, attributes: Attributes) {
    this.element = element;
    this.id = attributes.id;
    this.children = children;
    this.schemaLocation = attributes.schemaLocation;
  }

  get annotations(): XsAnnotation[] {
    return this.children.filter((child): child is XsAnnotation => child instanceof XsAnnotation);
  }
}
