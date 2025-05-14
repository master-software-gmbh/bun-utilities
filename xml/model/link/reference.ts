import {
  type Attributes as XlinkResourceAttributes,
  type Children as XlinkResourceChildren,
  XlinkResourceType,
} from '../xlink/resource-type';

export type Children = XlinkResourceChildren;

export type Attributes = XlinkResourceAttributes;

export class LinkReference extends XlinkResourceType {}
