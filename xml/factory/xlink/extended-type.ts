import { array, literal, object, optional, string, unknown } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import { type Attributes, type Children, XlinkExtendedType } from '../../model/xlink/extended-type.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { BaseFactory } from '../base.ts';

export class XlinkExtendedTypeFactory extends BaseFactory<XlinkExtendedType, Children, Attributes> {
  protected override readonly childSchema = array(unknown());
  protected override readonly attributeSchema = object({
    role: string(),
    id: optional(string()),
    title: optional(string()),
    type: literal('extended'),
  });

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new XlinkExtendedType(element, result.data.children, result.data.attributes));
  }
}
