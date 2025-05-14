import { array, literal, object, optional, string, unknown } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import { type Attributes, type Children, LinkLoc } from '../../model/link/loc.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { BaseFactory } from '../base.ts';

export class LinkLocFactory extends BaseFactory<LinkLoc, Children, Attributes> {
  protected override readonly childSchema = array(unknown());
  protected override readonly attributeSchema = object({
    href: string(),
    label: string(),
    type: literal('locator'),
    role: optional(string()),
    title: optional(string()),
  });

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new LinkLoc(element, result.data.children, result.data.attributes));
  }
}
