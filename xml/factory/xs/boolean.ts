import { object, picklist, strictTuple } from 'valibot';
import { success } from '../../../result/index.ts';
import type { XmlMapperContext } from '../../mapper/context.ts';
import type { XmlElement } from '../../model/xml/element.ts';
import { type Children, XsBoolean } from '../../model/xs/boolean.ts';
import { BaseFactory } from '../base.ts';

export class XsBooleanFactory extends BaseFactory<XsBoolean, Children, object> {
  protected override readonly attributeSchema = object({});
  protected override readonly childSchema = strictTuple([picklist(['true', 'false'])]);

  override async map(element: XmlElement, context: XmlMapperContext) {
    const result = await this.parseElement(element, context);

    if (!result.success) {
      return result;
    }

    return success(new XsBoolean(element, result.data.children));
  }
}
