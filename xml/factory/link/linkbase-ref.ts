import { array, literal, never, object, optional, string } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import { type Attributes, type Children, LinkLinkbaseRef } from '../../model/link/linkbase-ref.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { BaseFactory } from '../base.ts';

export class LinkLinkbaseRefFactory extends BaseFactory<LinkLinkbaseRef, Children, Attributes> {
  protected override readonly childSchema = array(never());
  protected override readonly attributeSchema = object({
    href: string(),
    type: literal('simple'),
    role: optional(string()),
    show: optional(string()),
    title: optional(string()),
    actuate: optional(string()),
    arcrole: literal('http://www.w3.org/1999/xlink/properties/linkbase'),
  });

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new LinkLinkbaseRef(element, result.data.attributes));
  }
}
