import type { XmlElement } from '../xml/element';
import type { XsAnnotation } from './annotation';

export type Children = (XsAnnotation | unknown)[];

export type Attributes = {
  id?: string;
  ref?: string;
  type?: string;
  name?: string;
  fixed?: string;
  default?: string;
  abstract: boolean;
  minOccurs: number;
  nillable: boolean;
  substitutionGroup?: string;
  maxOccurs: number | 'unbounded';
  form?: 'qualified' | 'unqualified';
  final?: '#all' | ('extension' | 'restriction')[];
  block?: '#all' | ('extension' | 'restriction' | 'substitution')[];
};

export class XsElement {
  id?: string;
  ref?: string;
  type?: string;
  name?: string;
  fixed?: string;
  default?: string;
  abstract: boolean;
  minOccurs: number;
  nillable: boolean;
  children: Children;
  element: XmlElement;
  substitutionGroup?: string;
  maxOccurs: number | 'unbounded';
  form?: 'qualified' | 'unqualified';
  final?: '#all' | ('extension' | 'restriction')[];
  block?: '#all' | ('extension' | 'restriction' | 'substitution')[];

  constructor(element: XmlElement, children: Children, attributes: Attributes) {
    this.element = element;
    this.children = children;
    this.id = attributes.id;
    this.ref = attributes.ref;
    this.type = attributes.type;
    this.name = attributes.name;
    this.form = attributes.form;
    this.final = attributes.final;
    this.block = attributes.block;
    this.fixed = attributes.fixed;
    this.default = attributes.default;
    this.abstract = attributes.abstract;
    this.nillable = attributes.nillable;
    this.minOccurs = attributes.minOccurs;
    this.maxOccurs = attributes.maxOccurs;
    this.substitutionGroup = attributes.substitutionGroup;
  }
}
