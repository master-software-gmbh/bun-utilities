import {
  XlinkArcType,
  type Attributes as XlinkArcTypeAttributes,
  type Children as XlinkArcTypeChildren,
} from '../xlink/arc-type';
import type { XmlElement } from '../xml/element';

export type Children = XlinkArcTypeChildren;

export type Attributes = XlinkArcTypeAttributes & {
  preferredLabel?: string;
};

export class LinkPresentationArc extends XlinkArcType {
  preferredLabel?: string;

  constructor(element: XmlElement, children: Children, attributes: Attributes) {
    super(element, children, attributes);
    this.preferredLabel = attributes.preferredLabel;
  }
}
