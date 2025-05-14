import type { XmlElement } from '../xml/element';
import { XsAppinfo } from './appinfo';
import { XsDocumentation } from './documentation';

export type Children = (XsAppinfo | XsDocumentation | unknown)[];

export type Attributes = {
  id?: string;
};

export class XsAnnotation {
  id?: string;
  children: Children;
  element: XmlElement;

  constructor(element: XmlElement, children: Children, attributes: Attributes) {
    this.element = element;
    this.id = attributes.id;
    this.children = children;
  }

  get appinfos(): XsAppinfo[] {
    return this.children.filter((child): child is XsAppinfo => child instanceof XsAppinfo);
  }

  get documentations(): XsDocumentation[] {
    return this.children.filter((child): child is XsDocumentation => child instanceof XsDocumentation);
  }
}
