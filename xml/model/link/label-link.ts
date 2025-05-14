import {
  XlinkExtendedType,
  type Attributes as XlinkExtendedTypeAttributes,
  type Children as XlinkExtendedTypeChildren,
} from '../xlink/extended-type';
import { LinkLabel } from './label';
import { LinkLabelArc } from './label-arc';

export type Attributes = XlinkExtendedTypeAttributes;

export type Children = XlinkExtendedTypeChildren;

export class LinkLabelLink extends XlinkExtendedType {
  get labelArcs(): LinkLabelArc[] {
    return this.children.filter((child) => child instanceof LinkLabelArc);
  }

  get labels(): LinkLabel[] {
    return this.children.filter((child) => child instanceof LinkLabel);
  }
}
