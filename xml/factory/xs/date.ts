import { isoDate, object, pipe, strictTuple, string } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { type Children, XsDate } from '../../model/xs/date.ts';
import { BaseFactory } from '../base.ts';

export class XsDateFactory extends BaseFactory<XsDate, Children, object> {
  protected override readonly attributeSchema = object({});
  protected override readonly childSchema = strictTuple([pipe(string(), isoDate())]);

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new XsDate(element, result.data.children));
  }
}
