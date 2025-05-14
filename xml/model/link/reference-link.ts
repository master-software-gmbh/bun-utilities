import {
  XlinkExtendedType,
  type Attributes as XlinkExtendedTypeAttributes,
  type Children as XlinkExtendedTypeChildren,
} from '../xlink/extended-type';
import { LinkReference } from './reference';
import { LinkReferenceArc } from './reference-arc';

export type Attributes = XlinkExtendedTypeAttributes;

export type Children = XlinkExtendedTypeChildren;

export class LinkReferenceLink extends XlinkExtendedType {
  get referenceArcs(): LinkReferenceArc[] {
    return this.children.filter((child) => child instanceof LinkReferenceArc);
  }

  get references(): LinkReference[] {
    return this.children.filter((child) => child instanceof LinkReference);
  }
}
