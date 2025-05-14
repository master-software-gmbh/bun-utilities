import { array, literal, object, optional, picklist, pipe, string, transform, union, unknown } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { type Attributes, type Children, XsAny } from '../../model/xs/any.ts';
import { BaseFactory } from '../base.ts';

export class XsAnyFactory extends BaseFactory<XsAny, Children, Attributes> {
  protected override readonly childSchema = array(unknown());
  protected override readonly attributeSchema = object({
    id: optional(string()),
    minOccurs: optional(pipe(string(), transform(Number)), '1'),
    processContents: optional(picklist(['strict', 'lax', 'skip']), 'strict'),
    maxOccurs: optional(union([literal('unbounded'), pipe(string(), transform(Number))]), '1'),
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

    return success(new XsAny(element, result.data.children, result.data.attributes));
  }
}
