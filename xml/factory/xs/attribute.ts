import { array, object, optional, picklist, string, unknown } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { type Attributes, type Children, XsAttribute } from '../../model/xs/attribute.ts';
import { BaseFactory } from '../base.ts';

export class XsAttributeFactory extends BaseFactory<XsAttribute, Children, Attributes> {
  protected override readonly childSchema = array(unknown());
  protected override readonly attributeSchema = object({
    id: optional(string()),
    ref: optional(string()),
    name: optional(string()),
    type: optional(string()),
    fixed: optional(string()),
    default: optional(string()),
    form: optional(picklist(['qualified', 'unqualified'])),
    use: optional(picklist(['optional', 'required', 'prohibited']), 'optional'),
  });

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new XsAttribute(element, result.data.children, result.data.attributes));
  }
}
