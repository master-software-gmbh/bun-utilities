import {
  XlinkArcType,
  type Attributes as XlinkArcTypeAttributes,
  type Children as XlinkArcTypeChildren,
} from '../xlink/arc-type';
import type { XmlElement } from '../xml/element';

export type Children = XlinkArcTypeChildren;

export type Attributes = XlinkArcTypeAttributes & {
  weight: number;
};

export class LinkCalculationArc extends XlinkArcType {
  weight: number;

  constructor(element: XmlElement, children: Children, attributes: Attributes) {
    super(element, children, attributes);
    this.weight = attributes.weight;
  }
}
