import type { XmlElement } from '../xml/element';
import { LinkDefinition } from './definition';
import { LinkUsedOn } from './used-on';

export type Children = (LinkDefinition | LinkUsedOn | unknown)[];

export type Attributes = {
  id?: string;
  roleURI: string;
};

export class LinkRoleType {
  id?: string;
  roleURI: string;
  element: XmlElement;
  children: Children;

  constructor(element: XmlElement, children: Children, attributes: Attributes) {
    this.element = element;
    this.id = attributes.id;
    this.children = children;
    this.roleURI = attributes.roleURI;
  }

  get definition(): LinkDefinition | undefined {
    return this.children.find((child) => child instanceof LinkDefinition);
  }

  get usedOn(): LinkUsedOn[] {
    return this.children.filter((child) => child instanceof LinkUsedOn);
  }
}
