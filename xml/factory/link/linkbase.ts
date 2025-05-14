import { array, object, optional, string, unknown } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import { type Attributes, type Children, LinkLinkbase } from '../../model/link/linkbase.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { BaseFactory } from '../base.ts';

export class LinkLinkbaseFactory extends BaseFactory<LinkLinkbase, Children, Attributes> {
  protected override readonly childSchema = array(unknown());
  protected override readonly attributeSchema = object({
    id: optional(string()),
  });

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new LinkLinkbase(element, result.data.children, result.data.attributes));
  }
}
