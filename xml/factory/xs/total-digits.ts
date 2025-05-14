import { array, object, optional, pipe, string, transform, unknown } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { type Attributes, type Children, XsTotalDigits } from '../../model/xs/total-digits.ts';
import { BaseFactory } from '../base.ts';

export class XsTotalDigitsFactory extends BaseFactory<XsTotalDigits, Children, Attributes> {
  protected override readonly childSchema = array(unknown());
  protected override readonly attributeSchema = object({
    id: optional(string()),
    value: pipe(string(), transform(Number)),
    fixed: optional(pipe(string(), transform<string, boolean>(Boolean)), 'false'),
  });

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new XsTotalDigits(element, result.data.children, result.data.attributes));
  }
}
