import { object, optional, strictTuple, string } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { type Children, XsString } from '../../model/xs/string.ts';
import { BaseFactory } from '../base.ts';

export class XsStringFactory extends BaseFactory<XsString, Children, object> {
  protected override readonly attributeSchema = object({});
  protected override readonly childSchema = strictTuple([optional(string())]);

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new XsString(element, result.data.children));
  }
}
