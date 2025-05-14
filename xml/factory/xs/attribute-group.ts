import { array, object, optional, string, unknown } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { type Attributes, type Children, XsAttributeGroup } from '../../model/xs/attribute-group.ts';
import { BaseFactory } from '../base.ts';

export class XsAttributeGroupFactory extends BaseFactory<XsAttributeGroup, Children, Attributes> {
  protected override readonly childSchema = array(unknown());
  protected override readonly attributeSchema = object({
    id: optional(string()),
    ref: optional(string()),
    name: optional(string()),
  });

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new XsAttributeGroup(element, result.data.children, result.data.attributes));
  }
}
