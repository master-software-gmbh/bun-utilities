import type { XmlElement } from '../xml/element';
import type { XsAnnotation } from './annotation';

export type Children = (XsAnnotation | unknown)[];

export type Attributes = {
  id?: string;
  name?: string;
  mixed: boolean;
  abstract: boolean;
  block?: '#all' | ('extension' | 'restriction')[];
  final?: '#all' | ('extension' | 'restriction')[];
};

export class XsComplexType {
  id?: string;
  name?: string;
  mixed: boolean;
  abstract: boolean;
  element: XmlElement;
  children: Children;
  block?: '#all' | ('extension' | 'restriction')[];
  final?: '#all' | ('extension' | 'restriction')[];

  constructor(element: XmlElement, children: Children, attributes: Attributes) {
    this.element = element;
    this.id = attributes.id;
    this.children = children;
    this.name = attributes.name;
    this.mixed = attributes.mixed;
    this.block = attributes.block;
    this.final = attributes.final;
    this.abstract = attributes.abstract;
  }
}
