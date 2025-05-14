import type { XmlElement } from '../xml/element';
import type { XsAnnotation } from './annotation';
import type { XsAttribute } from './attribute';
import type { XsAttributeGroup } from './attribute-group';
import type { XsChoice } from './choice';
import type { XsSequence } from './sequence';

export type Children = (XsAnnotation | XsChoice | XsSequence | XsAttribute | XsAttributeGroup | unknown)[];

export type Attributes = {
  id?: string;
  base?: string;
};

export class XsExtension {
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
