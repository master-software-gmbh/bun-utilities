import { array, object, optional, string, unknown } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { type Attributes, type Children, XsPattern } from '../../model/xs/pattern.ts';
import { BaseFactory } from '../base.ts';

export class XsPatternFactory extends BaseFactory<XsPattern, Children, Attributes> {
  protected override readonly childSchema = array(unknown());
  protected override readonly attributeSchema = object({
    value: string(),
    id: optional(string()),
  });

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new XsPattern(element, result.data.children, result.data.attributes));
  }
}
