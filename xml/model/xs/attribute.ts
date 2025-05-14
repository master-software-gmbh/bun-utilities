import type { XmlElement } from '../xml/element';
import type { XsAnnotation } from './annotation';
import type { XsSimpleType } from './simple-type';

export type Children = (XsAnnotation | XsSimpleType | unknown)[];

export type Attributes = {
  id?: string;
  ref?: string;
  name?: string;
  type?: string;
  fixed?: string;
  default?: string;
  form?: 'qualified' | 'unqualified';
  use: 'optional' | 'required' | 'prohibited';
};

export class XsAttribute {
  id?: string;
  ref?: string;
  name?: string;
  type?: string;
  fixed?: string;
  default?: string;
  children: Children;
  element: XmlElement;
  form?: 'qualified' | 'unqualified';
  use: 'optional' | 'required' | 'prohibited';

  constructor(element: XmlElement, children: Children, attributes: Attributes) {
    this.element = element;
    this.id = attributes.id;
    this.children = children;
    this.ref = attributes.ref;
    this.use = attributes.use;
    this.form = attributes.form;
    this.name = attributes.name;
    this.type = attributes.type;
    this.fixed = attributes.fixed;
    this.default = attributes.default;
  }
}
