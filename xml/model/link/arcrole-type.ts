import type { XmlElement } from '../xml/element';
import { LinkDefinition } from './definition';
import { LinkUsedOn } from './used-on';

export type Children = (LinkDefinition | LinkUsedOn | unknown)[];

export type Attributes = {
  id?: string;
  arcroleURI: string;
  cyclesAllowed: string;
};

export class LinkArcroleType {
  id?: string;
  arcroleURI: string;
  element: XmlElement;
  children: Children;
  cyclesAllowed: string;

  constructor(element: XmlElement, children: Children, attributes: Attributes) {
    this.element = element;
    this.id = attributes.id;
    this.children = children;
    this.arcroleURI = attributes.arcroleURI;
    this.cyclesAllowed = attributes.cyclesAllowed;
  }

  get definition(): LinkDefinition | undefined {
    return this.children.find((child) => child instanceof LinkDefinition);
  }

  get usedOn(): LinkUsedOn[] {
    return this.children.filter((child) => child instanceof LinkUsedOn);
  }
}
