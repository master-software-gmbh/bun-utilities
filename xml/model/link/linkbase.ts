import type { XmlElement } from '../xml/element';
import { LinkCalculationLink } from './calculation-link';
import { LinkDefinitionLink } from './definition-link';
import { LinkLabelLink } from './label-link';
import { LinkPresentationLink } from './presentation-link';
import { LinkReferenceLink } from './reference-link';

export type Children = (
  | LinkPresentationLink
  | LinkDefinitionLink
  | LinkCalculationLink
  | LinkLabelLink
  | LinkReferenceLink
  | unknown
)[];

export type Attributes = {
  id?: string;
};

export class LinkLinkbase {
  id?: string;
  children: Children;
  element: XmlElement;

  constructor(element: XmlElement, children: Children, attributes: Attributes) {
    this.element = element;
    this.id = attributes.id;
    this.children = children;
  }

  get presentationLinks(): LinkPresentationLink[] {
    return this.children.filter((child) => child instanceof LinkPresentationLink);
  }

  get definitionLinks(): LinkDefinitionLink[] {
    return this.children.filter((child) => child instanceof LinkDefinitionLink);
  }

  get calculationLinks(): LinkCalculationLink[] {
    return this.children.filter((child) => child instanceof LinkCalculationLink);
  }

  get labelLinks(): LinkLabelLink[] {
    return this.children.filter((child) => child instanceof LinkLabelLink);
  }

  get referenceLinks(): LinkReferenceLink[] {
    return this.children.filter((child) => child instanceof LinkReferenceLink);
  }
}
