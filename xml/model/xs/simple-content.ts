import type { XmlElement } from '../xml/element';
import type { XsAnnotation } from './annotation';
import type { XsExtension } from './extension';
import type { XsRestriction } from './restriction';

export type Children = (XsAnnotation | XsRestriction | XsExtension | unknown)[];

export type Attributes = {
  id?: string;
};

export class XsSimpleContent {
  id?: string;
  children: Children;
  element: XmlElement;

  constructor(element: XmlElement, children: Children, attributes: Attributes) {
    this.element = element;
    this.id = attributes.id;
    this.children = children;
  }
}
