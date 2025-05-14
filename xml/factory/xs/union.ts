import { array, object, optional, pipe, string, transform, unknown } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { type Attributes, type Children, XsUnion } from '../../model/xs/union.ts';
import { BaseFactory } from '../base.ts';

export class XsUnionFactory extends BaseFactory<XsUnion, Children, Attributes> {
  protected override readonly childSchema = array(unknown());
  protected override readonly attributeSchema = object({
    id: optional(string()),
    memberTypes: optional(
      pipe(
        string(),
        transform((input) => input.split(' ')),
      ),
      '',
    ),
  });

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new XsUnion(element, result.data.children, result.data.attributes));
  }
}
