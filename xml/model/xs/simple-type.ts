import type { XmlElement } from '../xml/element';
import type { XsAnnotation } from './annotation';

export type Children = (XsAnnotation | unknown)[];

export type Attributes = {
  id?: string;
  name?: string;
  final?: '#all' | ('list' | 'union' | 'restriction')[];
};

export class XsSimpleType {
  id?: string;
  name?: string;
  element: XmlElement;
  children: Children;
  final?: '#all' | ('list' | 'union' | 'restriction')[];

  constructor(element: XmlElement, children: Children, attributes: Attributes) {
    this.element = element;
    this.id = attributes.id;
    this.children = children;
    this.name = attributes.name;
    this.final = attributes.final;
  }
}
