import { array, fallback, literal, object, optional, picklist, string, union, unknown } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { type Attributes, type Children, XsSimpleType } from '../../model/xs/simple-type.ts';
import { BaseFactory } from '../base.ts';

export class XsSimpleTypeFactory extends BaseFactory<XsSimpleType, Children, Attributes> {
  protected override readonly childSchema = array(unknown());
  protected override readonly attributeSchema = object({
    id: optional(string()),
    name: optional(string()),
    final: fallback(union([literal('#all'), array(picklist(['list', 'union', 'restriction']))]), []),
  });

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new XsSimpleType(element, result.data.children, result.data.attributes));
  }
}
