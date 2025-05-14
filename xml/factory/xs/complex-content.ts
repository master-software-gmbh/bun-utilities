import { array, object, optional, pipe, string, transform, unknown } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { type Attributes, type Children, XsComplexContent } from '../../model/xs/complex-content.ts';
import { BaseFactory } from '../base.ts';

export class XsComplexContentFactory extends BaseFactory<XsComplexContent, Children, Attributes> {
  protected override readonly childSchema = array(unknown());
  protected override readonly attributeSchema = object({
    id: optional(string()),
    mixed: optional(pipe(string(), transform<string, boolean>(Boolean))),
  });

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new XsComplexContent(element, result.data.children, result.data.attributes));
  }
}
