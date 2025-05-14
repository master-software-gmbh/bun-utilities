import { array, literal, object, optional, picklist, pipe, string, transform, union, unknown } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { type Attributes, type Children, XsAnyAttribute } from '../../model/xs/any-attribute.ts';
import { BaseFactory } from '../base.ts';

export class XsAnyAttributeFactory extends BaseFactory<XsAnyAttribute, Children, Attributes> {
  protected override readonly childSchema = array(unknown());
  protected override readonly attributeSchema = object({
    id: optional(string()),
    processContents: optional(picklist(['strict', 'lax', 'skip']), 'strict'),
    namespace: optional(
      union([
        literal('##any'),
        literal('##other'),
        pipe(
          string(),
          transform((input) => input.split(' ')),
        ),
      ]),
      '##any',
    ),
  });

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new XsAnyAttribute(element, result.data.children, result.data.attributes));
  }
}
