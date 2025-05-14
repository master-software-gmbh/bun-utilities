import type { XmlElement } from '../xml/element';
import { XsAnnotation } from './annotation';
import { XsElement } from './element';
import { XsImport } from './import';
import { XsInclude } from './include';

export type Children = (XsAnnotation | unknown)[];

export type Attributes = {
  id?: string;
  version?: string;
  targetNamespace?: string;
  elementFormDefault: 'qualified' | 'unqualified';
  attributeFormDefault: 'qualified' | 'unqualified';
  blockDefault: '#all' | ('extension' | 'restriction' | 'substitution')[];
  finalDefault: '#all' | ('extension' | 'restriction' | 'list' | 'union')[];
};

export class XsSchema {
  id?: string;
  version?: string;
  children: Children;
  element: XmlElement;
  targetNamespace?: string;
  elementFormDefault: 'qualified' | 'unqualified';
  attributeFormDefault: 'qualified' | 'unqualified';
  blockDefault: '#all' | ('extension' | 'restriction' | 'substitution')[];
  finalDefault: '#all' | ('extension' | 'restriction' | 'list' | 'union')[];

  constructor(element: XmlElement, children: Children, attributes: Attributes) {
    this.element = element;
    this.id = attributes.id;
    this.children = children;
    this.version = attributes.version;
    this.blockDefault = attributes.blockDefault;
    this.finalDefault = attributes.finalDefault;
    this.targetNamespace = attributes.targetNamespace;
    this.elementFormDefault = attributes.elementFormDefault;
    this.attributeFormDefault = attributes.attributeFormDefault;
  }

  get annotations(): XsAnnotation[] {
    return this.children.filter((child): child is XsAnnotation => child instanceof XsAnnotation);
  }

  get imports(): XsImport[] {
    return this.children.filter((child): child is XsImport => child instanceof XsImport);
  }

  get includes(): XsInclude[] {
    return this.children.filter((child): child is XsInclude => child instanceof XsInclude);
  }

  get elements(): XsElement[] {
    return this.children.filter((child): child is XsElement => child instanceof XsElement);
  }

  getElements(predicate: (element: XsElement) => boolean): XsElement[] {
    return this.elements.filter(predicate);
  }

  getElementById(id: string): XsElement | undefined {
    return this.elements.find((element) => element.id === id);
  }
}
